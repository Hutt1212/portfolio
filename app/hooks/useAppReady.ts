"use client"

import { useSyncExternalStore } from "react"
import { getAppReady, getAppReadyServer, subscribeAppReady } from "@/lib/app-ready"

/** True once the preloader has started lifting. See lib/app-ready.ts. */
export function useAppReady() {
  return useSyncExternalStore(subscribeAppReady, getAppReady, getAppReadyServer)
}
