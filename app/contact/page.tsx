"use client"

import { useLanguage } from "@/app/hooks/useLanguage"
import PageHeader from "@/app/components/y/PageHeader"
import Magnetic from "@/app/components/y/Magnetic"

const EMAIL = "nguyenminhhuy01234@gmail.com"
const GITHUB = "https://github.com/Hutt1212"

export default function ContactPage() {
  const { t, language } = useLanguage()
  const vi = language === "vi"

  const channels = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { label: "GitHub", value: "Hutt1212", href: GITHUB },
    { label: vi ? "Vị trí" : "Location", value: t.site.location },
    { label: vi ? "Tình trạng" : "Availability", value: t.hero.status },
  ]

  return (
    <>
      <PageHeader
        eyebrow={t.site.labels.contact}
        title={t.footer.contactTitle}
        lede={
          vi
            ? "Nếu bạn có một dự án cần người làm fullstack, hoặc chỉ muốn trao đổi kỹ thuật, cứ nhắn tôi."
            : "If you have a project that needs a fullstack developer, or just want to talk shop, send a note."
        }
      />

      <section className="shell pb-28 pt-12 md:pb-40 md:pt-16">
        <dl>
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="grid gap-2 border-t-[1.5px] border-foreground/[0.14] py-6 last:border-b-[1.5px] md:grid-cols-12 md:gap-10 md:py-8"
            >
              <dt className="t-label text-muted-foreground md:col-span-3">{channel.label}</dt>
              <dd className="t-mid truncate-safe md:col-span-9">
                {channel.href ? (
                  <a
                    href={channel.href}
                    data-cursor
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="underline decoration-1 underline-offset-8 hover:text-[hsl(var(--violet))]"
                  >
                    {channel.value}
                  </a>
                ) : (
                  channel.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 md:mt-20">
          <Magnetic>
            <a href={`mailto:${EMAIL}`} data-cursor className="pill pill-solid !px-9 !py-5">
              {vi ? "Gửi lời nhắn" : "Send a message"} →
            </a>
          </Magnetic>
        </div>
      </section>
    </>
  )
}
