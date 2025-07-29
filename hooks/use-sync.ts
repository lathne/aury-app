"use client";

import { useState, useEffect, useCallback } from "react";
import { useNetworkStatus } from "./useNetworkStatus";
import { getPendingActions, clearPendingAction } from "@/lib/db";
import { addOrder, updateOrderStatus, removeOrder } from "@/lib/features/ordersSlice";  
import type { PendingAction, Order } from "@/lib/types/order";

export function useSync() {
  const isOnline = useNetworkStatus();
  const [syncing, setSyncing] = useState(false);

  const syncPendingActions = useCallback(async () => {
    if (!isOnline) return;

    setSyncing(true);
    try {
      const actions = await getPendingActions();
        console.log("Pending actions to sync:", actions);
        console.log("actions.length:", actions.length);
       if (actions.length !== 0) {
          for (const action of actions) {
            switch (action.type) {
            case "CREATE_ORDER":
                // Logic to create order
                break;
            case "UPDATE_ORDER":
                // Logic to update order
                break;
            case "DELETE_ORDER":
                // Logic to delete order
                break;
            case "GEOCODE_ORDER":
                // Logic to geocode order
                break;
            default:
                console.warn(`Unknown action type: ${action.type}`);
            }
            if (action.id !== undefined) {
            await clearPendingAction(action.id);
            }
            console.log(`Synced action: ${action.type}`, action);
        }
      }
    } catch (error) {
      console.error("Failed to sync pending actions:", error);
    } finally {
      setSyncing(false);
    }
  }, [isOnline]);

  useEffect(() => {
    if (isOnline) {
      syncPendingActions();
    }
  }, [isOnline, syncPendingActions]);

  return { syncing };
}