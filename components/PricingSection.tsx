"use client"

import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

type PlanLevel = "starter" | "pro" | "enterprise"

interface PricingFeature {
  name: string
  included: PlanLevel | "all"
}

interface PricingPlan {
  name: string
  level: PlanLevel
  highlight: string
  summary: string
  popular?: boolean
}

const features: PricingFeature[] = [
  { name: "Community announcements and event alerts", included: "starter" },
  { name: "Access to beginner-friendly coding sessions", included: "starter" },
  { name: "Workshop recordings and curated resources", included: "starter" },
  { name: "Email support", included: "starter" },
  { name: "Live workshop priority seats", included: "pro" },
  { name: "Hands-on project squads", included: "pro" },
  { name: "Hackathon participation tracks", included: "pro" },
  { name: "Priority community support", included: "pro" },
  { name: "Mentor office-hour access", included: "enterprise" },
  { name: "Advanced challenge pods", included: "enterprise" },
  { name: "Project showcase spotlight", included: "enterprise" },
  { name: "Partner opportunity access", included: "enterprise" },
  { name: "Apex Circle member profile", included: "all" },
  { name: "Follow-up update digest", included: "all" },
]

const plans: PricingPlan[] = [
  {
    name: "Explorer",
    level: "starter",
    highlight: "Learn the foundations",
    summary: "Best for beginners entering coding, AI, and cybersecurity with guided support.",
  },
  {
    name: "Builder",
    level: "pro",
    highlight: "Ship real projects",
    summary: "For members who want hands-on squads, hackathons, and faster execution loops.",
    popular: true,
  },
  {
    name: "Leader",
    level: "enterprise",
    highlight: "Mentor and scale impact",
    summary: "For advanced members leading teams, mentoring builders, and showcasing innovation.",
  },
]

function shouldShowCheck(included: PricingFeature["included"], level: PlanLevel): boolean {
  if (included === "all") return true
  if (included === "enterprise" && level === "enterprise") return true
  if (included === "pro" && (level === "pro" || level === "enterprise")) return true
  if (included === "starter") return true
  return false
}

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>("pro")
  const [showHighlights, setShowHighlights] = React.useState(false)

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-figtree text-[40px] font-normal leading-tight mb-4">Choose Your Tech Journey</h2>
          <p className="font-figtree text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick the track that matches how you want to grow in the community, from learning fundamentals to leading teams and projects.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowHighlights((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground hover:border-primary/40 transition-colors"
            >
              {showHighlights ? "Hide Track Highlights" : "Show Track Highlights"}
              {showHighlights ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.name}
              type="button"
              onClick={() => setSelectedPlan(plan.level)}
              className={cn(
                "relative p-8 rounded-2xl text-left transition-all border-2",
                selectedPlan === plan.level
                  ? "border-[#156d95] bg-[#156d95]/5"
                  : "border-border hover:border-[#156d95]/50",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#156d95] text-white px-4 py-1 rounded-full text-sm font-figtree">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="font-figtree text-2xl font-medium mb-2">{plan.name}</h3>
                <p className="font-figtree text-3xl font-medium">{plan.highlight}</p>
                <p className="font-figtree text-base text-muted-foreground mt-3">{plan.summary}</p>
              </div>
              <div
                className={cn(
                  "w-full py-3 px-6 rounded-full font-figtree text-lg transition-all text-center",
                  selectedPlan === plan.level ? "bg-[#156d95] text-white" : "bg-secondary text-foreground",
                )}
              >
                {selectedPlan === plan.level ? "Selected Track" : "Select Track"}
              </div>
            </button>
          ))}
        </div>

        {/* Highlights Table */}
        {showHighlights && (
          <div className="border border-border rounded-2xl overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <div className="min-w-[768px]">
                {/* Table Header */}
                <div className="flex items-center p-6 bg-secondary border-b border-border">
                  <div className="flex-1">
                    <h3 className="font-figtree text-xl font-medium">Track Highlights</h3>
                  </div>
                  <div className="flex items-center gap-8">
                    {plans.map((plan) => (
                      <div key={plan.level} className="w-24 text-center font-figtree text-lg font-medium">
                        {plan.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature Rows */}
                {features.map((feature, index) => (
                  <div
                    key={feature.name}
                    className={cn(
                      "flex items-center p-6 transition-colors",
                      index % 2 === 0 ? "bg-background" : "bg-secondary/30",
                      feature.included === selectedPlan && "bg-[#156d95]/5",
                    )}
                  >
                    <div className="flex-1">
                      <span className="font-figtree text-lg">{feature.name}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      {plans.map((plan) => (
                        <div key={plan.level} className="w-24 flex justify-center">
                          {shouldShowCheck(feature.included, plan.level) ? (
                            <div className="w-6 h-6 rounded-full bg-[#156d95] flex items-center justify-center">
                              <CheckIcon className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#156d95] text-white px-[18px] py-[15px] rounded-full font-figtree text-lg hover:rounded-2xl transition-all"
          >
            Join {plans.find((p) => p.level === selectedPlan)?.name} Track
          </a>
        </div>
      </div>
    </section>
  )
}
