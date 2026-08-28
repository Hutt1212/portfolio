/**
 * Extra screenshots per project, keyed by project id.
 *
 * The first entry is the one the drawer opens on, so it should be the same
 * shot as the project's `image` in the translations — otherwise the picture
 * visibly swaps the moment the panel opens.
 */
export const PROJECT_GALLERY: Record<string, string[]> = {
  unagi: [
    "/projects/unagi-hero.png",
    "/projects/unagi-features.png",
    "/projects/unagi-combo.png",
  ],
  bddwriter: [    
    "/projects/bddwriter-features.jpg",
    "/projects/bddwriter-landing.jpg",    
    "/projects/bddwriter-chat-1.png",
    "/projects/bddwriter-chat-2.png",

  ],
  portfolio: ["/projects/portfolio-hero.png"],
}

/** Falls back to the project's own image so a missing entry still renders. */
export function galleryFor(id: string, fallback: string) {
  return PROJECT_GALLERY[id]?.length ? PROJECT_GALLERY[id] : [fallback]
}
