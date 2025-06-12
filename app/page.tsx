"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaUserFriends,
  FaCalendarAlt,
  FaFilm,
  FaTicketAlt,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
};

function FadeInWhenVisible({ children, delay = 0 }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const steps = [
    {
      icon: <FaUserFriends />,
      title: "Step 1: Host & Guest",
      desc: "Enter your name and your guest's name to personalize your watch party invitation.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Step 2: Schedule",
      desc: "Pick the perfect date and time so everyone can show up on time.",
    },
    {
      icon: <FaFilm />,
      title: "Step 3: Choose a Movie",
      desc: "Search from trending and latest movies to select the perfect flick.",
    },
    {
      icon: <FaTicketAlt />,
      title: "Step 4: Get Your Ticket",
      desc: "Receive a beautiful watch party ticket with a summary and watch link, straight to your email.",
    },
  ];

  return (
    <main className="font-[family-name:var(--font-geist-mono)] bg-gradient-to-tr lg:bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col-reverse md:flex-row-reverse items-center justify-end md:justify-center gap-12 px-6 md:px-20 pb-10 pt-20 text-center md:text-left lg:mx-auto lg:gap-20">
        <FadeInWhenVisible>
          <div className="w-full lg:w-[80%]  ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow">
              Host the Ultimate Movie Night
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-10 text-gray-300">
              Invite friends, set the vibe, choose the movie — your watch party
              made simple and stylish.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href="/get-started"
                className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
              >
                Start a Watch Party
              </Link>
              <a
                href="#steps"
                className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                How it Works
              </a>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="w-full  ">
            <div className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
              <Image
                src="/landing.webp"
                alt="Watch Party"
                width={1000}
                height={400}
                className="rounded-2xl w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Steps Section */}
      <section
        id="steps"
        className="py-16 px-6 md:px-16 bg-gradient-to-t lg:bg-gradient-to-b from-black via-zinc-900 to-black text-white backdrop-blur-md border-t border-gray-700"
      >
        <FadeInWhenVisible>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-gray-400">
              Four elegant steps to bring everyone together for the perfect
              movie night.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <div className="p-6 md:p-8 bg-black/30 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all">
                <div className="text-4xl text-white mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 md:px-16 text-center bg-gradient-to-t lg:bg-gradient-to-r from-black via-zinc-900 to-black text-white border-t border-gray-700">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold mb-6">Ready to Watch Together?</h2>
          <p className="text-lg mb-8 text-gray-300">
            Create your personalized movie night ticket in under a minute.
          </p>
          <Link
            href="/get-started"
            className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </FadeInWhenVisible>
      </section>

      {/* Footer */}
      <footer className="text-center  py-6 text-sm text-gray-500 bg-black border-t border-gray-700">
        © 2025 WatchTogether
        <p>Built with love & popcorn.</p>
      </footer>
    </main>
  );
}
