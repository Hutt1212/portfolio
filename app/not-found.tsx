import type { Metadata } from "next"
import LostVariant from "./components/y/LostVariant"

export const metadata: Metadata = {
  title: "404 · Timeline not found | Nguyễn Minh Huy",
  robots: { index: false },
}

export default function NotFound() {
  return <LostVariant />
}
