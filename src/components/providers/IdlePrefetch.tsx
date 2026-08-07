/**
 * Prefetch disabled — eager section imports avoid a Vite/Rolldown lazy-chunk
 * interop bug that crashed production with React error #130.
 */
export function IdlePrefetch() {
  return null
}
