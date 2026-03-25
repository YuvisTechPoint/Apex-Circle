"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Handshake } from "lucide-react"

type Partner = {
  name: string
  website: string
}

const PartnerLogo = ({ name, website }: Partner) => {
  const candidates = useMemo(() => {
    const encoded = encodeURIComponent(website)
    return [
      `https://logo.clearbit.com/${new URL(website).hostname}`,
      `https://www.google.com/s2/favicons?sz=64&domain_url=${encoded}`,
    ]
  }, [website])

  const [sourceIndex, setSourceIndex] = useState(0)
  const [logoFailed, setLogoFailed] = useState(false)

  if (logoFailed) {
    return (
      <span className="w-6 h-6 rounded-md bg-primary/15 text-primary inline-flex items-center justify-center text-xs font-semibold">
        {name.charAt(0).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={candidates[sourceIndex]}
      alt={`${name} logo`}
      className="w-6 h-6 rounded-sm"
      loading="lazy"
      onError={() => {
        if (sourceIndex < candidates.length - 1) {
          setSourceIndex((prev) => prev + 1)
        } else {
          setLogoFailed(true)
        }
      }}
    />
  )
}

const partners: Partner[] = [
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

export const PartnersSection = () => {
  return (
    <section id="partners" className="w-full py-24 px-8 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Handshake className="w-8 h-8 text-primary" />
            <h2
              className="text-[40px] leading-tight text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 500 }}
            >
              Partners
            </h2>
          </div>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Apex Circle collaborates with ecosystem partners powering community innovation, events, tooling, and real-world product building.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="rounded-xl border border-border bg-card dark:bg-secondary px-4 py-4 text-center hover:border-primary/40 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center justify-center gap-3">
                <PartnerLogo name={partner.name} website={partner.website} />
                <span
                  className="text-sm md:text-base text-foreground"
                  style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 500 }}
                >
                  {partner.name}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
