"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Images, CalendarDays, Users, Phone } from "lucide-react"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { ApexCircleLogo } from "@/components/ApexCircleLogo"
const navigationLinks = [
  {
    name: "Gallery",
    href: "#gallery",
    icon: Images,
  },
  {
    name: "Events",
    href: "#events",
    icon: CalendarDays,
  },
  {
    name: "Team",
    href: "#team",
    icon: Users,
  },
  {
    name: "Contact",
    href: "#contact",
    icon: Phone,
  },
] as any[]

// @component: PortfolioNavbar
export const PortfolioNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  const handleLinkClick = (href: string) => {
    closeMobileMenu()
    if (href.startsWith('/')) {
      // Navigate to different page
      window.location.href = href
    } else {
      // Scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        })
      }
    }
  }

  // @return
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => handleLinkClick("#home")}
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              <ApexCircleLogo iconSize={34} textClassName="text-foreground" />
            </button>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-foreground hover:text-primary px-3 py-2 text-base font-medium transition-colors duration-200 relative group"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={() => {
                closeMobileMenu()
                window.open("https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R", "_blank", "noopener,noreferrer")
              }}
              className="bg-[#156d95] text-white px-[18px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200 hover:rounded-2xl shadow-sm hover:shadow-md whitespace-nowrap leading-4 py-[15px]"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              <span
                style={{
                  fontFamily: "Figtree",
                  fontWeight: "500",
                }}
              >
                Join Community
              </span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">Theme</span>
                <DarkModeToggle />
              </div>
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </span>
                </button>
              ))}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => {
                    closeMobileMenu()
                    window.open("https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R", "_blank", "noopener,noreferrer")
                  }}
                  className="w-full bg-[#156d95] text-white px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  <span>Join Community</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
