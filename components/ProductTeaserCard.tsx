"use client"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
type ProductTeaserCardProps = {
  dailyVolume?: string
  dailyVolumeLabel?: string
  headline?: string
  subheadline?: string
  description?: string
  videoSrc?: string
  posterSrc?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  heroImageSrc?: string
}

// @component: ProductTeaserCard
export const ProductTeaserCard = (props: ProductTeaserCardProps) => {
  const {
    dailyVolume = "Always On",
    dailyVolumeLabel = "UPCOMING EVENTS & COMMUNITY UPDATES",
    headline = "A community where innovators build real solutions together",
    subheadline = "Apex Circle brings together problem-solvers, coders, AI builders, cybersecurity enthusiasts, and deep tech explorers through hackathons, workshops, and hands-on projects.",
    description = "Whether you are just starting or already experienced, this is your space to learn, collaborate, and ship impactful technology with like-minded members.",
    videoSrc = "https://cdn.sanity.io/files/1t8iva7t/production/a2cbbed7c998cf93e7ecb6dae75bab42b13139c2.mp4",
    posterSrc = "/images/design-mode/9ad78a5534a46e77bafe116ce1c38172c60dc21a-1069x1068.png",
    primaryButtonText = "Join Community",
    primaryButtonHref = "https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R",
    secondaryButtonText = "Email Us",
    secondaryButtonHref = "mailto:apexcircleofficial2025@gmail.com",
    heroImageSrc = "/placeholder.jpg",
  } = props

  // @return
  return (
    <section id="home" className="w-full px-8 pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-2">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
            }}
            className="col-span-12 lg:col-span-6 bg-card dark:bg-secondary rounded-[40px] p-12 lg:p-16 flex flex-col justify-end aspect-square overflow-hidden"
          >
            <a
              href={primaryButtonHref}
              className="flex flex-col gap-1 text-muted-foreground dark:text-muted-foreground"
            >
              <motion.span
                initial={{
                  transform: "translateY(20px)",
                  opacity: 0,
                }}
                animate={{
                  transform: "translateY(0px)",
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.645, 0.045, 0.355, 1],
                  delay: 0.6,
                }}
                className="text-sm uppercase tracking-tight font-mono flex items-center gap-1"
                style={{
                  fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
                }}
              >
                {dailyVolumeLabel}
                <ArrowUpRight className="w-[0.71em] h-[0.71em]" />
              </motion.span>
              <span
                className="text-[32px] leading-[160px] tracking-tight bg-gradient-to-r from-[#202020] via-[#00517f] via-[#52aee3] to-[#9ed2fc] bg-clip-text text-transparent"
                style={{
                  fontFeatureSettings: '"clig" 0, "liga" 0',
                  height: "98px",
                  marginBottom: "0px",
                  paddingTop: "",
                  display: "none",
                }}
              >
                {dailyVolume}
              </span>
            </a>

            <h1
              className="text-[56px] leading-[60px] tracking-tight text-foreground dark:text-foreground max-w-[520px] mb-6"
              style={{
                fontWeight: "500",
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              {headline}
            </h1>

            <p
              className="text-lg leading-7 text-card-foreground dark:text-muted-foreground max-w-[520px] mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              {subheadline}
            </p>

            <div className="max-w-[520px] mb-0">
              <p
                className="text-base leading-5"
                style={{
                  display: "none",
                }}
              >
                {description}
              </p>
            </div>

            <ul className="flex gap-1.5 flex-wrap mt-10">
              <li>
                <a
                  href={primaryButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer text-primary-foreground bg-primary rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)] hover:rounded-2xl"
                >
                  {primaryButtonText}
                </a>
              </li>
              <li>
                <a
                  href={secondaryButtonHref}
                  className="block cursor-pointer text-foreground dark:text-card-foreground border-border dark:border-border rounded-full px-[18px] py-[15px] text-base leading-4 whitespace-nowrap transition-all duration-150 ease-[cubic-bezier(0.455,0.03,0.515,0.955)] hover:rounded-2xl"
                >
                  {secondaryButtonText}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
              delay: 0.2,
            }}
            className="col-span-12 lg:col-span-6 bg-card dark:bg-secondary rounded-[40px] flex justify-center items-center aspect-square overflow-hidden"
          >
            <img
              src={heroImageSrc}
              alt="Apex Circle community event"
              className="w-full h-full object-cover rounded-[40px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
