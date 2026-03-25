"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
type StatItem = {
  value: string
  description: string
  delay: number
}
type DataPoint = {
  id: number
  left: number
  top: number
  height: number
  direction: "up" | "down"
  delay: number
}
const stats: StatItem[] = [
  {
    value: "5K+",
    description: "Community members\nlearning together",
    delay: 0,
  },
  {
    value: "120+",
    description: "Hackathons, workshops,\nand project sessions",
    delay: 0.2,
  },
  {
    value: "6",
    description: "Core domains from coding\nto deep tech",
    delay: 0.4,
  },
  {
    value: "Open",
    description: "For beginners and experts\nbuilding side by side",
    delay: 0.6,
  },
]
const generateDataPoints = (): DataPoint[] => {
  const points: DataPoint[] = []
  const baseLeft = 1
  const spacing = 32
  for (let i = 0; i < 50; i++) {
    const direction = i % 2 === 0 ? "down" : "up"
    const height = Math.floor(Math.random() * 120) + 88
    const top = direction === "down" ? Math.random() * 150 + 250 : Math.random() * 100 - 80
    points.push({
      id: i,
      left: baseLeft + i * spacing,
      top,
      height,
      direction,
      delay: i * 0.035,
    })
  }
  return points
}

// @component: BankingScaleHero
export const BankingScaleHero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [dataPoints] = useState<DataPoint[]>(generateDataPoints())
  const [typingComplete, setTypingComplete] = useState(false)
  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setTypingComplete(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // @return
  return (
    <div className="w-full overflow-hidden bg-background dark:bg-background">
      <div className="mx-auto max-w-7xl px-8 py-24 pt-16">
        <div className="grid grid-cols-12 gap-5 gap-y-16">
          <div className="col-span-12 md:col-span-6 relative z-10">
            <div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-primary mb-12 px-2"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
              }}
            >
              <div className="flex items-center gap-0.5 overflow-hidden">
                <motion.span
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "auto",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="block whitespace-nowrap overflow-hidden text-primary relative z-10"
                >
                  Community momentum at scale
                </motion.span>
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: typingComplete ? [1, 0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="block w-1.5 h-3 bg-primary ml-0.5 relative z-10 rounded-sm"
                />
              </div>
            </div>

            <h2
              className="text-[40px] font-normal leading-tight tracking-tight text-foreground mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontSize: "40px",
                fontWeight: "400",
              }}
            >
              Turning ideas into working solutions{" "}
              <span
                className="opacity-40"
                style={{
                  fontWeight: "400",
                  fontSize: "40px",
                }}
              >
                through collaboration, mentorship, and hands-on innovation.
              </span>
            </h2>

            <p
              className="text-lg leading-6 text-muted-foreground mt-0 mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Apex Circle hosts the spaces where coders, AI builders, cybersecurity enthusiasts, and deep tech explorers learn,
              ship, and grow together.
            </p>

            <a
              href="https://www.linkedin.com/company/apex-circle-official/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex justify-center items-center leading-4 text-center cursor-pointer whitespace-nowrap outline-none font-medium h-12 text-primary-foreground bg-primary rounded-full px-8 mt-5 text-base transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Follow on LinkedIn
                <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="relative w-full h-[416px] -ml-[200px]">
              <div className="absolute top-0 left-[302px] w-[680px] h-[416px] pointer-events-none">
                <div className="relative w-full h-full">
                  {dataPoints.map((point) => (
                    <motion.div
                      key={point.id}
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={
                        isVisible
                          ? {
                              opacity: [0, 1, 1],
                              height: [0, point.height, point.height],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        delay: point.delay,
                        ease: [0.5, 0, 0.01, 1],
                      }}
                      className="absolute w-1.5 rounded-[3px]"
                      style={{
                        left: `${point.left}px`,
                        top: `${point.top}px`,
                        background:
                          point.direction === "down"
                            ? "linear-gradient(rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)"
                            : "linear-gradient(to top, rgb(176, 200, 196) 0%, rgb(176, 200, 196) 10%, rgba(156, 217, 93, 0.1) 40%, rgba(113, 210, 240, 0) 75%)",
                        backgroundColor: "rgba(22, 126, 108, 0.01)",
                      }}
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={
                          isVisible
                            ? {
                                opacity: [0, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.3,
                          delay: point.delay + 1.7,
                        }}
                        className="absolute -left-[1px] w-2 h-2 bg-[#167E6C] rounded-full"
                        style={{
                          top: point.direction === "down" ? "0px" : `${point.height - 8}px`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="overflow-visible pb-5">
              <div className="grid grid-cols-12 gap-5 relative z-10">
                {stats.map((stat, index) => (
                  <div key={index} className="col-span-6 md:col-span-3">
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(4px)",
                      }}
                      animate={
                        isVisible
                          ? {
                              opacity: [0, 1, 1],
                              y: [20, 0, 0],
                              filter: ["blur(4px)", "blur(0px)", "blur(0px)"],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        delay: stat.delay,
                        ease: [0.1, 0, 0.1, 1],
                      }}
                      className="flex flex-col gap-2"
                    >
                      <span
                        className="text-2xl font-medium leading-[26.4px] tracking-tight text-primary"
                      >
                        {stat.value}
                      </span>
                      <p className="text-xs leading-[13.2px] text-muted-foreground m-0 whitespace-pre-line">
                        {stat.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
