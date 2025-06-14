"use client";

import { CurrentUser, MovieResult } from "@/types";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1GuestHostName from "@/components/Step1GuestHostName";
import Step2Schedule from "@/components/Step2Schedule";
import Step3FindMovie from "@/components/Step3FindMovie";
import Step4Ticket from "@/components/Step4Ticket";

export default function CreateParty({ user }: { user: CurrentUser | null }) {
  const [step, setStep] = useState(1);
  const [host, setHost] = useState("");
  const [guest, setGuest] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieResult | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1GuestHostName
            guest={guest}
            host={host}
            setHost={setHost}
            setGuest={setGuest}
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
            guest={guest}
            user={user}
            ticketRef={ticketRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full  bg-[#001] min-h-screen flex items-center justify-center mx-auto  p-6 pb-12 pt-16 ">
      <main className="flex flex-col w-full max-w-2xl  mx-auto items-center   ">
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
