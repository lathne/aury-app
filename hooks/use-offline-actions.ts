"use client";

import { useState, useEffect, useCallback } from "react";
import { useNetworkStatus } from "./useNetworkStatus";
import { getPendingActions, clearPendingAction } from "@/lib/db";

export function useSyncPendingActions(syncFn: (action: any) => Promise<void>) {
  useEffect(() => {
    async function sync() {
      const actions = await getPendingActions();
      for (const action of actions) {
        try {
          await syncFn(action); // Tenta sincronizar a ação
          if (action.id) await clearPendingAction(action.id);
        } catch (e) {
          console.error("Erro ao sincronizar ação offline:", e);
          // Se falhar, mantém no IndexedDB
        }
      }
    }

    window.addEventListener("online", sync);
    return () => window.removeEventListener("online", sync);
  }, [syncFn]);
}
