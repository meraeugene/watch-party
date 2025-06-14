"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

interface Props {
  user: {
    avatar: string;
    username: string;
    tag: string;
    email: string | undefined;
  };
}

export const Menu = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full overflow-hidden border border-white/20"
      >
        <Image
          src={user.avatar}
          alt="Avatar"
          width={28}
          height={28}
          className="rounded-full"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-10 bg-white text-black rounded-md shadow-xl  p-3 z-50"
          >
            <div className=" text-sm font-medium">
              {user.username}
              <div className="text-gray-500 text-xs">{user.tag}</div>
            </div>
            <hr className="my-2 border-gray-200 " />
            <LogoutButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
