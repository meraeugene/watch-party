"use client";

import { MovieResult } from "@/types";
import { useState, useRef } from "react";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Step1GuessHostName from "./components/Step1GuessHostName";
import Step2Schedule from "./components/Step2Schedule";
import Step3FindMovie from "./components/Step3FindMovie";
import Step4Ticket from "./components/Step4Ticket";

export default function Home() {
  const [step, setStep] = useState(1);
  const [host, setHost] = useState("");
  const [guess, setGuess] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieResult | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1GuessHostName
            guess={guess}
            host={host}
            setHost={setHost}
            setGuess={setGuess}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <Step2Schedule
            date={date}
            time={time}
            setDate={setDate}
            setTime={setTime}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <Step3FindMovie
            query={query}
            setQuery={setQuery}
            setSelectedMovie={setSelectedMovie}
            setStep={setStep}
          />
        );
      case 4:
        return (
          <Step4Ticket
            setStep={setStep}
            selectedMovie={selectedMovie}
            date={date}
            time={time}
            host={host}
            guess={guess}
            ticketRef={ticketRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-y-scroll p-6 pb-12 ">
      <Toaster position="top-center" richColors />
      <main className="flex flex-col w-full max-w-2xl items-center   ">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
