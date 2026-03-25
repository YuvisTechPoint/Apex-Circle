"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Code, Shield, Cpu, Users, Rocket, ChevronDown, ChevronUp } from "lucide-react"

type FeatureItem = {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

const features: FeatureItem[] = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Coding First Community",
    description: "Build practical coding skills by collaborating on real projects with peers, mentors, and builders.",
    delay: 0,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Cybersecurity Track",
    description: "Explore security fundamentals, attack-defense thinking, and hands-on challenge labs with the community.",
    delay: 0.1,
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI and ML Projects",
    description: "Learn and apply AI concepts through guided sessions and project builds that solve meaningful problems.",
    delay: 0.2,
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Hackathons and Workshops",
    description: "From ideation to demos, participate in events that sharpen teamwork, execution, and innovation speed.",
    delay: 0.3,
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Deep Tech Exploration",
    description: "Dive into frontier topics across systems, advanced computing, and emerging technologies.",
    delay: 0.4,
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Build and Launch",
    description: "Turn ideas into polished outcomes and showcase your work to a network of passionate tech enthusiasts.",
    delay: 0.5,
  },
]

export const FeaturesSection = () => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section id="features" className="w-full py-24 bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2
            className="text-[40px] leading-tight font-normal text-foreground dark:text-foreground text-center tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: "400",
              fontSize: "40px",
            }}
          >
            Learn, Collaborate, and Build at Apex Circle
          </h2>
          <p
            className="text-lg leading-7 text-muted-foreground dark:text-muted-foreground text-center max-w-3xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            Apex Circle is a community for innovators and problem-solvers where hackathons, workshops, and hands-on projects help you grow real technical depth.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground hover:border-primary/40 transition-colors"
            >
              {isExpanded ? "Hide Features" : "Show Features"}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {isExpanded && (
          <>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: feature.delay, ease: "easeOut" }}
                  className="group"
                >
                  <div className="p-8 rounded-2xl bg-card dark:bg-secondary border border-border dark:border-border hover:border-[#156d95]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#156d95]/10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-[#156d95]/10 flex items-center justify-center mb-6 group-hover:bg-[#156d95]/20 transition-colors duration-300">
                      <div className="text-[#156d95]">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <h3
                      className="text-xl font-semibold text-foreground dark:text-foreground mb-3"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                        fontWeight: "500",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-base leading-6 text-muted-foreground dark:text-muted-foreground"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="text-center mt-16"
            >
              <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-[#156d95]/5 border border-[#156d95]/20">
                <div className="text-left">
                  <h3
                    className="text-lg font-semibold text-foreground dark:text-foreground mb-1"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                      fontWeight: "500",
                    }}
                  >
                    Ready to build with us?
                  </h3>
                  <p
                    className="text-sm text-muted-foreground dark:text-muted-foreground"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    Join our WhatsApp channel for event drops, workshop updates, and hackathon alerts.
                  </p>
                </div>
                <a
                  href="https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#156d95] text-white px-6 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-all duration-200 hover:rounded-2xl whitespace-nowrap"
                >
                  Join WhatsApp Channel
                </a>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
