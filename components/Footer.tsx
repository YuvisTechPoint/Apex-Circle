"use client"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { ApexCircleLogo } from "@/components/ApexCircleLogo"

type FooterLink = {
  label: string
  href: string
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

type FooterProps = {
  companyName?: string
  tagline?: string
  sections?: FooterSection[]
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    email?: string
  }
  copyrightText?: string
}

const defaultSections: FooterSection[] = [
  {
    title: "Community",
    links: [
      { label: "Gallery", href: "#gallery" },
      { label: "Events", href: "#events" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "LinkedIn Page", href: "https://www.linkedin.com/company/apex-circle-official/" },
      { label: "Discord Community", href: "https://discord.com/invite/K5PEUWnjYs" },
      { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R" },
      { label: "Event Updates", href: "https://www.linkedin.com/company/apex-circle-official/" },
      { label: "Contact", href: "mailto:apexcircleofficial2025@gmail.com" },
    ],
  },
  {
    title: "Domains",
    links: [
      { label: "Coding", href: "#features" },
      { label: "AI", href: "#features" },
      { label: "Cybersecurity", href: "#features" },
      { label: "Deep Tech", href: "#features" },
      { label: "Emerging Tech", href: "#features" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Follow Apex Circle", href: "https://www.linkedin.com/company/apex-circle-official/" },
      { label: "Join Discord", href: "https://discord.com/invite/K5PEUWnjYs" },
      { label: "Join WhatsApp Channel", href: "https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R" },
      { label: "Email Us", href: "mailto:apexcircleofficial2025@gmail.com" },
      { label: "Community FAQ", href: "#faq" },
      { label: "Home", href: "#home" },
    ],
  },
]

export const Footer = ({
  companyName = "Apex Circle",
  tagline = "A community for innovators, problem-solvers, and technology enthusiasts.",
  sections = defaultSections,
  socialLinks = {
    twitter: "https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R",
    linkedin: "https://www.linkedin.com/company/apex-circle-official/",
    github: "https://discord.com/invite/K5PEUWnjYs",
    email: "apexcircleofficial2025@gmail.com",
  },
  copyrightText,
}: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const copyright = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`
  return (
    <footer id="contact" className="w-full bg-background dark:bg-secondary border-t border-border">
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-2"
          >
            <div className="mb-4">
              <ApexCircleLogo iconSize={44} className="text-foreground mb-2" textClassName="text-foreground" />
              <p className="text-sm leading-5 text-muted-foreground dark:text-muted-foreground max-w-xs" style={{ fontFamily: "Figtree" }}>
                {tagline}
              </p>
              <p className="text-sm leading-5 text-muted-foreground dark:text-muted-foreground mt-3" style={{ fontFamily: "Figtree" }}>
                Reach us at apexcircleofficial2025@gmail.com
              </p>
              <p className="text-sm leading-5 text-muted-foreground dark:text-muted-foreground" style={{ fontFamily: "Figtree" }}>
                Call us: +91 62911 29896
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-150"
                  aria-label="WhatsApp"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-150"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-150"
                  aria-label="Discord"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-150"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="col-span-1"
            >
              <h4
                className="text-sm font-medium text-foreground dark:text-foreground mb-4 uppercase tracking-wide"
                style={{ fontFamily: "Figtree", fontWeight: "500" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground dark:text-muted-foreground hover:text-foreground transition-colors duration-150"
                      style={{ fontFamily: "Figtree" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground dark:text-muted-foreground" style={{ fontFamily: "Figtree" }}>
              {copyright}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/company/apex-circle-official/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground dark:text-muted-foreground hover:text-foreground transition-colors duration-150"
                style={{ fontFamily: "Figtree" }}
              >
                Follow on LinkedIn
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground dark:text-muted-foreground hover:text-foreground transition-colors duration-150"
                style={{ fontFamily: "Figtree" }}
              >
                Join WhatsApp Channel
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
