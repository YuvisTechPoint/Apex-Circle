"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
type IntegrationApp = {
  name: string
  website: string
}
type IntegrationCarouselProps = {
  buttonText?: string
  buttonHref?: string
  title?: string
  subtitle?: string
  topRowApps?: IntegrationApp[]
  bottomRowApps?: IntegrationApp[]
}
const partnerApps: IntegrationApp[] = [
  { name: "DMV Core Tech", website: "https://dmvcoretech.com" },
  { name: "The Drop Organization", website: "https://drop.org.in/" },
  { name: "PCS Global", website: "https://pcsglobal.co" },
  { name: "NomoEX", website: "https://nomoex.com/" },
  { name: "DeCloudX", website: "https://decloudx.com" },
  { name: "AWS", website: "https://aws.amazon.com" },
  { name: "Requestly", website: "https://requestly.com" },
  { name: "0xDays", website: "https://0xday.io/" },
  { name: "Duality", website: "https://dualitytech.com" },
  { name: "OSEN", website: "https://osen.co" },
  { name: "Axicov", website: "https://axicov.com" },
  { name: "Keploy", website: "https://keploy.io" },
  { name: "ElevenLabs", website: "https://elevenlabs.io" },
  { name: "Lovable", website: "https://lovable.dev" },
  { name: "bolt.new", website: "https://bolt.new" },
  { name: "Trending to Infinity", website: "https://trendingtoinfinity.com" },
  { name: "Dodo Payment", website: "https://dodopayments.com" },
  { name: "n8n", website: "https://n8n.io" },
  { name: "Beeceptor", website: "https://beeceptor.com" },
  { name: "Magic UI", website: "https://magicui.design" },
  { name: ".xyz", website: "https://gen.xyz" },
  { name: "trae", website: "https://trae.ai" },
]

const defaultTopRowApps: IntegrationApp[] = partnerApps.slice(0, Math.ceil(partnerApps.length / 2))
const defaultBottomRowApps: IntegrationApp[] = partnerApps.slice(Math.ceil(partnerApps.length / 2))

// @component: IntegrationCarousel
export const IntegrationCarousel = ({
  buttonText = "Join Discord",
  buttonHref = "https://discord.com/invite/K5PEUWnjYs",
  title = "Built around the technologies shaping tomorrow.",
  subtitle = "Apex Circle explores coding, AI, cybersecurity, deep tech, and emerging tools through practical sessions and project-driven learning.",
  topRowApps = defaultTopRowApps,
  bottomRowApps = defaultBottomRowApps,
}: IntegrationCarouselProps) => {
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let topAnimationId: number
    let bottomAnimationId: number
    let topPosition = 0
    let bottomPosition = 0
    const animateTopRow = () => {
      if (topRowRef.current) {
        topPosition -= 0.5
        if (Math.abs(topPosition) >= topRowRef.current.scrollWidth / 2) {
          topPosition = 0
        }
        topRowRef.current.style.transform = `translateX(${topPosition}px)`
      }
      topAnimationId = requestAnimationFrame(animateTopRow)
    }
    const animateBottomRow = () => {
      if (bottomRowRef.current) {
        bottomPosition -= 0.65
        if (Math.abs(bottomPosition) >= bottomRowRef.current.scrollWidth / 2) {
          bottomPosition = 0
        }
        bottomRowRef.current.style.transform = `translateX(${bottomPosition}px)`
      }
      bottomAnimationId = requestAnimationFrame(animateBottomRow)
    }
    topAnimationId = requestAnimationFrame(animateTopRow)
    bottomAnimationId = requestAnimationFrame(animateBottomRow)
    return () => {
      cancelAnimationFrame(topAnimationId)
      cancelAnimationFrame(bottomAnimationId)
    }
  }, [])

  // @return
  return (
    <div id="tech-focus" className="w-full py-24 bg-background dark:bg-background">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-20"
        >
          <div className="flex flex-col items-center gap-4">
            <h2
              className="text-[40px] leading-tight font-normal text-foreground dark:text-foreground text-center tracking-tight mb-0"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: "400",
                fontSize: "40px",
              }}
            >
              {title}
            </h2>
            <p
              className="text-lg leading-7 text-muted-foreground dark:text-muted-foreground text-center max-w-[600px] mt-2"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              {subtitle}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="flex gap-3 mt-6"
          >
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2.5 rounded-full text-foreground dark:text-foreground text-[15px] font-medium leading-6 text-center whitespace-nowrap transition-all duration-75 ease-out w-[182px] cursor-pointer backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 hover:shadow-lg hover:shadow-white/10 dark:hover:shadow-white/5"
            >
              {buttonText}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="h-[268px] -mt-6 mb-0 pb-0 relative overflow-hidden">
        <div
          ref={topRowRef}
          className="flex items-start gap-6 absolute top-6 whitespace-nowrap"
          style={{
            willChange: "transform",
          }}
        >
          {[...topRowApps, ...topRowApps].map((app, index) => (
            <div
              key={`top-${index}`}
              className="flex items-center justify-center w-24 h-24 rounded-3xl flex-shrink-0 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-sm shadow-white/10 dark:shadow-white/5"
            >
              <img
                src={`https://logo.clearbit.com/${new URL(app.website).hostname}`}
                alt={app.name}
                className="w-9 h-9 block object-contain"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget
                  img.onerror = null
                  img.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(app.website)}`
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="absolute top-0 right-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0), hsl(var(--background)))",
          }}
        />

        <div
          className="absolute top-0 left-0 bottom-0 w-60 h-[268px] z-10 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(90deg, hsl(var(--background)), rgba(0, 0, 0, 0))",
          }}
        />

        <div
          ref={bottomRowRef}
          className="flex items-start gap-6 absolute top-[148px] whitespace-nowrap"
          style={{
            willChange: "transform",
          }}
        >
          {[...bottomRowApps, ...bottomRowApps].map((app, index) => (
            <div
              key={`bottom-${index}`}
              className="flex items-center justify-center w-24 h-24 rounded-3xl flex-shrink-0 backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-sm shadow-white/10 dark:shadow-white/5"
            >
              <img
                src={`https://logo.clearbit.com/${new URL(app.website).hostname}`}
                alt={app.name}
                className="w-9 h-9 block object-contain"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget
                  img.onerror = null
                  img.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(app.website)}`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
