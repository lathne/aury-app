"use client";

import { useState, useEffect, useCallback } from "react";
import { useNetworkStatus } from "./useNetworkStatus";
import {
  getPendingActions,
  clearPendingAction,
  saveOrder,
  updateOrder,
  deleteOrder,
} from "@/lib/db";
import { geocodeAddress } from "@/lib/geocoding";

export function useSync() {
  const isOnline = useNetworkStatus();
  const [syncing, setSyncing] = useState(false);

  const syncPendingActions = useCallback(async () => {
    if (!isOnline) return;

    setSyncing(true);
    try {
      const actions = await getPendingActions();
      if (actions.length !== 0) {
        for (const action of actions) {
          try {
            switch (action.type) {
              case "CREATE_ORDER": {
                await saveOrder(action.payload);
                break;
              }
              case "UPDATE_ORDER": {
                await updateOrder(action.payload.orderId, {
                  status: action.payload.status,
                });
                break;
              }
              case "DELETE_ORDER": {
                await deleteOrder(action.payload.orderId);
                break;
              }
              case "GEOCODE_ORDER": {
                const coords = await geocodeAddress(action.payload.address);
                if (coords) {
                  await updateOrder(action.payload.orderId, coords);
                }
                break;
              }
              default:
                console.warn(`Unknown action type: ${action.type}`);
            }
            
            if (action.id !== undefined) {
              await clearPendingAction(action.id);
            }
          } catch (actionError) {
            console.error(`Failed to process action ${action.type}:`, actionError);
            // Continue processing other actions even if one fails
          }
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

  useEffect(() => {
    const syncOnOnline = () => {
      syncPendingActions();
    };

    window.addEventListener("online", syncOnOnline);
    return () => window.removeEventListener("online", syncOnOnline);
  }, [syncPendingActions]);

  return { syncing };
}
