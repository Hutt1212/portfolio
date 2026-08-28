import Link from "next/link"

export default function NotFound() {
  return (
    <div className="shell flex min-h-[85svh] flex-col justify-center pb-20 pt-32 text-foreground">
      <span className="t-label text-[hsl(var(--orange))]">
        Error 404 / Page not found
      </span>

      <h1 className="t-display t-hero mt-6">
        404
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-12">
        <p className="t-lede max-w-[46ch] text-muted-foreground md:col-span-7">
          Trang này không tồn tại hoặc đã được chuyển sang nơi khác.
        </p>

        <div className="md:col-span-5">
          <Link href="/" data-cursor className="pill pill-solid !px-8 !py-5">
            Về trang chủ →
          </Link>
        </div>
      </div>
    </div>
  )
}
