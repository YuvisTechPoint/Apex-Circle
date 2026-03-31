import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────
const T = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#1a1a26",
  accent: "#6c63ff",
  accent2: "#ff6584",
  accent3: "#43e97b",
  text: "#e8e8f0",
  muted: "#6b6b8a",
  border: "rgba(108,99,255,0.18)",
};

// ─── GLOBAL STYLES ───────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${T.bg}; color: ${T.text}; font-family: 'Syne', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${T.bg}; }
  ::-webkit-scrollbar-thumb { background: ${T.accent}; border-radius: 10px; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(108,99,255,0.4); } 50% { box-shadow: 0 0 0 12px rgba(108,99,255,0); } }
  @keyframes shimmer { from { background-position: -200% center; } to { background-position: 200% center; } }
  .fade-up { animation: fadeUp 0.6s ease both; }
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
`;

// ─── HOOKS ───────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── PRIMITIVE COMPONENTS ────────────────────────────────
const SectionLabel = ({ children, color = T.accent }) => (
  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color, textTransform: "uppercase", letterSpacing: "3px", marginBottom: "0.6rem" }}>
    {children}
  </div>
);

const SectionTitle = ({ children, style = {} }) => (
  <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1rem", ...style }}>
    {children}
  </h2>
);

const SectionSub = ({ children }) => (
  <p style={{ color: T.muted, fontSize: "1rem", maxWidth: 580, marginBottom: "2.5rem", lineHeight: 1.7 }}>
    {children}
  </p>
);

const BtnPrimary = ({ children, onClick, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: T.accent, color: "#fff", border: "none", padding: "0.8rem 2rem", borderRadius: 50, fontFamily: "'Space Mono',monospace", fontSize: "0.8rem", cursor: "pointer", transform: hov ? "translateY(-2px)" : "none", opacity: hov ? 0.9 : 1, transition: "all 0.2s", ...style }}>
      {children}
    </button>
  );
};

const BtnOutline = ({ children, onClick, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(108,99,255,0.08)" : "transparent", color: T.text, border: `1px solid ${hov ? T.accent : T.border}`, padding: "0.8rem 2rem", borderRadius: 50, fontFamily: "'Space Mono',monospace", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s", ...style }}>
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, accentColor = T.accent }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: T.card, border: `1px solid ${hov ? accentColor : T.border}`, borderRadius: 14, padding: "1.8rem", transform: hov ? "translateY(-4px)" : "none", transition: "all 0.25s", position: "relative", overflow: "hidden", ...style }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.accent}, ${T.accent2})`, opacity: hov ? 1 : 0, transition: "opacity 0.25s" }} />
      {children}
    </div>
  );
};

const Dot = ({ color = T.accent3 }) => (
  <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: color }} />
);

const CardTag = ({ children, color = T.accent }) => (
  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.63rem", color, textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "0.7rem", display: "flex", alignItems: "center", gap: 6 }}>
    {children}
  </div>
);

// ─── NAVBAR ──────────────────────────────────────────────
const NAV_ITEMS = ["Home","Hackathons","Events","Projects","Team","Gallery","Community","About","Contact"];

function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 2.5rem", background: scrolled ? "rgba(10,10,15,0.92)" : "rgba(10,10,15,0.7)", backdropFilter: "blur(18px)", borderBottom: `1px solid ${T.border}`, transition: "background 0.3s" }}>
      {/* Logo */}
      <button onClick={() => go("Home")} style={{ fontFamily: "'Space Mono',monospace", fontSize: "1.15rem", fontWeight: 700, color: T.accent, letterSpacing: -1, background: "none", border: "none", cursor: "pointer" }}>
        APEX<span style={{ color: T.accent2 }}>◉</span>CIRCLE
      </button>

      {/* Desktop links */}
      <ul style={{ display: "flex", gap: "1.8rem", listStyle: "none", alignItems: "center" }}
        className="desktop-nav">
        {NAV_ITEMS.map(n => (
          <li key={n}>
            <button onClick={() => go(n)} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: page === n ? T.accent : T.muted, background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}>
              {n}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <BtnPrimary onClick={() => go("Community")} style={{ fontSize: "0.72rem", padding: "0.5rem 1.2rem" }}>
        Join Now →
      </BtnPrimary>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer" }} id="hamburger">
        {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: T.text, borderRadius: 2 }} />)}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 58, left: 0, right: 0, background: "rgba(10,10,15,0.97)", padding: "2rem 1.5rem", borderBottom: `1px solid ${T.border}`, backdropFilter: "blur(18px)", display: "flex", flexDirection: "column", gap: "1.2rem", zIndex: 99 }}>
          {NAV_ITEMS.map(n => (
            <button key={n} onClick={() => go(n)} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "1.5px", color: page === n ? T.accent : T.muted, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "8rem", paddingBottom: "4rem", paddingLeft: "5vw", paddingRight: "5vw", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(108,99,255,0.12), transparent 70%), radial-gradient(ellipse 40% 40% at 15% 70%, rgba(255,101,132,0.08), transparent 60%)", pointerEvents: "none" }} />
        <div className="fade-up" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.72rem", color: T.accent, textTransform: "uppercase", letterSpacing: "4px", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 28, height: 2, background: T.accent }} />
            India's Premier Tech Community
          </div>
          <h1 style={{ fontSize: "clamp(3.5rem,10vw,8rem)", fontWeight: 800, lineHeight: 0.95, marginBottom: "1.4rem" }}>
            Build.<br />Connect.<br />
            <span style={{ WebkitTextStroke: `1.5px ${T.accent}`, color: "transparent" }}>Innovate.</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: T.muted, maxWidth: 500, marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Apex Circle brings together builders, creators, and innovators through hackathons, workshops, and real-world projects.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <BtnPrimary onClick={() => setPage("Community")}>Join Community →</BtnPrimary>
            <BtnOutline onClick={() => setPage("Hackathons")}>Explore Hackathons</BtnOutline>
            <BtnOutline onClick={() => setPage("Events")}>View Events</BtnOutline>
          </div>
          <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
            {[["2,400+","Community Members"],["18","Hackathons Hosted"],["₹12L+","Prize Pool"],["340+","Projects Built"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "2rem", fontWeight: 700, color: T.accent }}>{n}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", color: T.muted, textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Strip */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "1.5rem 5vw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: T.muted, textTransform: "uppercase", letterSpacing: "2.5px", whiteSpace: "nowrap" }}>Trusted by</span>
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
            {["TechCorp","DevHub","CloudBase","StartupX","InnoVentures","NexaLabs"].map(p => (
              <span key={p} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.82rem", color: T.muted, opacity: 0.45, fontWeight: 700, letterSpacing: 1 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <FadeIn>
            <SectionLabel>About Apex Circle</SectionLabel>
            <SectionTitle>Where Ideas Become <span style={{ color: T.accent }}>Impact</span></SectionTitle>
            <SectionSub>We're a community-first org fostering innovation, collaboration, and growth among students and young professionals across India.</SectionSub>
            <BtnPrimary onClick={() => setPage("About")}>Our Full Story →</BtnPrimary>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "2.5rem", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top left, rgba(108,99,255,0.1), transparent 70%)", pointerEvents: "none" }} />
              {[["Mission","Democratize access to tech opportunities and create a thriving ecosystem for the next generation of innovators."],["Vision","To be India's most impactful grassroots tech community, bridging education and industry."],["Values","Openness · Collaboration · Excellence · Inclusion"]].map(([t,d]) => (
                <div key={t} style={{ marginBottom: "1.8rem" }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.63rem", color: T.accent2, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 6 }}>{t}</div>
                  <p style={{ fontSize: "0.9rem", color: T.muted }}>{d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* What We Do */}
      <Section>
        <SectionLabel>What We Do</SectionLabel>
        <SectionTitle>Programs & Activities</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.4rem" }}>
          {[
            { tag: "Events", dot: T.accent3, title: "Hackathons", desc: "48-hour intense build sessions with real problem statements, mentors, and significant prizes." },
            { tag: "Learning", dot: T.accent2, title: "Workshops", desc: "Hands-on sessions on AI, Web3, DevOps, DSA, and emerging tech by industry experts." },
            { tag: "Network", dot: T.accent, title: "Meetups", desc: "Regular community meetups, speaker sessions, and networking events across cities." },
            { tag: "Mentorship", dot: "#ffd700", title: "Mentorship", desc: "1:1 mentorship connecting students with industry professionals and startup founders." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.08}>
              <Card>
                <CardTag color={T.accent}><Dot color={c.dot} />{c.tag}</CardTag>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 6 }}>{c.title}</h3>
                <p style={{ fontSize: "0.85rem", color: T.muted }}>{c.desc}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Upcoming Hackathons */}
      <Section>
        <SectionLabel>Coming Up</SectionLabel>
        <SectionTitle>Upcoming Hackathons</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.4rem" }}>
          <FadeIn>
            <Card style={{ border: `1px solid rgba(108,99,255,0.4)` }}>
              <CardTag color={T.accent3}><Dot color={T.accent3} />Registration Open</CardTag>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 6 }}>HackApex 2025</h3>
              <p style={{ fontSize: "0.85rem", color: T.muted, marginBottom: "1rem" }}>AI × Social Impact · Online + Offline · Oct 18–20, 2025</p>
              <BtnPrimary onClick={() => setPage("Hackathons")} style={{ fontSize: "0.73rem", padding: "0.5rem 1.2rem" }}>Register Now →</BtnPrimary>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card>
              <CardTag color={T.muted}><Dot color={T.muted} />Coming Soon</CardTag>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 6 }}>Web3 Build Sprint</h3>
              <p style={{ fontSize: "0.85rem", color: T.muted, marginBottom: "1rem" }}>DeFi & Smart Contracts · Online · Nov 2025</p>
              <BtnOutline style={{ fontSize: "0.73rem", padding: "0.5rem 1.2rem" }}>Notify Me</BtnOutline>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionLabel>Voices</SectionLabel>
        <SectionTitle>From Our Community</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.4rem" }}>
          {[
            { text: "Apex Circle's hackathon landed me my first startup internship. The mentorship was genuinely world-class.", name: "Priya Sharma", role: "SDE Intern @ TechCorp" },
            { text: "I came as a solo participant, left with a co-founder and a product idea we're still building today.", name: "Arjun Mehta", role: "Founder @ BuildLab" },
            { text: "The community energy is unmatched. Every event feels like the whole ecosystem comes together.", name: "Sneha Iyer", role: "ML Engineer @ StartupX" },
          ].map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "2rem" }}>
                <p style={{ fontSize: "0.92rem", color: T.muted, marginBottom: "1.4rem", lineHeight: 1.7, fontStyle: "italic" }}>
                  <span style={{ color: T.accent, fontSize: "1.4rem" }}>"</span>{t.text}
                </p>
                <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", color: T.muted }}>{t.role}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionLabel>Got Questions?</SectionLabel>
        <SectionTitle>Frequently Asked</SectionTitle>
        <div style={{ maxWidth: 720 }}>
          <FAQList items={[
            ["Who can join Apex Circle?", "Anyone passionate about technology — students, early-career professionals, designers, developers, and entrepreneurs are all welcome."],
            ["Is membership free?", "Yes, basic community membership is free. Some events may have a nominal fee for venue & logistics."],
            ["Can I participate in hackathons as a solo?", "Absolutely! We even have team-formation events before each hackathon to help solo participants find teammates."],
            ["How can my company sponsor or partner?", "Reach out via the Contact page or email us at sponsors@apexcircle.in. We have multiple sponsorship tiers."],
          ]} />
        </div>
      </Section>
    </div>
  );
}

// ─── HACKATHONS PAGE ─────────────────────────────────────
function HackathonsPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", padding: "6rem 5vw 4rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(108,99,255,0.3), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }} className="fade-up">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Space Mono',monospace", fontSize: "0.75rem", color: T.accent3, background: "rgba(67,233,123,0.1)", border: "1px solid rgba(67,233,123,0.25)", padding: "0.35rem 1rem", borderRadius: 50, marginBottom: "1.5rem" }}>
            🗓 Oct 18–20, 2025 · Online + Offline
          </div>
          <SectionLabel color={T.accent3}>Flagship Event</SectionLabel>
          <h1 style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", fontWeight: 800, lineHeight: 1, marginBottom: "1rem" }}>
            HackApex <span style={{ color: T.accent }}>2025</span>
          </h1>
          <p style={{ color: T.muted, maxWidth: 540, margin: "0 auto 2rem", fontSize: "1rem" }}>
            Build solutions that matter. 48 hours. ₹5L+ in prizes. Top mentors. Real impact.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <BtnPrimary>Register Now →</BtnPrimary>
            <BtnOutline>View Problem Statements</BtnOutline>
          </div>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
            {["🤖 AI / ML","🌐 Web3","🏥 HealthTech","📚 EdTech","💡 Open Innovation"].map(t => (
              <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", padding: "0.4rem 1rem", borderRadius: 50, border: `1px solid ${T.border}`, color: T.muted, background: "rgba(255,255,255,0.03)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Prizes */}
      <Section>
        <SectionLabel>Rewards</SectionLabel>
        <SectionTitle>Prizes & Rewards</SectionTitle>
        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
          {[["🥇","₹1,50,000","1st Place"],["🥈","₹75,000","2nd Place"],["🥉","₹40,000","3rd Place"],["🎯","Track Prizes","5 × ₹20K"],["💼","Internships","Top 10 Teams"]].map(([icon,amt,label]) => (
            <PrizeCard key={label} icon={icon} amount={amt} label={label} />
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <SectionLabel>Schedule</SectionLabel>
        <SectionTitle>Timeline</SectionTitle>
        <Timeline items={[
          { date: "Sep 15, 2025", title: "Registrations Open", desc: "Team and solo registrations begin. Early bird perks available." },
          { date: "Oct 10, 2025", title: "Problem Statements Released", desc: "All 5 tracks' problem statements published. Pre-event webinar." },
          { date: "Oct 18, 2025 · 9AM", title: "Hackathon Kicks Off", desc: "Opening ceremony, team check-in, hacking begins." },
          { date: "Oct 19, 2025", title: "Mentor Rounds & Mid-Review", desc: "1:1 mentor sessions, progress check-ins, and workshops." },
          { date: "Oct 20, 2025", title: "Final Submissions & Demo Day", desc: "Project demos, judging, and award ceremony." },
        ]} />
      </Section>

      {/* Top Projects */}
      <Section>
        <SectionLabel>Past Winners</SectionLabel>
        <SectionTitle>Top Projects</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.4rem" }}>
          <ProjectCard badge="🏆 Winner" track="AI Track" title="MediScan AI" desc="Real-time medical image analysis for rural diagnostics using edge ML." trackColor={T.accent} />
          <ProjectCard badge="🥈 Runner Up" track="Web3" title="ChainVote" desc="Transparent student governance system on Polygon blockchain." badgeColor={T.accent2} trackColor={T.accent} />
          <ProjectCard badge="🏅 3rd Place" track="EdTech" title="LearnLingo" desc="Adaptive language learning app for Indian regional languages." badgeColor="#ffd700" trackColor={T.accent} />
        </div>
      </Section>
    </div>
  );
}

// ─── EVENTS PAGE ─────────────────────────────────────────
function EventsPage() {
  return (
    <Section>
      <SectionLabel>Events</SectionLabel>
      <SectionTitle>Workshops & Meetups</SectionTitle>
      <SectionSub>Technical workshops, speaker sessions, and community meetups throughout the year.</SectionSub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.4rem" }}>
        {[
          { status: "Upcoming · Free", dot: T.accent3, title: "AI for Beginners Workshop", desc: "Hands-on intro to ML & LLMs · Sep 28, 2025 · Online", cta: "Register" },
          { status: "Upcoming · ₹199", dot: T.accent2, title: "System Design Bootcamp", desc: "Interview-focused deep dive · Oct 5, 2025 · Bangalore", cta: "Register" },
          { status: "Past", dot: T.muted, title: "DevFest Community Meetup", desc: "1000+ attendees · Aug 2025 · Mumbai", cta: "Watch Replay" },
        ].map((e, i) => (
          <FadeIn key={e.title} delay={i * 0.1}>
            <Card>
              <CardTag><Dot color={e.dot} />{e.status}</CardTag>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 6 }}>{e.title}</h3>
              <p style={{ fontSize: "0.84rem", color: T.muted, marginBottom: "1rem" }}>{e.desc}</p>
              <BtnPrimary style={{ fontSize: "0.72rem", padding: "0.45rem 1.1rem" }}>{e.cta}</BtnPrimary>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────
function ProjectsPage() {
  const [active, setActive] = useState("All");
  const filters = ["All","AI / ML","Web","Mobile","Social Impact"];
  return (
    <Section>
      <SectionLabel>Showcase</SectionLabel>
      <SectionTitle>Hackathon Projects</SectionTitle>
      <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", padding: "0.4rem 1rem", borderRadius: 50, border: `1px solid ${active === f ? T.accent : T.border}`, background: active === f ? T.accent : "transparent", color: active === f ? "#fff" : T.muted, cursor: "pointer", transition: "all 0.2s" }}>{f}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.4rem" }}>
        <ProjectCard badge="AI" track="AI" title="FarmSense" desc="IoT + ML crop monitoring for small farmers. HackApex 2024." trackColor={T.accent3} badgeColor={T.accent3} />
        <ProjectCard badge="Web" track="Web" title="CommuneHub" desc="Hyperlocal community bulletin board. HackApex 2024." trackColor={T.accent} badgeColor={T.accent} />
        <ProjectCard badge="Mobile" track="Mobile" title="SafeRoute" desc="Women's safety navigation with SOS alerts. HackApex 2023." trackColor={T.accent2} badgeColor={T.accent2} />
      </div>
    </Section>
  );
}

// ─── TEAM PAGE ────────────────────────────────────────────
function TeamPage({ setPage }) {
  return (
    <Section>
      <SectionLabel>The People</SectionLabel>
      <SectionTitle>Our Team</SectionTitle>

      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: T.muted, textTransform: "uppercase", letterSpacing: "2.5px", margin: "2rem 0 1rem" }}>Leadership</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "1.2rem" }}>
        {[["R","Rahul Verma","Founder & CEO",`${T.accent},${T.accent2}`],["A","Ananya Singh","Co-Founder & CTO",`${T.accent2},#ff9a44`],["K","Kartik Joshi","Head of Events",`${T.accent3},#00c9ff`]].map(([init,name,role,grad]) => (
          <TeamCard key={name} initial={init} name={name} role={role} gradient={grad} />
        ))}
      </div>

      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: T.muted, textTransform: "uppercase", letterSpacing: "2.5px", margin: "3rem 0 1rem" }}>Departments</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.2rem" }}>
        {[
          { tag: "Tech", dot: T.accent, title: "Web Dev & AI Team", desc: "Builds all internal tools, website, and AI-powered products." },
          { tag: "Creative", dot: T.accent2, title: "Design Team", desc: "Brand identity, event creatives, UI/UX for all products." },
          { tag: "Growth", dot: "#ffd700", title: "Marketing & Content", desc: "Social media, outreach, partnerships, and community building." },
          { tag: "Ops", dot: T.accent3, title: "Operations", desc: "Logistics, event management, and community coordination." },
        ].map(d => (
          <FadeIn key={d.title}>
            <Card>
              <CardTag><Dot color={d.dot} />{d.tag}</CardTag>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 5 }}>{d.title}</h3>
              <p style={{ fontSize: "0.83rem", color: T.muted }}>{d.desc}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <BtnPrimary onClick={() => setPage("Community")}>Join Our Team →</BtnPrimary>
      </div>
    </Section>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────
function GalleryPage() {
  const [active, setActive] = useState("All");
  return (
    <Section>
      <SectionLabel>Memories</SectionLabel>
      <SectionTitle>Gallery</SectionTitle>
      <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {["All","Hackathons","Workshops","Meetups","Awards"].map(f => (
          <button key={f} onClick={() => setActive(f)} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", padding: "0.4rem 1rem", borderRadius: 50, border: `1px solid ${active === f ? T.accent : T.border}`, background: active === f ? T.accent : "transparent", color: active === f ? "#fff" : T.muted, cursor: "pointer", transition: "all 0.2s" }}>{f}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
        {["🖥️","🎤","🏆","👥","💡","🚀","🎯","🌟"].map((e, i) => (
          <GalleryItem key={i} emoji={e} />
        ))}
      </div>
      <p style={{ color: T.muted, fontSize: "0.75rem", marginTop: "1.5rem", fontFamily: "'Space Mono',monospace" }}>// Replace placeholders with real &lt;img&gt; elements</p>
    </Section>
  );
}

// ─── COMMUNITY PAGE ───────────────────────────────────────
function CommunityPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "Member", why: "" });
  return (
    <Section>
      <SectionLabel>Get Involved</SectionLabel>
      <SectionTitle>Join Apex Circle</SectionTitle>
      <SectionSub>Choose your path and become part of India's most active tech community.</SectionSub>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "1.2rem", marginBottom: "4rem" }}>
        {[
          ["👨‍💻","Member","Access events, workshops, and our community network. Free forever."],
          ["🙌","Volunteer","Help organize events and build something bigger than yourself."],
          ["🧑‍🏫","Mentor","Guide the next generation of innovators. 2 hrs/month commitment."],
          ["💼","Sponsor","Partner with us to reach thousands of top tech students."],
          ["🤝","Partner","Collaborate on events, content, or community initiatives."],
          ["🏫","Campus Ambassador","Represent Apex Circle at your college and grow the local community."],
        ].map(([icon, title, desc], i) => (
          <FadeIn key={title} delay={i * 0.07}>
            <JoinCard icon={icon} title={title} desc={desc} />
          </FadeIn>
        ))}
      </div>

      <div style={{ maxWidth: 560 }}>
        <SectionLabel>Application Form</SectionLabel>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem" }}>Tell us about yourself</h3>
        {[["Full Name","text","name","Your full name"],["Email","email","email","you@example.com"]].map(([label,type,key,ph]) => (
          <FormGroup key={key} label={label}>
            <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} style={inputStyle} />
          </FormGroup>
        ))}
        <FormGroup label="Role Interested In">
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} style={inputStyle}>
            {["Member","Volunteer","Mentor","Sponsor","Campus Ambassador"].map(r => <option key={r}>{r}</option>)}
          </select>
        </FormGroup>
        <FormGroup label="Why Apex Circle?">
          <textarea rows={4} placeholder="Tell us what drives you..." value={form.why} onChange={e => setForm({...form, why: e.target.value})} style={{ ...inputStyle, resize: "vertical" }} />
        </FormGroup>
        <BtnPrimary style={{ width: "100%", padding: "0.9rem" }}>Submit Application →</BtnPrimary>
      </div>
    </Section>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────
function AboutPage() {
  return (
    <Section>
      <SectionLabel>Our Story</SectionLabel>
      <SectionTitle>About Apex Circle</SectionTitle>
      <div style={{ maxWidth: 720 }}>
        <p style={{ color: T.muted, fontSize: "1rem", marginBottom: "1.5rem", lineHeight: 1.8 }}>
          Apex Circle was founded in 2022 by a group of students who believed that talent shouldn't be limited by access. Starting as a 30-person WhatsApp group, we've grown into a 2,400+ member community spanning 40+ colleges.
        </p>
        <p style={{ color: T.muted, fontSize: "1rem", marginBottom: "3rem", lineHeight: 1.8 }}>
          We organize hackathons, workshops, speaker sessions, and mentorship programs — all with the goal of making the tech ecosystem more inclusive and collaborative.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.2rem" }}>
        {[
          { tag: "Mission", dot: T.accent, title: "Democratize Access", desc: "Make world-class tech education accessible to every student, regardless of college or city." },
          { tag: "Vision", dot: T.accent2, title: "India's #1 Community", desc: "Be the most impactful student tech community, recognized by industry and academia alike." },
          { tag: "Values", dot: T.accent3, title: "Open & Collaborative", desc: "Openness, meritocracy, radical inclusion, and a bias toward action — always." },
          { tag: "Impact", dot: "#ffd700", title: "340+ Projects Built", desc: "Millions in prizes distributed. Dozens of startups born. Hundreds hired." },
        ].map((c, i) => (
          <FadeIn key={c.title} delay={i * 0.08}>
            <Card>
              <CardTag><Dot color={c.dot} />{c.tag}</CardTag>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 5 }}>{c.title}</h3>
              <p style={{ fontSize: "0.84rem", color: T.muted }}>{c.desc}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────
function ContactPage() {
  return (
    <Section>
      <SectionLabel>Let's Talk</SectionLabel>
      <SectionTitle>Get in Touch</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>
        <div>
          {[["✉️","Email","hello@apexcircle.in"],["📍","Location","Bangalore, India (+ remote chapters)"],["💼","Partnerships","sponsors@apexcircle.in"]].map(([icon,label,val]) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ width: 42, height: 42, background: "rgba(108,99,255,0.1)", border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: T.accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: "0.88rem", color: T.muted }}>{val}</div>
              </div>
            </div>
          ))}
          <SectionLabel style={{ marginTop: "2rem", marginBottom: "1rem" }}>Social</SectionLabel>
          <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
            {["Twitter/X","LinkedIn","Instagram","Discord"].map(s => (
              <BtnOutline key={s} style={{ fontSize: "0.72rem", padding: "0.4rem 1rem" }}>{s}</BtnOutline>
            ))}
          </div>
        </div>
        <div>
          {[["Name","text","Your name"],["Email","email","you@example.com"]].map(([label,type,ph]) => (
            <FormGroup key={label} label={label}>
              <input type={type} placeholder={ph} style={inputStyle} />
            </FormGroup>
          ))}
          <FormGroup label="Subject">
            <select style={inputStyle}>
              {["General Inquiry","Sponsorship / Partnership","Speaker / Mentor","Media / Press","Other"].map(o => <option key={o}>{o}</option>)}
            </select>
          </FormGroup>
          <FormGroup label="Message">
            <textarea rows={5} placeholder="Tell us how we can help..." style={{ ...inputStyle, resize: "vertical" }} />
          </FormGroup>
          <BtnPrimary style={{ width: "100%", padding: "0.9rem" }}>Send Message →</BtnPrimary>
        </div>
      </div>
    </Section>
  );
}

// ─── SHARED HELPERS ───────────────────────────────────────
function Section({ children }) {
  return <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 2.5rem" }}>{children}</div>;
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `opacity 0.6s ${delay}s, transform 0.6s ${delay}s` }}>
      {children}
    </div>
  );
}

function FAQList({ items }) {
  const [open, setOpen] = useState(null);
  return items.map(([q, a], i) => (
    <div key={q} style={{ borderBottom: `1px solid ${T.border}`, padding: "1.4rem 0" }}>
      <div onClick={() => setOpen(open === i ? null : i)} style={{ fontWeight: 600, fontSize: "0.97rem", display: "flex", justifyContent: "space-between", cursor: "pointer", color: open === i ? T.accent : T.text, transition: "color 0.2s" }}>
        {q} <span style={{ color: T.accent, fontSize: "1.1rem", fontWeight: 700 }}>{open === i ? "−" : "+"}</span>
      </div>
      {open === i && <p style={{ fontSize: "0.88rem", color: T.muted, marginTop: "0.8rem", lineHeight: 1.7 }}>{a}</p>}
    </div>
  ));
}

function Timeline({ items }) {
  return (
    <div style={{ position: "relative", paddingLeft: "2rem" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: T.border }} />
      {items.map((item, i) => (
        <FadeIn key={item.title} delay={i * 0.1}>
          <div style={{ position: "relative", marginBottom: "2.4rem" }}>
            <div style={{ position: "absolute", left: "-2.3rem", top: 4, width: 10, height: 10, borderRadius: "50%", background: T.accent, border: `2px solid ${T.bg}`, boxShadow: `0 0 0 3px rgba(108,99,255,0.3)` }} />
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", color: T.accent, textTransform: "uppercase", letterSpacing: "2px", marginBottom: 4 }}>{item.date}</div>
            <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: "0.84rem", color: T.muted }}>{item.desc}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

function PrizeCard({ icon, amount, label }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ flex: 1, minWidth: 160, border: `1px solid ${hov ? T.accent2 : T.border}`, borderRadius: 14, padding: "2rem 1.5rem", background: T.card, textAlign: "center", transform: hov ? "translateY(-4px)" : "none", transition: "all 0.25s" }}>
      <div style={{ fontSize: "1.8rem", marginBottom: "0.7rem" }}>{icon}</div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "1.5rem", fontWeight: 700, color: T.accent2, marginBottom: 4 }}>{amount}</div>
      <div style={{ fontSize: "0.78rem", color: T.muted }}>{label}</div>
    </div>
  );
}

function ProjectCard({ badge, track, title, desc, badgeColor = T.accent3, trackColor = T.accent }) {
  return (
    <FadeIn>
      <Card accentColor={T.accent3}>
        <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", padding: "0.2rem 0.6rem", borderRadius: 50, background: `${badgeColor}1a`, color: badgeColor, border: `1px solid ${badgeColor}40` }}>{badge}</span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", padding: "0.2rem 0.6rem", borderRadius: 50, background: `${trackColor}1a`, color: trackColor, border: `1px solid ${trackColor}40` }}>{track}</span>
        </div>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: "0.83rem", color: T.muted, marginBottom: "1.2rem" }}>{desc}</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          {["⚡ Demo","⌥ GitHub"].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.7rem", color: T.accent, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </Card>
    </FadeIn>
  );
}

function TeamCard({ initial, name, role, gradient }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ textAlign: "center", background: T.card, border: `1px solid ${hov ? T.accent : T.border}`, borderRadius: 14, padding: "1.8rem 1rem", transform: hov ? "translateY(-4px)" : "none", transition: "all 0.25s" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${gradient})`, margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>{initial}</div>
      <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: 4 }}>{name}</div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", color: T.muted }}>{role}</div>
    </div>
  );
}

function GalleryItem({ emoji }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ aspectRatio: "4/3", borderRadius: 10, background: T.card, border: `1px solid ${hov ? T.accent : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: T.muted, transform: hov ? "scale(1.03)" : "none", transition: "all 0.2s", cursor: "pointer" }}>
      {emoji}
    </div>
  );
}

function JoinCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: hov ? "rgba(108,99,255,0.06)" : T.card, border: `1px solid ${hov ? T.accent : T.border}`, borderRadius: 14, padding: "1.8rem", transform: hov ? "translateY(-4px)" : "none", transition: "all 0.25s", cursor: "pointer" }}>
      <div style={{ fontSize: "1.7rem", marginBottom: "0.9rem" }}>{icon}</div>
      <h3 style={{ fontSize: "0.97rem", fontWeight: 700, marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: "0.82rem", color: T.muted }}>{desc}</p>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: T.muted, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", background: T.card, border: `1px solid ${T.border}`, borderRadius: 10,
  padding: "0.75rem 1rem", color: T.text, fontFamily: "'Space Mono',monospace",
  fontSize: "0.82rem", outline: "none", display: "block",
};

// ─── NEWSLETTER ───────────────────────────────────────────
function Newsletter() {
  return (
    <div style={{ background: T.surface, borderRadius: 20, margin: "0 1rem 4rem", padding: "4rem 3rem", textAlign: "center", border: `1px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(108,99,255,0.1), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <SectionLabel>Stay Updated</SectionLabel>
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "0.8rem" }}>Never Miss an Event</h2>
        <p style={{ color: T.muted, marginBottom: "2rem" }}>Get hackathon announcements, workshop invites, and community news.</p>
        <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="email" placeholder="your@email.com" style={{ ...inputStyle, width: 300, maxWidth: "100%", borderRadius: 50 }} />
          <BtnPrimary>Subscribe →</BtnPrimary>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: "4rem 2.5rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "1.2rem", fontWeight: 700, color: T.accent, marginBottom: "0.8rem" }}>
              APEX<span style={{ color: T.accent2 }}>◉</span>CIRCLE
            </div>
            <p style={{ fontSize: "0.83rem", color: T.muted, maxWidth: 240, marginBottom: "1.5rem", lineHeight: 1.7 }}>India's premier tech community for students & young professionals.</p>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {["𝕏","in","ig","dc"].map(s => (
                <a key={s} href="#" style={{ width: 34, height: 34, border: `1px solid ${T.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, textDecoration: "none", fontSize: "0.82rem" }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { head: "Explore", links: [["Hackathons","Hackathons"],["Events","Events"],["Projects","Projects"],["Gallery","Gallery"]] },
            { head: "Community", links: [["Join Us","Community"],["Team","Team"],["About","About"],["Contact","Contact"]] },
            { head: "Legal", links: [["Privacy Policy",null],["Terms & Conditions",null],["Code of Conduct",null],["Sponsorship Deck",null]] },
          ].map(col => (
            <div key={col.head}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "2.5px", color: T.muted, marginBottom: "1.2rem" }}>{col.head}</div>
              <ul style={{ listStyle: "none" }}>
                {col.links.map(([label, page]) => (
                  <li key={label} style={{ marginBottom: "0.55rem" }}>
                    <button onClick={() => page && setPage(page)} style={{ fontSize: "0.83rem", color: T.muted, background: "none", border: "none", cursor: page ? "pointer" : "default", padding: 0, transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = T.text}
                      onMouseLeave={e => e.target.style.color = T.muted}>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: "2rem", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", color: T.muted }}>© 2025 Apex Circle. All rights reserved.</span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", color: T.muted }}>Made with ♥ by the Apex Circle Web Team</span>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────
const PAGE_MAP = {
  Home: HomePage,
  Hackathons: HackathonsPage,
  Events: EventsPage,
  Projects: ProjectsPage,
  Team: TeamPage,
  Gallery: GalleryPage,
  Community: CommunityPage,
  About: AboutPage,
  Contact: ContactPage,
};

export default function App() {
  const [page, setPage] = useState("Home");
  const PageComponent = PAGE_MAP[page] || HomePage;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <>
      <style>{globalCSS}</style>
      <Navbar page={page} setPage={setPage} />
      <main style={{ paddingTop: 60 }}>
        <PageComponent setPage={setPage} />
      </main>
      <Newsletter />
      <Footer setPage={setPage} />
    </>
  );
}
