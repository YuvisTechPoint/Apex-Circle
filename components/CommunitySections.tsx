"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CalendarDays, Camera, Users, MessageSquare, Mail, Phone, Linkedin, MessageCircle } from "lucide-react"

const galleryItems = [
  {
    title: "Hackathon Sprint Moments",
    description: "Highlights from rapid build rounds where teams ship MVPs under real deadlines.",
  },
  {
    title: "Workshop Whiteboards",
    description: "Snapshots from practical sessions on AI, cybersecurity, and full-stack engineering.",
  },
  {
    title: "Project Demo Day",
    description: "Member-led demos turning ideas into deployable technology products.",
  },
]

const eventItems = [
  "Monthly hackathons and coding challenges",
  "Hands-on AI and machine learning workshops",
  "Cybersecurity labs and practical defense sessions",
  "Deep tech talks with builders and mentors",
]

const teamCrews = [
  {
    crew: "Founding Crew",
    focus: "Sets vision, drives strategy, and steers community growth.",
    scope: "Leadership",
  },
  {
    crew: "Program Crew",
    focus: "Designs hackathons, workshops, and learning tracks across AI, security, and dev.",
    scope: "Programs & Curriculum",
  },
  {
    crew: "Community Operations Crew",
    focus: "Onboards members, runs engagement loops, and supports chapter activities.",
    scope: "Community Ops",
  },
  {
    crew: "Tech & Product Crew",
    focus: "Builds internal tools, event systems, and digital community experiences.",
    scope: "Engineering",
  },
  {
    crew: "Design & Media Crew",
    focus: "Shapes branding, visual storytelling, and communication assets for Apex Circle.",
    scope: "Design",
  },
  {
    crew: "Partnerships Crew",
    focus: "Manages sponsor collaborations, ecosystem relationships, and outreach partnerships.",
    scope: "Partnerships",
  },
  {
    crew: "Event Logistics Crew",
    focus: "Executes timelines, venue operations, and seamless on-ground event flow.",
    scope: "Execution",
  },
]

export const CommunitySections = () => {
  const [activeCrewIndex, setActiveCrewIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCrewIndex((prev) => (prev + 1) % teamCrews.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full bg-background dark:bg-background px-4 sm:px-6 lg:px-8 py-20 md:py-24">
      <div className="max-w-7xl mx-auto space-y-24">
        <div id="gallery" className="space-y-8">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-[34px] leading-tight text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Gallery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card dark:bg-secondary p-6"
              >
                <h3 className="text-lg text-foreground mb-2" style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 500 }}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="events" className="space-y-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-[34px] leading-tight text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Events
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card dark:bg-secondary p-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventItems.map((event) => (
                <li key={event} className="text-base text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  {event}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="team" className="space-y-8">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-[34px] leading-tight text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Team
            </h2>
          </div>
          <div className="relative rounded-2xl border border-border bg-card dark:bg-secondary p-6 md:p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Apex Circle Team Crews
              </p>
              <div className="flex items-center gap-2">
                {teamCrews.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveCrewIndex(index)}
                    className={`h-2 rounded-full transition-all ${index === activeCrewIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                    aria-label={`Show crew ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              key={teamCrews[activeCrewIndex].crew}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-xl border border-border/80 bg-background/60 p-6 md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-primary mb-3" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                {teamCrews[activeCrewIndex].scope}
              </p>
              <h3 className="text-2xl md:text-3xl text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 500 }}>
                {teamCrews[activeCrewIndex].crew}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-3xl" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                {teamCrews[activeCrewIndex].focus}
              </p>
            </motion.div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setActiveCrewIndex((prev) => (prev - 1 + teamCrews.length) % teamCrews.length)}
                className="px-4 py-2 rounded-full border border-border text-foreground hover:border-primary/50 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveCrewIndex((prev) => (prev + 1) % teamCrews.length)}
                className="px-4 py-2 rounded-full border border-border text-foreground hover:border-primary/50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div id="contact" className="space-y-8">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-[34px] leading-tight text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Contact
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card dark:bg-secondary p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="mailto:apexcircleofficial2025@gmail.com" className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              <Mail className="w-4 h-4" />
              apexcircleofficial2025@gmail.com
            </a>
            <a href="tel:+916291129896" className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              <Phone className="w-4 h-4" />
              +91 62911 29896
            </a>
            <a href="https://www.linkedin.com/company/apex-circle-official/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              <Linkedin className="w-4 h-4" />
              LinkedIn: Apex Circle Official
            </a>
            <a href="https://discord.com/invite/K5PEUWnjYs" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              <MessageCircle className="w-4 h-4" />
              Discord: Join Server
            </a>
            <a href="https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors md:col-span-2 inline-flex items-center gap-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp Channel: Follow for updates
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
