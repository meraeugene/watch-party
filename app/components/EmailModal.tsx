import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "sonner";
import Loader from "./Loader";

interface EmailModalProps {
  isOpen: boolean;
  guess: string;
  onClose: () => void;
  onSend: (email: string, setLoading: (val: boolean) => void) => void;
}

export const EmailModal = ({
  isOpen,
  onClose,
  guess,
  onSend,
}: EmailModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center text-black bg-black/10 backdrop-blur-sm "
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 font-[family-name:var(--font-geist-mono)] w-[80%] max-w-md shadow-xl rounded-md"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 ">
              <HiOutlineMail />
              Email Invite
            </h2>
            <form action=""></form>
            <input
              type="email"
              value={email}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  e.preventDefault();
                  if (!email.includes("@"))
                    return toast.error("Enter a valid email.");
                  setLoading(true);
                  onSend(email, setLoading);
                }
              }}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2   border border-solid  border-black/[1]  mb-4 outline-none"
              placeholder={`Enter ${guess}'s email`}
              disabled={loading}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="rounded-sm border border-solid cursor-pointer  border-black/[.04] transition-colors flex items-center justify-center text-black bg-[#f2f2f2] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]  font-[family-name:var(--font-geist-mono)]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!email.includes("@"))
                    return toast.error("Enter a valid email.");
                  setLoading(true);
                  onSend(email, setLoading);
                }}
                disabled={loading}
                className=" rounded-sm border border-solid cursor-pointer border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center text-white bg-[#1a1a1a] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] font-[family-name:var(--font-geist-mono)]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader /> Sending
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
