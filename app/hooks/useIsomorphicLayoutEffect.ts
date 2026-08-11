import { useEffect, useLayoutEffect } from "react"

/**
 * GSAP setup must run before paint or the first frame shows unstyled elements,
 * but useLayoutEffect warns during SSR. This picks the right one per environment.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect
