import { openDB } from "idb";
import type { AuthData } from "@/lib/types/auth";
import type { Order } from "@/lib/types/order";
import type { PendingAction } from "@/lib/types/order";

const DB_NAME = "delivery-app-db";
const DB_VERSION = 2; // Incremented to force schema upgrade

export async function initDB() {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Create orders store if it doesn't exist
        if (!db.objectStoreNames.contains("orders")) {
          db.createObjectStore("orders", { keyPath: "id" });
        }
        
        // Create auth store if it doesn't exist
        if (!db.objectStoreNames.contains("auth")) {
          db.createObjectStore("auth", { keyPath: "id" });
        }
        
        // Create pendingActions store if it doesn't exist
        if (!db.objectStoreNames.contains("pendingActions")) {
          db.createObjectStore("pendingActions", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

export async function updateOrder(
  orderId: string,
  updates: Partial<Order>,
): Promise<void> {
  const db = await initDB();
  const tx = db.transaction("orders", "readwrite");
  const store = tx.objectStore("orders");

  const existingOrder = await store.get(orderId);
  if (existingOrder) {
    const updatedOrder = { ...existingOrder, ...updates };
    await store.put(updatedOrder);
  }
  await tx.done;
}

export async function saveOrder(order: Order) {
  try {
    const db = await initDB();
    await db.put("orders", {
      ...order,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Failed to save order:", error);
    throw error;
  }
}

export async function getOrders(): Promise<Order[]> {
  const db = await initDB();
  return db.getAll("orders");
}

export async function deleteOrder(orderId: string): Promise<void> {
  const db = await initDB();
  const tx = db.transaction("orders", "readwrite");
  await tx.objectStore("orders").delete(orderId);
  await tx.done;
}

export async function saveAuthData(data: AuthData): Promise<void> {
  const db = await initDB();
  await db.put("auth", data);
}

export async function getAuthData(): Promise<AuthData[]> {
  const db = await initDB();
  return db.getAll("auth");
}

// --- OFFLINE ACTIONS ---

export async function addPendingAction(action: PendingAction) {
  try {
    const db = await initDB();
    await db.add("pendingActions", {
      ...action,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Failed to add pending action:", error);
    throw error;
  }
}

export async function getPendingActions(): Promise<PendingAction[]> {
  try {
    const db = await initDB();
    return db.getAll("pendingActions");
  } catch (error) {
    console.error("Failed to get pending actions:", error);
    return [];
  }
}

export async function clearPendingAction(id: number) {
  const db = await initDB();
  const tx = db.transaction("pendingActions", "readwrite");
  await tx.objectStore("pendingActions").delete(id);
  await tx.done;
}

export async function clearAllPendingActions() {
  const db = await initDB();
  const tx = db.transaction("pendingActions", "readwrite");
  await tx.objectStore("pendingActions").clear();
  await tx.done;
}

// Helper function to reset database if corruption is detected
export async function resetDatabase() {
  try {
    const dbs = await indexedDB.databases();
    const dbExists = dbs.some((db) => db.name === DB_NAME);
    
    if (dbExists) {
      indexedDB.deleteDatabase(DB_NAME);
      console.log("Database reset successfully");
    }
    
    // Reinitialize the database
    await initDB();
  } catch (error) {
    console.error("Failed to reset database:", error);
    throw error;
  }
}