"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, ArrowUpRight, Loader2 } from "lucide-react";

const projects = [
  {
    name: "Oracle PSEO",
    description: "Cluster de 9 sites B2B en affiliation",
    date: "15 fév. 2026",
    createdAt: "2026-02-15",
  },
  {
    name: "Indxel",
    description: "Le SEO automatisé pour les devs",
    url: "https://indxel.com",
    logo: "/logos/indxel.png",
    date: "7 fév. 2026",
    createdAt: "2026-02-07",
  },
  {
    name: "LMNP Facile",
    description: "Déclarations LMNP en 10 minutes",
    url: "https://lmnp-facile.fr",
    logo: "/logos/lmnp.png",
    date: "22 janv. 2026",
    createdAt: "2026-01-22",
  },
  {
    name: "OneMinuteBranding",
    description: "Une identité visuelle complète en 1 minute",
    url: "https://oneminutebranding.com",
    logo: "/logos/omb.png",
    date: "21 janv. 2026",
    createdAt: "2026-01-21",
  },
  {
    name: "LeCapybara",
    description: "Lettres et mises en demeure en quelques clics",
    url: "https://lecapybara.fr",
    logo: "/logos/lecapybara.png",
    date: "13 janv. 2026",
    createdAt: "2026-01-13",
  },
  {
    name: "Eclo",
    description: "Suivi psy et bien-être au quotidien",
    url: "https://eclo.app",
    logo: "/logos/eclo.png",
    date: "17 oct. 2025",
    createdAt: "2025-10-17",
  },
  {
    name: "Winterbloom",
    description: "Changer ses habitudes par la gamification",
    url: "https://winterbloom.app",
    logo: "/logos/winterbloom.png",
    date: "19 mars 2025",
    createdAt: "2025-03-19",
  },
];

const NOUVEAU_CLUSTER_DATE = "2026-03-01";

// Bezier curve helpers — curve is M 0 48 C 160 47, 240 35, 290 2
function getBezierPoint(t: number) {
  const x = (1 - t) ** 3 * 0 + 3 * (1 - t) ** 2 * t * 160 + 3 * (1 - t) * t ** 2 * 240 + t ** 3 * 290;
  const y = (1 - t) ** 3 * 48 + 3 * (1 - t) ** 2 * t * 47 + 3 * (1 - t) * t ** 2 * 35 + t ** 3 * 2;
  return { x, y };
}

function findTForX(targetX: number) {
  let low = 0, high = 1;
  for (let i = 0; i < 50; i++) {
    const mid = (low + high) / 2;
    if (getBezierPoint(mid).x < targetX) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
}

function getPointOnCurve(fraction: number) {
  if (fraction <= 0) return getBezierPoint(0);
  if (fraction >= 1) return getBezierPoint(1);
  const t = findTForX(fraction * 290);
  return getBezierPoint(t);
}

// Precompute dot positions sorted chronologically
const allProjectDates = [
  ...projects.map((p) => ({ name: p.name, time: new Date(p.createdAt).getTime() })),
  { name: "Nouveau cluster", time: new Date(NOUVEAU_CLUSTER_DATE).getTime() },
].sort((a, b) => a.time - b.time);

const minTime = allProjectDates[0].time;
const maxTime = allProjectDates[allProjectDates.length - 1].time;
const timeRange = maxTime - minTime;

const curvePoints = allProjectDates.map((p) => {
  const fraction = timeRange > 0 ? (p.time - minTime) / timeRange : 0;
  return { ...getPointOnCurve(fraction), name: p.name };
});

const socials = [
  { name: "GitHub", href: "https://github.com/yann-lephay", icon: Github },
  { name: "X", href: "https://x.com/yannbuilds", icon: Twitter },
  { name: "Email", href: "mailto:info@yann-lephay.com", icon: Mail },
];

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16 sm:py-24">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-14 sm:mb-20"
      >
        <img
          src="/Logo.png"
          alt="Y"
          width={32}
          height={32}
          className="h-8 w-auto mb-8"
        />

        {/* Photo with pixel frame */}
        <div className="mb-6 inline-block relative">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden bg-foreground"
            style={{
              boxShadow: `
                3px 0 0 0 #141414,
                -3px 0 0 0 #141414,
                0 3px 0 0 #141414,
                0 -3px 0 0 #141414
              `,
            }}
          >
            <img
              src="/photo.jpg"
              alt="Yann Lephay"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="font-pixel text-2xl sm:text-3xl tracking-tight mb-3 text-balance">
          Yann Lephay
        </h1>

        <p className="text-muted leading-relaxed max-w-md text-[15px]">
          Je design, code et ship de tout. Sites, SaaS, devtools, apps, automatisation — solo.
        </p>
      </motion.header>

      {/* Projects */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        className="mb-14 sm:mb-20"
      >
        <h2 className="text-xs font-pixel uppercase tracking-widest text-muted mb-1">
          Projets
        </h2>
        {/* Courbe d'accélération */}
        <div className="mt-3 mb-5">
          <svg viewBox="0 0 300 52" className="w-full overflow-visible" fill="none">
            <motion.path
              d="M 0 48 C 160 47, 240 35, 290 2"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
              opacity="0.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
            <path
              d="M 0 48 C 160 47, 240 35, 290 2 L 290 52 L 0 52 Z"
              fill="currentColor"
              className="text-foreground"
              opacity="0.04"
            />
            {curvePoints.map((point, i) => (
              <motion.circle
                key={point.name}
                cx={point.x}
                cy={point.y}
                r={2.5}
                fill="currentColor"
                className="text-foreground"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.7, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>

        <div className="divide-y divide-border border-y border-border">
          <motion.div
            variants={fade}
            className="flex items-center justify-between py-3 sm:py-3.5 text-muted"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-5 h-5 shrink-0 flex items-center justify-center"
              >
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5 min-w-0">
                <span className="text-sm font-medium whitespace-nowrap">Nouveau cluster</span>
                <span className="text-sm truncate">En cours de création</span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <span className="text-[10px] font-pixel text-muted whitespace-nowrap">
                1 mars 2026
              </span>
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 opacity-0 shrink-0" />
            </div>
          </motion.div>
          {projects.map((project) => {
            const content = (
              <>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-5 h-5 shrink-0 overflow-hidden"
                    style={{
                      boxShadow: "1px 0 0 0 #141414, -1px 0 0 0 #141414, 0 1px 0 0 #141414, 0 -1px 0 0 #141414",
                    }}
                  >
                    {project.logo ? (
                      <img src={project.logo} alt={project.name} width={20} height={20} className="w-full h-full object-contain" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center bg-foreground text-background text-[7px] font-pixel leading-none">
                        Or
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5 min-w-0">
                    <span className="text-sm font-medium whitespace-nowrap">{project.name}</span>
                    <span className="text-sm text-muted truncate">{project.description}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-[10px] font-pixel text-muted whitespace-nowrap">
                    {project.date}
                  </span>
                  <ArrowUpRight aria-hidden="true" className={`h-3.5 w-3.5 text-muted shrink-0 ${project.url ? "opacity-0 transition-opacity group-hover:opacity-100" : "opacity-0"}`} />
                </div>
              </>
            );

            return project.url ? (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fade}
                className="group flex items-center justify-between py-3 sm:py-3.5 transition-colors hover:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm"
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={project.name}
                variants={fade}
                className="flex items-center justify-between py-3 sm:py-3.5"
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Links */}
      <motion.footer
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fade}
      >
        <h2 className="text-xs font-pixel uppercase tracking-widest text-muted mb-5">
          Liens
        </h2>

        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm"
              aria-label={social.name}
            >
              <social.icon className="h-4 w-4 stroke-[1.5]" />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted mt-10">
          Business inquiries:{" "}
          <a href="mailto:info@yann-lephay.com" className="text-foreground hover:text-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground rounded-sm">
            info@yann-lephay.com
          </a>
        </p>

        <p className="text-xs text-muted mt-6">
          &copy; {new Date().getFullYear()} Yann Lephay
        </p>
      </motion.footer>
    </main>
  );
}
