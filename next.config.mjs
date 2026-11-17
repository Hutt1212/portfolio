/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Served through Next's optimiser (on Vercel: its image CDN): each
    // screenshot is resized to the width the layout asks for and re-encoded
    // as AVIF/WebP, instead of shipping the original multi-megabyte PNGs.
    formats: ["image/avif", "image/webp"],
    // Screenshots never change once committed; cache them for a month.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default nextConfig
