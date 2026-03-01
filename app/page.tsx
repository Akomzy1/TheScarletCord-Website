"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─── Data Layer ───
const SERVICES = [
  { id: "arch", title: "Architectural Design", desc: "Full architectural design services with photorealistic 3D visualization, bringing your vision to life before construction begins.", icon: "◇" },
  { id: "landscape", title: "Landscape Design", desc: "Thoughtful outdoor spaces that complement your architecture — gardens, hardscapes, and environmental planning.", icon: "◈" },
  { id: "construction", title: "Construction", desc: "End-to-end building construction for residential and commercial projects, delivered with precision and integrity.", icon: "▣" },
  { id: "renovation", title: "Renovation & Refurbishment", desc: "Breathe new life into existing structures with expert renovation, restoring beauty and function.", icon: "◐" },
  { id: "mep", title: "MEP Works", desc: "Mechanical, Electrical and Plumbing systems engineered for efficiency, safety, and modern living.", icon: "⬡" },
  { id: "interior", title: "Interior Design", desc: "Curated interior spaces that balance aesthetics with livability — from concept to final styling.", icon: "◎" },
];

const PROJECTS = [
  { id: 1, title: "Millennium Estate Project, Lekki", client: "Dillion Consultant Ltd", location: "Millennium Estate, Oniru, Lagos", year: 2022, category: "Residential", desc: "Large-scale residential development at Millennium Estate, Lekki.", image: "/mili.jpg" },
  { id: 3, title: "5-Units of 2-Bedroom Flat", client: "Dillion Consultant Ltd", location: "Bariga, Lagos", year: 2026, category: "Residential", desc: "Construction of 5 units of 2-bedroom flats in Bariga, Lagos.", image: "/ongoing.jpg" },
  { id: 4, title: "Interior Design", client: "Space Finish Africa / GTCO", location: "Toyin Street, Ikeja, Lagos", year: 2025, category: "Interiors", desc: "Full interior design for a modern space on Toyin Street, Ikeja.", image: "/inte.jpg" },
  { id: 5, title: "RBT Project — Ikotun", client: "Dr. Lekan Abioye", location: "Ikotun, Lagos State", year: 2026, category: "Residential", desc: "Bespoke architectural design of a 4-bedroom duplex with 3D visualization.", image: "/ikotun.jpg" },
  { id: 6, title: "Interior Design — Horizon Estate", client: "Mr. Blossom", location: "Horizon Estate, Lekki, Lagos", year: 2022, category: "Interiors", desc: "Full interior design and decoration for a modern residential unit in Lekki." },
  { id: 7, title: "Interior Design — VGC Residence", client: "Mr. Aduro Matthew", location: "Victoria Garden City, Lagos", year: 2022, category: "Interiors", desc: "Luxury interior design for a private residence in Victoria Garden City." },
  { id: 8, title: "16-Unit 3-Bedroom Duplex Design", client: "Mr. Amos Gagar", location: "Sangotedo, Lekki, Lagos", year: 2022, category: "Residential", desc: "Architectural design of 16 units of 3-bedroom duplexes in the fast-growing Lekki corridor." },
  { id: 9, title: "4-Bedroom Duplex Design — Epe", client: "Mrs Emife Akomolede", location: "Epe, Lagos", year: 2022, category: "Residential", desc: "Custom 4-bedroom duplex design tailored for a serene Epe location." },
];

const TEAM = [
  { name: "Arc. Sina Akomolede", role: "Executive Director", quals: undefined as string | undefined, bio: "Visionary leader driving the firm's strategic growth and commitment to architectural excellence across Nigeria." },
  { name: "Arc. Seun Adeyanju", role: "Head of Operations", quals: "B.Sc., M.Sc., Arch. (OAU Ife)", bio: "Experienced architect overseeing project delivery, quality assurance, and operational efficiency." },
  { name: "Emife Stella Akinbulejo", role: "Admin Manager", quals: undefined as string | undefined, bio: "Ensures seamless administrative operations, client communications, and organizational coordination." },
];

const CATEGORIES = ["All", "Residential", "Commercial", "Interiors", "Renovation"];

// ─── Scroll-triggered FadeIn hook (for non-hero sections) ───
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeIn({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: string;
}) {
  const [ref, visible] = useInView(0.1);
  const transforms: Record<string, string> = {
    up: "translateY(40px)", down: "translateY(-40px)",
    left: "translateX(40px)", right: "translateX(-40px)", none: "none",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : (transforms[direction] ?? "translateY(40px)"),
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── Styles ───
const CSS = `
:root {
  --scarlet: #B22234;
  --scarlet-dark: #8B1A29;
  --scarlet-light: #D4394B;
  --charcoal: #1A1A1A;
  --graphite: #2D2D2D;
  --warm-grey: #8A8680;
  --light-grey: #F5F3F0;
  --cream: #FAF9F7;
  --white: #FFFFFF;
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Outfit', system-ui, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); color: var(--charcoal); background: var(--cream); -webkit-font-smoothing: antialiased; }
::selection { background: var(--scarlet); color: white; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--cream); }
::-webkit-scrollbar-thumb { background: var(--scarlet); border-radius: 3px; }

/* ─── Nav ─── */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.4s ease; }
.nav-scrolled { background: rgba(26,26,26,0.95); backdrop-filter: blur(20px); box-shadow: 0 1px 0 rgba(255,255,255,0.05); }
.nav-inner { max-width: 1320px; margin: 0 auto; padding: 0 32px; display: flex; align-items: center; justify-content: space-between; height: 90px; }
.nav-logo { display: flex; align-items: center; text-decoration: none; cursor: pointer; }
.nav-logo img { height: 48px; width: auto; object-fit: contain; filter: brightness(1); transition: opacity 0.3s; }
.nav-logo img:hover { opacity: 0.85; }
.nav-links { display: flex; gap: 36px; align-items: center; }
.nav-links a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 0.03em; text-transform: uppercase; transition: color 0.3s; cursor: pointer; }
.nav-links a:hover, .nav-links a.active { color: white; }
.nav-cta { background: var(--scarlet); color: white !important; padding: 10px 24px; border-radius: 2px; font-size: 13px !important; font-weight: 600 !important; letter-spacing: 0.06em !important; transition: background 0.3s !important; }
.nav-cta:hover { background: var(--scarlet-dark) !important; }
.mobile-toggle { display: none; background: none; border: none; color: white; font-size: 24px; cursor: pointer; }
.mobile-menu { position: fixed; inset: 0; background: var(--charcoal); z-index: 99; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 32px; }
.mobile-menu a { color: white; text-decoration: none; font-family: var(--font-display); font-size: 32px; opacity: 0.8; cursor: pointer; }
.mobile-menu a:hover { opacity: 1; }
.mobile-close { position: absolute; top: 24px; right: 32px; background: none; border: none; color: white; font-size: 32px; cursor: pointer; }

/* ─── Hero ─── */
.hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; background: #111; }

/* Video background */
.hero-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

/* Dark gradient overlay — keeps text readable over the video */
.hero-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(to right,  rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.35) 100%),
    linear-gradient(to bottom, rgba(10,10,10,0.4)  0%, transparent 40%, rgba(10,10,10,0.6) 100%);
  z-index: 1;
}

/* Subtle animated grid on top of the overlay */
.hero-overlay::after {
  content: '';
  position: absolute; inset: 0;
  background:
    repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.015) 80px, rgba(255,255,255,0.015) 81px),
    repeating-linear-gradient(0deg,  transparent, transparent 80px, rgba(255,255,255,0.015) 80px, rgba(255,255,255,0.015) 81px);
  animation: hgrid 30s linear infinite;
}

/* Large glowing orbs */
.hero-accent {
  position: absolute; right: -200px; top: -200px; z-index: 2;
  width: 900px; height: 900px; border-radius: 50%;
  background: radial-gradient(circle, rgba(178,34,52,0.18) 0%, rgba(178,34,52,0.06) 40%, transparent 70%);
  animation: hfloatA 16s ease-in-out infinite, hpulse 8s ease-in-out infinite;
}
.hero-accent-2 {
  position: absolute; left: -100px; bottom: -200px; z-index: 2;
  width: 700px; height: 700px; border-radius: 50%;
  background: radial-gradient(circle, rgba(178,34,52,0.12) 0%, rgba(178,34,52,0.04) 40%, transparent 70%);
  animation: hfloatB 20s ease-in-out infinite, hpulse 10s ease-in-out 3s infinite;
}

/* Diagonal architectural line */
.hero-line-decor {
  position: absolute; z-index: 2;
  top: 0; right: 200px;
  width: 1px; height: 110vh;
  background: linear-gradient(to bottom, transparent 0%, rgba(178,34,52,0.2) 25%, rgba(178,34,52,0.2) 75%, transparent 100%);
  transform-origin: top center;
  animation: hlinedecor 1.8s 0.3s cubic-bezier(.22,1,.36,1) both;
}
.hero-line-decor-2 {
  position: absolute; z-index: 2;
  top: 0; right: 340px;
  width: 1px; height: 110vh;
  background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%);
  transform-origin: top center;
  animation: hlinedecor 2s 0.5s cubic-bezier(.22,1,.36,1) both;
}

.hero-content { position: relative; z-index: 3; max-width: 1320px; margin: 0 auto; padding: 120px 32px 80px; width: 100%; }

.hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--scarlet-light); font-size: 13px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 24px;
}
.hero-tag::before {
  content: ''; width: 32px; height: 1px; background: var(--scarlet-light);
  transform-origin: left center;
  animation: htagline 0.8s 0.2s cubic-bezier(.22,1,.36,1) both;
}

.hero-h1 {
  font-family: var(--font-display);
  font-size: clamp(42px, 6vw, 82px);
  color: white; line-height: 1.05;
  max-width: 800px; margin-bottom: 24px;
}
.hero-h1 em {
  font-style: italic;
  background: linear-gradient(90deg, var(--scarlet-light) 30%, #f0707e 50%, var(--scarlet-light) 70%);
  background-size: 250% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: hshimmer 4s 2s ease-in-out infinite;
}

.hero-sub { font-size: 18px; color: rgba(255,255,255,0.55); max-width: 520px; line-height: 1.7; font-weight: 300; margin-bottom: 40px; }
.hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }

.btn-primary { background: var(--scarlet); color: white; padding: 16px 36px; border: none; font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; border-radius: 2px; text-decoration: none; }
.btn-primary:hover { background: var(--scarlet-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(178,34,52,0.3); }
.btn-outline { background: transparent; color: white; padding: 16px 36px; border: 1px solid rgba(255,255,255,0.25); font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; border-radius: 2px; text-decoration: none; }
.btn-outline:hover { border-color: white; background: rgba(255,255,255,0.05); }

.hero-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); }
.hero-stat h3 { font-family: var(--font-display); font-size: 36px; color: var(--scarlet-light); }
.hero-stat p { font-size: 13px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }

/* Hero entrance: items start invisible, animate in on mount */
.h-item { opacity: 0; }
.h-item.vis { animation: hreveal 0.9s cubic-bezier(.22,1,.36,1) both; }
.h-item.vis.d1 { animation-delay: 0.05s; }
.h-item.vis.d2 { animation-delay: 0.22s; }
.h-item.vis.d3 { animation-delay: 0.38s; }
.h-item.vis.d4 { animation-delay: 0.54s; }
.h-item.vis.d5 { animation-delay: 0.72s; }

/* ─── Hero Keyframes ─── */
@keyframes hfloatA {
  0%,100% { transform: translate(0px,   0px)   scale(1);    }
  20%     { transform: translate(-30px,-40px)   scale(1.07); }
  50%     { transform: translate(20px, -60px)   scale(1.12); }
  75%     { transform: translate(-10px,-25px)   scale(1.04); }
}
@keyframes hfloatB {
  0%,100% { transform: translate(0px,  0px)  scale(1);    }
  30%     { transform: translate(25px, 35px) scale(1.05); }
  65%     { transform: translate(-18px,48px) scale(0.95); }
}
@keyframes hpulse {
  0%,100% { opacity: 1;    }
  50%     { opacity: 0.45; }
}
@keyframes hgrid {
  from { background-position: 0px 0px,   0px 0px;   }
  to   { background-position: 80px 80px, 80px 80px; }
}
@keyframes hreveal {
  from { opacity: 0; transform: translateY(38px); }
  to   { opacity: 1; transform: none; }
}
@keyframes htagline {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes hlinedecor {
  from { opacity: 0; clip-path: inset(0 0 100% 0); }
  to   { opacity: 1; clip-path: inset(0 0 0% 0); }
}
@keyframes hshimmer {
  0%,100% { background-position: 0%   center; }
  50%     { background-position: 100% center; }
}

/* ─── Trust Strip ─── */
.trust { background: var(--charcoal); border-top: 1px solid rgba(255,255,255,0.06); }
.trust-inner { max-width: 1320px; margin: 0 auto; padding: 28px 32px; display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
.trust-item { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.4); font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 500; }
.trust-dot { width: 6px; height: 6px; background: var(--scarlet); border-radius: 50%; }

/* ─── Sections ─── */
.section { padding: 100px 32px; }
.section-dark { background: var(--charcoal); color: white; }
.section-alt { background: var(--light-grey); }
.container { max-width: 1320px; margin: 0 auto; }
.section-tag { display: inline-flex; align-items: center; gap: 8px; color: var(--scarlet); font-size: 12px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px; }
.section-tag::before { content: ''; width: 24px; height: 1px; background: var(--scarlet); }
.section-dark .section-tag { color: var(--scarlet-light); }
.section-dark .section-tag::before { background: var(--scarlet-light); }
.section-title { font-family: var(--font-display); font-size: clamp(32px, 4vw, 48px); line-height: 1.15; margin-bottom: 20px; }
.section-subtitle { font-size: 17px; color: var(--warm-grey); line-height: 1.7; max-width: 560px; font-weight: 300; }
.section-dark .section-subtitle { color: rgba(255,255,255,0.5); }
.section-header { margin-bottom: 56px; }

/* ─── Services Grid ─── */
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.service-card { background: white; padding: 40px 32px; border-radius: 4px; transition: all 0.4s ease; border: 1px solid rgba(0,0,0,0.04); position: relative; overflow: hidden; }
.service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--scarlet); transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }
.service-card:hover::before { transform: scaleX(1); }
.service-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.06); }
.service-icon { font-size: 28px; color: var(--scarlet); margin-bottom: 20px; display: block; }
.service-card h3 { font-family: var(--font-display); font-size: 22px; margin-bottom: 12px; }
.service-card p { font-size: 15px; color: var(--warm-grey); line-height: 1.7; font-weight: 300; }

/* ─── Projects Grid ─── */
.filter-bar { display: flex; gap: 12px; margin-bottom: 40px; flex-wrap: wrap; }
.filter-btn { padding: 10px 24px; border: 1px solid rgba(0,0,0,0.1); background: transparent; font-family: var(--font-body); font-size: 13px; font-weight: 500; letter-spacing: 0.04em; cursor: pointer; transition: all 0.3s; border-radius: 2px; text-transform: uppercase; color: var(--warm-grey); }
.filter-btn.active, .filter-btn:hover { background: var(--charcoal); color: white; border-color: var(--charcoal); }
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.project-card { position: relative; overflow: hidden; border-radius: 4px; cursor: pointer; aspect-ratio: 4/3; background: var(--graphite); }
.project-img { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #2D2D2D, #3D3D3D); font-family: var(--font-display); color: rgba(255,255,255,0.12); font-size: 48px; overflow: hidden; }
.project-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.4) 50%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 28px; opacity: 0; transition: opacity 0.4s ease; }
.project-card:hover .project-overlay { opacity: 1; }
.project-cat { font-size: 11px; color: var(--scarlet-light); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 8px; }
.project-overlay h3 { font-family: var(--font-display); color: white; font-size: 20px; margin-bottom: 8px; line-height: 1.3; }
.project-overlay p { font-size: 13px; color: rgba(255,255,255,0.5); }

/* ─── Project Modal ─── */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 32px; backdrop-filter: blur(8px); }
.modal-card { background: white; border-radius: 6px; max-width: 680px; width: 100%; max-height: 85vh; overflow-y: auto; }
.modal-header { background: linear-gradient(135deg, #2D2D2D, #3D3D3D); height: 240px; display: flex; align-items: center; justify-content: center; position: relative; }
.modal-header span { font-family: var(--font-display); color: rgba(255,255,255,0.12); font-size: 72px; }
.modal-close { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.5); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; }
.modal-body { padding: 36px; }
.modal-body .project-cat { margin-bottom: 12px; }
.modal-body h2 { font-family: var(--font-display); font-size: 28px; margin-bottom: 16px; line-height: 1.3; }
.modal-body p { font-size: 15px; color: var(--warm-grey); line-height: 1.7; margin-bottom: 24px; }
.modal-details { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.modal-detail { padding: 16px; background: var(--light-grey); border-radius: 4px; }
.modal-detail label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--warm-grey); font-weight: 600; }
.modal-detail span { display: block; font-size: 15px; margin-top: 4px; font-weight: 500; }

/* ─── Why Us ─── */
.why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.why-list { display: flex; flex-direction: column; gap: 28px; }
.why-item { display: flex; gap: 20px; }
.why-num { font-family: var(--font-display); font-size: 32px; color: var(--scarlet-light); min-width: 48px; line-height: 1; }
.why-item h4 { font-size: 18px; margin-bottom: 6px; color: white; }
.why-item p { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.6; font-weight: 300; }
.why-visual { aspect-ratio: 3/4; background: linear-gradient(135deg, var(--scarlet-dark), var(--graphite)); border-radius: 4px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.why-visual::before { content: 'TSC'; font-family: var(--font-display); font-size: 120px; color: rgba(255,255,255,0.04); }

/* ─── About ─── */
.about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.about-text p { font-size: 16px; line-height: 1.8; color: var(--warm-grey); margin-bottom: 16px; font-weight: 300; }
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.team-card { text-align: center; padding: 40px 24px; background: white; border-radius: 4px; border: 1px solid rgba(0,0,0,0.04); }
.team-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--scarlet), var(--scarlet-dark)); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); color: white; font-size: 24px; }
.team-card h3 { font-family: var(--font-display); font-size: 20px; margin-bottom: 4px; }
.team-card .role { font-size: 13px; color: var(--scarlet); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; margin-bottom: 4px; }
.team-card .quals { font-size: 12px; color: var(--warm-grey); margin-bottom: 12px; font-style: italic; }
.team-card p { font-size: 14px; color: var(--warm-grey); line-height: 1.6; font-weight: 300; }

/* ─── Contact ─── */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
.contact-info h3 { font-family: var(--font-display); font-size: 24px; margin-bottom: 24px; }
.contact-row { display: flex; gap: 12px; margin-bottom: 20px; font-size: 15px; color: var(--warm-grey); }
.contact-row strong { color: var(--charcoal); min-width: 80px; }
.contact-form { display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; color: var(--warm-grey); }
.form-group input, .form-group select, .form-group textarea { padding: 14px 16px; border: 1px solid rgba(0,0,0,0.1); border-radius: 2px; font-family: var(--font-body); font-size: 15px; transition: border-color 0.3s; background: white; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--scarlet); }
.form-group textarea { resize: vertical; min-height: 120px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-success { background: #E8F5E9; color: #2E7D32; padding: 16px; border-radius: 4px; font-size: 15px; text-align: center; }

/* ─── CTA Band ─── */
.cta-band { background: var(--scarlet); padding: 80px 32px; text-align: center; }
.cta-band h2 { font-family: var(--font-display); color: white; font-size: clamp(28px, 4vw, 44px); margin-bottom: 16px; }
.cta-band p { color: rgba(255,255,255,0.7); font-size: 17px; margin-bottom: 32px; font-weight: 300; }
.cta-band .btn-white { background: white; color: var(--scarlet); padding: 16px 40px; border: none; font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: all 0.3s; }
.cta-band .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

/* ─── Footer ─── */
.footer { background: #111; padding: 64px 32px 32px; color: rgba(255,255,255,0.5); }
.footer-grid { max-width: 1320px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
.footer h4 { font-family: var(--font-display); color: white; font-size: 16px; margin-bottom: 20px; }
.footer-brand p { font-size: 14px; line-height: 1.7; margin-top: 12px; }
.footer a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; display: block; margin-bottom: 10px; cursor: pointer; transition: color 0.3s; }
.footer a:hover { color: white; }
.footer-bar { max-width: 1320px; margin: 0 auto; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; font-size: 13px; flex-wrap: wrap; gap: 12px; }
.footer-socials { display: flex; gap: 16px; }

/* ─── Page Header ─── */
.page-header { background: var(--charcoal); padding: 140px 32px 60px; }
.page-header h1 { font-family: var(--font-display); color: white; font-size: clamp(36px, 5vw, 56px); }
.page-header p { color: rgba(255,255,255,0.5); font-size: 17px; margin-top: 12px; font-weight: 300; max-width: 560px; }

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .services-grid, .projects-grid { grid-template-columns: repeat(2, 1fr); }
  .why-grid { grid-template-columns: 1fr; }
  .why-visual { display: none; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-toggle { display: block; }
  .hero-content { padding: 120px 24px 60px; }
  .hero-stats { flex-direction: column; gap: 24px; }
  .hero-line-decor, .hero-line-decor-2 { display: none; }
  .section { padding: 64px 20px; }
  .services-grid { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: 1fr 1fr; }
  .about-content, .contact-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .modal-details { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .filter-bar { gap: 8px; }
  .filter-btn { padding: 8px 16px; font-size: 12px; }
}
@media (max-width: 480px) {
  .projects-grid { grid-template-columns: 1fr; }
}
`;

// ─── Hero: animated stat counter ───
function CounterStat({ raw, label }: { raw: string; label: string }) {
  const [val, setVal] = useState("0");

  useEffect(() => {
    const match = raw.match(/^(\d+)([+%]*)$/);
    if (!match) { setVal(raw); return; }
    const target = parseInt(match[1]);
    const suffix = match[2];
    const duration = 1400;

    // Delay start until the hero has animated in
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setVal(`${Math.round(eased * target)}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 800);

    return () => clearTimeout(timer);
  }, [raw]);

  return (
    <div className="hero-stat">
      <h3>{val}</h3>
      <p>{label}</p>
    </div>
  );
}

// ─── Components ───
function Nav({ page, setPage, scrolled }: { page: string; setPage: (p: string) => void; scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = useCallback((p: string) => { setPage(p); setMobileOpen(false); window.scrollTo(0, 0); }, [setPage]);

  return (
    <>
      <style>{CSS}</style>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a className="nav-logo" onClick={() => go("home")}>
            <Image src="/logo.png" alt="The Scarlet Cord Architects & Builders Ltd" width={220} height={72} style={{ height: "72px", width: "auto" }} priority />
          </a>
          <div className="nav-links">
            {(["home","about","services","projects","contact"] as const).map((k) => {
              const labels: Record<string, string> = { home: "Home", about: "About", services: "Services", projects: "Projects", contact: "Contact" };
              return (
                <a key={k} className={page === k ? "active" : ""} onClick={() => go(k)}>{labels[k]}</a>
              );
            })}
            <a className="nav-cta" onClick={() => go("contact")}>Get a Quote</a>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>☰</button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu">
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
          {[["home","Home"],["about","About"],["services","Services"],["projects","Projects"],["contact","Contact"]].map(([k,label]) => (
            <a key={k} onClick={() => go(k)}>{label}</a>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Enhanced Hero with mount-triggered animations ───
function Hero({ setPage }: { setPage: (p: string) => void }) {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    // Wait one animation frame so the initial opacity:0 state is painted,
    // then trigger the entrance animations
    const raf = requestAnimationFrame(() => setVis(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const vc = vis ? "vis" : "";

  return (
    <section className="hero">
      {/* Full-screen drone video background */}
      <video
        className="hero-video"
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="hero-overlay" />
      <div className="hero-accent" />
      <div className="hero-accent-2" />
      <div className="hero-line-decor" />
      <div className="hero-line-decor-2" />

      <div className="hero-content">
        <div className={`h-item d1 ${vc}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120" width="500" height="100" style={{ display: "block", marginBottom: "8px" }}>
            <text
              x="300" y="58"
              textAnchor="middle"
              fontFamily="'Oswald', 'Arial Black', sans-serif"
              fontWeight="700"
              fontSize="46"
              fill="#FFFFFF"
              letterSpacing="5"
              textRendering="geometricPrecision"
            >THE SCARLET CORD</text>
            <text
              x="300" y="90"
              textAnchor="middle"
              fontFamily="'Raleway', 'Helvetica Neue', sans-serif"
              fontWeight="500"
              fontSize="20"
              fill="#D4394B"
              letterSpacing="4"
              textRendering="geometricPrecision"
            >Architects &amp; Builders</text>
          </svg>
        </div>

        <div className={`h-item d2 ${vc}`}>
          <h1 className="hero-h1">
            Architectural Design &amp;<br />
            <em>Construction</em> Excellence
          </h1>
        </div>

        <div className={`h-item d3 ${vc}`}>
          <p className="hero-sub">
            Delivering quality, cost-effective architectural and building construction solutions
            that maximize value for every stakeholder.
          </p>
        </div>

        <div className={`h-item d4 ${vc}`}>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>
              Request a Quote
            </button>
            <button className="btn-outline" onClick={() => { setPage("projects"); window.scrollTo(0, 0); }}>
              View Projects
            </button>
          </div>
        </div>

        <div className={`h-item d5 ${vc}`}>
          <div className="hero-stats">
            <CounterStat raw="5+" label="Years of Delivery" />
            <CounterStat raw="20+" label="Featured Projects" />
            <CounterStat raw="100%" label="Client Focused" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="trust">
      <div className="trust-inner">
        <div className="trust-item"><span className="trust-dot" /> CAC Registered (2021)</div>
        <div className="trust-item"><span className="trust-dot" /> Design</div>
        <div className="trust-item"><span className="trust-dot" /> Build</div>
        <div className="trust-item"><span className="trust-dot" /> Renovate</div>
        <div className="trust-item"><span className="trust-dot" /> Interior Finishing</div>
      </div>
    </div>
  );
}

function ServicesSection({ setPage }: { setPage: (p: string) => void }) {
  void setPage;
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <div className="section-header">
          <FadeIn><div className="section-tag">What We Do</div></FadeIn>
          <FadeIn delay={0.1}><h2 className="section-title">End-to-End Architectural<br />& Construction Services</h2></FadeIn>
          <FadeIn delay={0.15}><p className="section-subtitle">From initial concept through design, construction, and finishing — we deliver every phase with precision and care.</p></FadeIn>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.08}>
              <div className="service-card">
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview({ setPage }: { setPage: (p: string) => void }) {
  const featured = PROJECTS.slice(0, 6);
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <FadeIn><div className="section-tag">Portfolio</div></FadeIn>
            <FadeIn delay={0.1}><h2 className="section-title">Featured Projects</h2></FadeIn>
            <FadeIn delay={0.15}><p className="section-subtitle">A selection of residential, commercial, and interior projects across Lagos and beyond.</p></FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <button className="btn-primary" onClick={() => { setPage("projects"); window.scrollTo(0, 0); }} style={{ marginBottom: "20px" }}>
              View All Projects
            </button>
          </FadeIn>
        </div>
        <div className="projects-grid">
          {featured.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <div className="project-card">
                <div className="project-img">
                  {p.image ? <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} /> : "◇"}
                </div>
                <div className="project-overlay">
                  <span className="project-cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.location} · {p.year}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [
    { title: "Professional Integrity", desc: "We build trust through transparency, honesty, and consistent delivery on every promise." },
    { title: "Client-Centered Approach", desc: "Your vision drives every decision — we listen, adapt, and deliver spaces that exceed expectations." },
    { title: "End-to-End Delivery", desc: "From architectural design to construction to interior finishing — one team, one seamless experience." },
    { title: "Meticulous Attention to Detail", desc: "Every joint, every finish, every line is executed with precision and care." },
    { title: "Modern Tools & 3D Visualization", desc: "See your project in photorealistic 3D before a single brick is laid." },
  ];
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="why-grid">
          <div>
            <FadeIn><div className="section-tag">Why Choose Us</div></FadeIn>
            <FadeIn delay={0.1}><h2 className="section-title" style={{ color: "white" }}>Built on Integrity.<br />Driven by Excellence.</h2></FadeIn>
            <div className="why-list" style={{ marginTop: "36px" }}>
              {reasons.map((r, i) => (
                <FadeIn key={i} delay={0.15 + i * 0.08}>
                  <div className="why-item">
                    <span className="why-num">0{i + 1}</span>
                    <div><h4>{r.title}</h4><p>{r.desc}</p></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.1} direction="left">
            <div className="why-visual" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CTABand({ setPage }: { setPage: (p: string) => void }) {
  return (
    <section className="cta-band">
      <FadeIn><h2>Let&apos;s Build Your Next Project</h2></FadeIn>
      <FadeIn delay={0.1}><p>Ready to bring your architectural vision to life? Get in touch for a free consultation.</p></FadeIn>
      <FadeIn delay={0.2}><button className="btn-white" onClick={() => { setPage("contact"); window.scrollTo(0, 0); }}>Start a Conversation</button></FadeIn>
    </section>
  );
}

function Footer({ setPage }: { setPage: (p: string) => void }) {
  const go = (p: string) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h4>The Scarlet Cord Architects &amp; Builders Ltd</h4>
          <p>A wholly indigenous architectural and building construction company delivering quality, value-driven projects across Nigeria.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          {[["home","Home"],["about","About"],["services","Services"],["projects","Projects"],["contact","Contact"]].map(([k,l]) => (
            <a key={k} onClick={() => go(k)}>{l}</a>
          ))}
        </div>
        <div>
          <h4>Services</h4>
          <a>Architectural Design</a>
          <a>Construction</a>
          <a>Renovation</a>
          <a>Interior Design</a>
          <a>MEP Works</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a>+234 806 734 3333</a>
          <a>0805-332-7555</a>
          <a>thescarltcordltd@gmail.com</a>
          <a>Plot 1 Oladejo Street, Ojodu Berger, Lagos</a>
        </div>
      </div>
      <div className="footer-bar">
        <span>© 2026 The Scarlet Cord Architects &amp; Builders Ltd. All rights reserved.</span>
        <div className="footer-socials">
          <a href="https://instagram.com/thescarletcordarchitects" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Pages ───
function HomePage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <>
      <Hero setPage={setPage} />
      <TrustStrip />
      <ServicesSection setPage={setPage} />
      <ProjectsPreview setPage={setPage} />
      <WhyUs />
      <CTABand setPage={setPage} />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <FadeIn>
            <div className="section-tag" style={{ color: "var(--scarlet-light)" }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--scarlet-light)", marginRight: "8px", verticalAlign: "middle" }} />
              Our Story
            </div>
          </FadeIn>
          <FadeIn delay={0.1}><h1>About The Scarlet Cord</h1></FadeIn>
          <FadeIn delay={0.15}><p>A wholly indigenous firm, building Nigeria&apos;s future with integrity and excellence.</p></FadeIn>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div>
              <FadeIn><h2 className="section-title">Who We Are</h2></FadeIn>
              <FadeIn delay={0.1}>
                <div className="about-text">
                  <p>The Scarlet Cord Architects &amp; Builders Ltd is a wholly indigenous architectural and building construction company. We are a team of experienced, goal-oriented professionals dedicated to delivering architectural and construction solutions with integrity, precision, and a relentless focus on client satisfaction.</p>
                  <p>Based in Ojodu Berger, Lagos State, Nigeria, we provide services across residential, commercial, and real estate developments. Our approach combines modern design tools including 3D visualization with proven construction methods to deliver outstanding results.</p>
                  <p>Registered with the Corporate Affairs Commission (CAC) on March 24, 2021, we have quickly established ourselves through a portfolio of high-profile projects across Lagos and beyond.</p>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.15} direction="left">
              <div style={{ background: "linear-gradient(135deg, var(--scarlet-dark), var(--graphite))", borderRadius: "4px", aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "80px", color: "rgba(255,255,255,0.06)" }}>TSC</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <FadeIn><div className="section-tag" style={{ justifyContent: "center" }}>Leadership</div></FadeIn>
            <FadeIn delay={0.1}><h2 className="section-title">Meet Our Team</h2></FadeIn>
          </div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="team-card">
                  <div className="team-avatar">{t.name.split(" ").slice(-1)[0][0]}</div>
                  <h3>{t.name}</h3>
                  <div className="role">{t.role}</div>
                  {t.quals && <div className="quals">{t.quals}</div>}
                  <p>{t.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <FadeIn><div className="section-tag" style={{ justifyContent: "center" }}>Our Vision</div></FadeIn>
          <FadeIn delay={0.1}><h2 className="section-title" style={{ color: "white", fontSize: "clamp(28px, 3.5vw, 40px)" }}>To be the leading architectural and building construction firm in Africa.</h2></FadeIn>
          <FadeIn delay={0.15}><p className="section-subtitle" style={{ margin: "16px auto 0", textAlign: "center", maxWidth: "560px" }}>Our mission is to meet clients&apos; architectural and building construction needs in a qualitative, cost-effective way that maximizes value for stakeholders.</p></FadeIn>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <FadeIn><h1>Our Services</h1></FadeIn>
          <FadeIn delay={0.1}><p>Comprehensive architectural and construction services — from concept to completion.</p></FadeIn>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeIn key={s.id} delay={i * 0.08}>
                <div className="service-card">
                  <span className="service-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <FadeIn><h1>Our Projects</h1></FadeIn>
          <FadeIn delay={0.1}><p>Residential, commercial, and interior projects delivered with precision across Lagos and beyond.</p></FadeIn>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {CATEGORIES.map(c => (
              <button key={c} className={`filter-btn ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div className="project-card" onClick={() => setSelected(p)}>
                  <div className="project-img">
                    {p.image ? <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} /> : "◇"}
                  </div>
                  <div className="project-overlay">
                    <span className="project-cat">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.location} · {p.year}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "var(--warm-grey)" }}>
              <p>No projects found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>◇</span>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <span className="project-cat">{selected.category}</span>
              <h2>{selected.title}</h2>
              <p>{selected.desc}</p>
              <div className="modal-details">
                <div className="modal-detail"><label>Client</label><span>{selected.client}</span></div>
                <div className="modal-detail"><label>Location</label><span>{selected.location}</span></div>
                <div className="modal-detail"><label>Completion</label><span>{selected.year}</span></div>
                <div className="modal-detail"><label>Category</label><span>{selected.category}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.message.trim()) e.message = true;
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <FadeIn><h1>Get In Touch</h1></FadeIn>
          <FadeIn delay={0.1}><p>Ready to start your project? Let&apos;s discuss your vision.</p></FadeIn>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <FadeIn>
              <div className="contact-info">
                <h3>Contact Details</h3>
                <div className="contact-row"><strong>Address</strong> Plot 1 Oladejo Street, Ojodu Berger, Lagos</div>
                <div className="contact-row"><strong>Phone</strong> +234 806 734 3333 / 0805-332-7555</div>
                <div className="contact-row"><strong>Email</strong> thescarltcordltd@gmail.com</div>
                <div className="contact-row"><strong>Instagram</strong> @thescarletcordarchitects</div>
                <div className="contact-row"><strong>Facebook</strong> The Scarlet Cord Architect and Builders</div>
                <div style={{ marginTop: "32px", padding: "24px", background: "var(--light-grey)", borderRadius: "4px" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", marginBottom: "8px" }}>Office Hours</p>
                  <p style={{ fontSize: "14px", color: "var(--warm-grey)" }}>Monday — Friday: 8:00 AM – 5:00 PM</p>
                  <p style={{ fontSize: "14px", color: "var(--warm-grey)" }}>Saturday: 9:00 AM – 2:00 PM</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="left">
              {sent ? (
                <div className="form-success">
                  <p style={{ fontSize: "20px", fontFamily: "var(--font-display)", marginBottom: "8px", color: "#2E7D32" }}>Message Sent!</p>
                  <p>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="contact-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: false }); }} placeholder="Your full name" style={errors.name ? { borderColor: "var(--scarlet)" } : {}} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: false }); }} placeholder="email@example.com" style={errors.email ? { borderColor: "var(--scarlet)" } : {}} />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+234..." />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Service Needed</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: false }); }} placeholder="Tell us about your project..." style={errors.message ? { borderColor: "var(--scarlet)" } : {}} />
                  </div>
                  <button className="btn-primary" onClick={handleSubmit} style={{ alignSelf: "flex-start" }}>Send Message</button>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Main App ───
type PageName = "home" | "about" | "services" | "projects" | "contact";

export default function ScarletCordWebsite() {
  const [page, setPage] = useState<PageName>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pages: Record<PageName, React.ComponentType<{ setPage: (p: string) => void }>> = {
    home: HomePage,
    about: AboutPage,
    services: ServicesPage,
    projects: ProjectsPage,
    contact: ContactPage,
  };

  const PageComponent = pages[page] ?? HomePage;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav page={page} setPage={(p) => setPage(p as PageName)} scrolled={scrolled} />
      <PageComponent setPage={(p) => setPage(p as PageName)} />
      <Footer setPage={(p) => setPage(p as PageName)} />
    </div>
  );
}
