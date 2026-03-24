"use client";

import Link from "next/link";
import { ArrowRight, Clock, Share2, Calendar, Globe, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, Variants } from "framer-motion";

const features = [
  { icon: Globe, title: "Multi-Timezone", desc: "Compare 2–10 cities simultaneously with live, DST-accurate clocks." },
  { icon: Layers, title: "Visual Timeline", desc: "Drag the interactive timeline to find the perfect meeting window." },
  { icon: Clock, title: "Business Hours", desc: "See overlapping work hours highlighted automatically across all zones." },
  { icon: Share2, title: "Shareable Links", desc: "Generate a link with your proposed times. One click to share with anyone." },
  { icon: Calendar, title: "Calendar Export", desc: "Export to Google Calendar, Outlook, or download an .ics file instantly." },
  { icon: Zap, title: "Instant & Free", desc: "No signup needed. Sub-second load times on any device, anywhere." },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const glowPulse: Variants = {
  animate: {
    textShadow: [
      "0 0 20px hsl(192 85% 50% / 0.5), 0 0 60px hsl(192 85% 50% / 0.15)",
      "0 0 30px hsl(192 85% 50% / 0.6), 0 0 80px hsl(192 85% 50% / 0.25)",
      "0 0 20px hsl(192 85% 50% / 0.5), 0 0 60px hsl(192 85% 50% / 0.15)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />

    {/* Hero */}
    <section className="flex-1 flex items-center justify-center px-4 py-20 md:py-32 overflow-hidden">
      <motion.div
        className="max-w-3xl text-center space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
        >
          <Clock className="h-3.5 w-3.5" />
          Free Time Zone Converter
        </motion.div>
        <motion.h1
          variants={heroTextVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Convert time zones{" "}
          <motion.span
            className="text-primary inline-block"
            variants={glowPulse}
            animate="animate"
          >
            instantly
          </motion.span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
        >
          Visual timeline slider, business hour overlap, and shareable meeting links. Built for remote teams.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
        >
          <Button asChild size="lg" className="text-base gap-2">
            <Link href="/convert">
              Start Converting <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/convert?zones=Seattle,London">
              Try Seattle → London
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>

    {/* Features */}
    <section className="py-20 border-t border-border/30">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Everything you need, nothing you don&apos;t
        </motion.h2>
        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.25)",
                transition: { duration: 0.3 },
              }}
              className="glass rounded-xl p-6 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <f.icon className="h-8 w-8 text-primary mb-3" />
              </motion.div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Pricing teaser */}
    <section className="py-20 border-t border-border/30">
      <div className="container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
          className="text-2xl md:text-3xl font-bold text-center mb-8"
        >
          Simple, transparent pricing
        </motion.h2>
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-bold text-lg mb-1">Free</h3>
            <p className="text-3xl font-bold mb-4">
              $0<span className="text-sm font-normal text-muted-foreground">/forever</span>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>✓</motion.span> Multi-timezone converter
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>✓</motion.span> Visual timeline slider
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>✓</motion.span> Business hour overlap
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>✓</motion.span> Shareable links
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>✓</motion.span> Calendar export
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>✓</motion.span> 3 saved favorites
              </li>
            </ul>
          </motion.div>
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="glass rounded-xl p-6 border-primary/30 relative overflow-hidden"
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg"
            >
              Coming Soon
            </motion.div>
            <h3 className="font-bold text-lg mb-1">Pro</h3>
            <p className="text-3xl font-bold mb-4">
              $4.99<span className="text-sm font-normal text-muted-foreground">/month</span>
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>✓</motion.span> Everything in Free
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>✓</motion.span> Unlimited favorites
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>✓</motion.span> Custom work hours
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>✓</motion.span> Embeddable widgets
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>✓</motion.span> API access
              </li>
              <li className="flex items-center gap-2">
                <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>✓</motion.span> Ad-free experience
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;