"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Indxel",
    description: "Infrastructure SEO developer-first",
    url: "https://indxel.com",
    logo: "/logos/indxel.png",
  },
  {
    name: "OneMinuteBranding",
    description: "Brand system generator pour devs",
    url: "https://oneminutebranding.com",
    logo: "/logos/omb.png",
  },
  {
    name: "LeCapybara",
    description: "Aide aux demarches administratives",
    url: "https://lecapybara.fr",
    logo: "/logos/lecapybara.png",
  },
  {
    name: "LMNP Facile",
    description: "Generateur de liasses fiscales LMNP",
    url: "https://lmnp-facile.fr",
    logo: "/logos/lmnp.png",
  },
  {
    name: "Winterbloom",
    description: "Transformation d'habitudes par le jeu",
    url: "https://winterbloom.app",
    logo: "/logos/winterbloom.png",
  },
  {
    name: "Eclo",
    description: "Coaching psychologique mobile",
    url: "https://eclo.app",
    logo: "/logos/eclo.png",
  },
];

const socials = [
  { name: "GitHub", href: "https://github.com/yannlephay", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/yannlephay", icon: Linkedin },
  { name: "X", href: "https://x.com/yannlephay", icon: Twitter },
  { name: "Email", href: "mailto:contact@yannlephay.com", icon: Mail },
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
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="font-pixel text-2xl sm:text-3xl tracking-tight mb-3">
          Yann Lephay
        </h1>

        <p className="text-muted leading-relaxed max-w-md text-[15px]">
          Je design, code et ship des produits. SaaS, devtools, apps — de l'idee au revenu, solo.
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
        <h2 className="text-xs font-pixel uppercase tracking-widest text-muted mb-5">
          Projets
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {projects.map((project) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fade}
              className="group flex items-center justify-between py-3 sm:py-3.5 transition-colors hover:text-muted"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 shrink-0 overflow-hidden"
                  style={{
                    boxShadow: "1px 0 0 0 #141414, -1px 0 0 0 #141414, 0 1px 0 0 #141414, 0 -1px 0 0 #141414",
                  }}
                >
                  <img src={project.logo} alt={project.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5 min-w-0">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-sm text-muted">{project.description}</span>
                </div>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-4" />
            </motion.a>
          ))}
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
              className="text-muted transition-colors hover:text-foreground"
              aria-label={social.name}
            >
              <social.icon className="h-4 w-4 stroke-[1.5]" />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted mt-12">
          &copy; {new Date().getFullYear()} Yann Lephay
        </p>
      </motion.footer>
    </main>
  );
}
