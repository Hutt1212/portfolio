"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

/**
 * next/image with a loading state. Screenshots are served unoptimised and some
 * are large, so until the bytes arrive the parent `.frame` shows a shimmer and
 * the picture fades in once decoded instead of popping in line by line.
 *
 * Callers should key this by `src` when they swap images, so the shimmer comes
 * back for the new shot.
 */
export default function ShotImage({ className = "", onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <span aria-hidden className="frame-shimmer" />}
      <Image
        {...props}
        className={`${className} shot-img ${loaded ? "is-loaded" : ""}`}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        onError={() => setLoaded(true)}
      />
    </>
  )
}
