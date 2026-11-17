"use client"

import Link from "next/link"
import { useLanguage } from "@/app/hooks/useLanguage"

const EMAIL = "nguyenminhhuy01234@gmail.com"

/**
 * 404 as a TemPad error screen: the requested branch of the timeline has been
 * pruned. Same device chrome as the preloader and the case-file browser.
 */
export default function LostVariant() {
  const { language } = useLanguage()
  const vi = language === "vi"

  return (
    <section className="lost-scene">
      <div className="tempad lost-device">
        <div className="tempad-shell">
          <div className="tempad-bezel">
            <div className="lost-screen" style={{ backgroundImage: "url(/tempad/screen.png)" }}>
              <div className="lost-status">
                <span>TEMPAD // ERROR 404</span>
                <span className="lost-status-icons" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tempad/pause.png" alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tempad/bt1.png" alt="" className="lost-battery" />
                </span>
              </div>

              <p className="lost-code" aria-hidden>
                <span>/EARTH-404</span>
                <span className="lost-blink">▌</span>
              </p>
              <h1 className="lost-title" data-text="TIMELINE NOT FOUND">
                TIMELINE NOT FOUND
              </h1>
              <p className="lost-sub">{vi ? "BIẾN THỂ ĐÃ BỊ XOÁ" : "THIS VARIANT HAS BEEN PRUNED"}</p>

              <p className="lost-body">
                {vi
                  ? "Nhánh thời gian bạn tìm không tồn tại, hoặc đã được chuyển sang nơi khác."
                  : "The branch you were looking for does not exist, or it has been moved."}
              </p>

              <nav className="lost-menu" aria-label={vi ? "Lối thoát" : "Way out"}>
                <Link href="/" data-cursor className="lost-row is-active">
                  <span className="lost-row-num">01</span>
                  <span>{vi ? "VỀ DÒNG THỜI GIAN CHÍNH" : "RETURN TO THE SACRED TIMELINE"}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tempad/arrow.png" alt="" className="lost-arrow" />
                </Link>
                <a href={`mailto:${EMAIL}`} data-cursor className="lost-row">
                  <span className="lost-row-num">02</span>
                  <span>{vi ? "BÁO LỖI CHO TVA" : "REPORT TO THE TVA"}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/tempad/arrow.png" alt="" className="lost-arrow" />
                </a>
              </nav>

              <div aria-hidden className="tempad-scan" />
            </div>
          </div>

          <div className="tempad-foot" aria-hidden>
            <span className="tempad-led lost-led" />
            <span>TVA · TEMPAD</span>
            <span className="tempad-grille" />
          </div>
        </div>
      </div>
    </section>
  )
}
