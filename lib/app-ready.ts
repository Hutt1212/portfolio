/**
 * Tiny external store marking the moment the preloader hands the screen over.
 *
 * Hero-level entrance animations subscribe to this so they play *after* the
 * curtain lifts instead of running underneath it. Deliberately module scope
 * rather than a context: the value flips exactly once per page load, and a
 * provider would re-render the whole tree to deliver it.
 */
let ready = false
const listeners = new Set<() => void>()

export function markAppReady() {
  if (ready) return
  ready = true
  listeners.forEach((listener) => listener())
}

export function subscribeAppReady(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getAppReady() {
  return ready
}

/** Always false on the server, so SSR emits the pre-animation state. */
export function getAppReadyServer() {
  return false
}
