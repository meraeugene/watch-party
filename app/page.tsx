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
    <main className="font-[family-name:var(--font-geist-mono)]  text-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-tr lg:bg-gradient-to-b dark:from-black dark:via-zinc-900 dark:to-black flex flex-col-reverse md:flex-row-reverse items-center justify-end md:justify-center gap-12 px-6 md:px-20 pb-10 pt-20 text-center md:text-left lg:mx-auto lg:gap-20 lg:px-40">
        <FadeInWhenVisible>
          <div className="w-full lg:w-[80%]  ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight dark:text-white drop-shadow text-black">
              Host the Ultimate Movie Night
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-10 dark:text-gray-300 text-gray-700">
              Invite friends, set the vibe, choose the movie — your watch party
              made simple and stylish.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <Link
                href="/get-started"
                className="dark:bg-white text-black font-semibold px-6 py-3 rounded-sm shadow-md hover:bg-gray-100 bg-gray-100 transition"
              >
                Start a Watch Party
              </Link>
              <a
                href="#steps"
                className="border border-gray-300 dark:border-white text-black dark:text-white font-semibold px-6 py-3 rounded-sm hover:bg-white hover:text-black transition"
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
        className="py-16 px-6 md:px-16  dark:bg-black  dark:text-white backdrop-blur-md border-t dark:border-gray-700 border-gray-300"
      >
        <FadeInWhenVisible>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 dark:text-white text-black">
              How It Works
            </h2>
            <p className="dark:text-gray-400 text-gray-700">
              Four elegant steps to bring everyone together for the perfect
              movie night.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.2}>
              <div className="p-6 md:p-8 dark:bg-black/30 backdrop-blur-lg rounded-lg border border-gray-700 shadow-xl hover:shadow-2xl transition-all">
                <div className="text-4xl dark:text-white text-black mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white text-black">
                  {step.title}
                </h3>
                <p className="dark:text-gray-400 text-gray-700">{step.desc}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 md:px-16 text-center dark:bg-black text-black dark:text-white border-t dark:border-gray-700 border-gray-300 ">
        <FadeInWhenVisible>
          <h2 className="text-4xl font-bold mb-6">Ready to Watch Together?</h2>
          <p className="text-lg mb-8 dark:text-gray-300 text-gray-700">
            Create your personalized movie night ticket in under a minute.
          </p>
          <Link
            href="/get-started"
            className="dark:bg-white text-black font-semibold px-6 py-3 rounded-sm shadow-md hover:bg-gray-100 bg-gray-100 transition"
          >
            Get Started
          </Link>
        </FadeInWhenVisible>
      </section>

      {/* Footer */}
      <footer className="text-center  py-6 text-sm text-gray-700 dark:text-gray-500 dark:bg-black border-t dark:border-gray-700 border-gray-300">
        © 2025 WatchTogether
        <p>Built with love & popcorn.</p>
      </footer>
    </main>
  );
}
