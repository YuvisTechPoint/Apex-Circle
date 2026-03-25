"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CalendarDays, Camera, Users, MessageSquare, Mail, Phone, Linkedin, MessageCircle, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"

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
    asset: "/auditorium-calcutta-hacks.jpg",
    accent: "from-sky-500/30 to-blue-700/20",
    pulse: "Vision Sprint 92%",
    members: [
      "Soumodweep Das - Founder",
      "Souvik Ghosh - Co-Founder",
      "Pritam Das - Co-Founder",
      "Yuvraj Prasad - Co-Founder",
    ],
  },
  {
    crew: "Program Crew",
    focus: "Designs hackathons, workshops, and learning tracks across AI, security, and dev.",
    scope: "Programs & Curriculum",
    asset: "/images.jpg",
    accent: "from-cyan-500/30 to-emerald-600/20",
    pulse: "Tracks Delivered 18+",
    members: ["Hackathon Flow Owners", "Workshop Architects", "Mentor Coordinators", "Track Curators"],
  },
  {
    crew: "Community Operations Crew",
    focus: "Onboards members, runs engagement loops, and supports chapter activities.",
    scope: "Community Ops",
    asset: "/auditorium-calcutta-hacks.jpg",
    accent: "from-fuchsia-500/25 to-indigo-600/20",
    pulse: "Member Engagement High",
    members: ["Onboarding Leads", "Community Managers", "Experience Team", "Support Desk"],
  },
  {
    crew: "Tech & Product Crew",
    focus: "Builds internal tools, event systems, and digital community experiences.",
    scope: "Engineering",
    asset: "/image-man.jpeg",
    accent: "from-blue-500/30 to-slate-700/20",
    pulse: "Platform Uptime 99.9%",
    members: ["Frontend Squad", "Backend Squad", "Automation Team", "Product Builders"],
    groupAsset: "/auditorium-calcutta-hacks.jpg",
  },
  {
    crew: "Design & Media Crew",
    focus: "Shapes branding, visual storytelling, and communication assets for Apex Circle.",
    scope: "Design",
    asset: "/images.jpg",
    accent: "from-violet-500/30 to-pink-600/20",
    pulse: "Brand Reach Growing",
    members: ["Visual Designers", "Social Creators", "Video Editors", "Content Designers"],
    groupAsset: "/auditorium-calcutta-hacks.jpg",
  },
  {
    crew: "Partnerships Crew",
    focus: "Manages sponsor collaborations, ecosystem relationships, and outreach partnerships.",
    scope: "Partnerships",
    asset: "/auditorium-calcutta-hacks.jpg",
    accent: "from-emerald-500/30 to-teal-700/20",
    pulse: "Partner Pipeline Active",
    members: ["Sponsor Relations", "Ecosystem Team", "Community Alliances", "Outreach Leads"],
    groupAsset: "/auditorium-calcutta-hacks.jpg",
  },
  {
    crew: "Event Logistics Crew",
    focus: "Executes timelines, venue operations, and seamless on-ground event flow.",
    scope: "Execution",
    asset: "/auditorium-calcutta-hacks.jpg",
    accent: "from-amber-500/30 to-orange-700/20",
    pulse: "Runbook Readiness 96%",
    members: ["Operations Leads", "Venue Coordinators", "Volunteer Managers", "Stage & AV Team"],
    groupAsset: "/auditorium-calcutta-hacks.jpg",
  },
]

export const CommunitySections = () => {
  const [activeCrewIndex, setActiveCrewIndex] = useState(0)
  const [showAltAsset, setShowAltAsset] = useState<Record<number, boolean>>({})

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
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(21,109,149,0.18),transparent_40%)]" />
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Apex Circle Team Crews
                </p>
                <p className="text-xs text-muted-foreground/80 mt-1 inline-flex items-center gap-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Premium team snapshots and live crew highlights
                </p>
              </div>
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
              className={`rounded-xl border border-border/80 bg-background/70 p-5 sm:p-6 md:p-8 bg-gradient-to-br ${teamCrews[activeCrewIndex].accent}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                <div className="lg:col-span-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-primary mb-3" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    {teamCrews[activeCrewIndex].scope}
                  </p>
                  <h3 className="text-2xl md:text-3xl text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 500 }}>
                    {teamCrews[activeCrewIndex].crew}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-3xl" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    {teamCrews[activeCrewIndex].focus}
                  </p>
                  <div className="mt-5 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    {teamCrews[activeCrewIndex].pulse}
                  </div>
                  {teamCrews[activeCrewIndex].members && (
                    <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {teamCrews[activeCrewIndex].members.map((member) => (
                        <li
                          key={member}
                          className="text-sm text-foreground/90 bg-background/70 border border-border/70 rounded-lg px-3 py-2"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {member}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <div className="relative h-44 sm:h-52 lg:h-full min-h-[220px] rounded-xl overflow-hidden border border-border/80">
                      <Image
                        src={showAltAsset[activeCrewIndex] && teamCrews[activeCrewIndex].groupAsset ? teamCrews[activeCrewIndex].groupAsset : teamCrews[activeCrewIndex].asset}
                        alt={`${teamCrews[activeCrewIndex].crew} visual`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 35vw"
                      />
                      {teamCrews[activeCrewIndex].groupAsset && (
                        <button
                          type="button"
                          onClick={() => setShowAltAsset((s) => ({ ...s, [activeCrewIndex]: !s[activeCrewIndex] }))}
                          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-background/60 border border-border/60 flex items-center justify-center hover:scale-105 transition-transform"
                          aria-label="Toggle group image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 7h4l3-3h4l3 3h4" />
                            <rect x="3" y="7" width="18" height="13" rx="2" />
                          </svg>
                        </button>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/20 bg-background/60 backdrop-blur px-3 py-2">
                        <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                          Crew Snapshot
                        </p>
                        <p className="text-sm text-foreground" style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 500 }}>
                          Building modern tech communities through execution
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setActiveCrewIndex((prev) => (prev - 1 + teamCrews.length) % teamCrews.length)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground hover:border-primary/50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveCrewIndex((prev) => (prev + 1) % teamCrews.length)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground hover:border-primary/50 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
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
