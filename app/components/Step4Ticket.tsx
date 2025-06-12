import Image from "next/image";
import { CiCalendarDate, CiTimer } from "react-icons/ci";
import { RxDiscordLogo } from "react-icons/rx";
import Barcode from "./BarCode";
import { RefObject, useState, useEffect, useRef } from "react";
import { MovieResult } from "@/types";
import * as htmlToImage from "html-to-image";
import { EmailModal } from "./EmailModal";
import { HiOutlineMail, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "sonner";
import { IoCaretBack } from "react-icons/io5";
import { GiDuration } from "react-icons/gi";
import { RiMovieAiLine, RiUserHeartLine } from "react-icons/ri";
import { TbUserShield } from "react-icons/tb";

interface Step4TicketProps {
  selectedMovie: MovieResult | null;
  date: string;
  time: string;
  guess: string;
  host: string;
  ticketRef: RefObject<HTMLDivElement | null>;
  setStep: (step: number) => void;
}

const Step4Ticket = ({
  selectedMovie,
  date,
  time,
  guess,
  host,
  ticketRef,
  setStep,
}: Step4TicketProps) => {
  const [showModal, setShowModal] = useState(false);
  const [customTitle, setCustomTitle] = useState(
    `You're Invited to a Watch Party!`
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  if (!selectedMovie || !selectedMovie.poster || !selectedMovie.title)
    return null;

  return (
    <div>
      <button
        onClick={() => setStep(3)}
        className="mt-6 border border-solid cursor-pointer border-black/[.08] transition-colors flex items-center justify-center bg-white text-black dark:bg-gray-300 dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-8 sm:h-12 px-4 sm:px-5  sm:w-auto md:w-[158px] font-[family-name:var(--font-geist-mono)] mb-8"
      >
        <IoCaretBack fontSize={18} />
      </button>

      <div className="mb-8 w-full">
        <h1 className="text-center  uppercase bg-white w-full py-1 text-black font-[family-name:var(--font-geist-mono)] text-2xl font-bold">
          Watch Party
        </h1>
        <h1 className="text-center font-[family-name:var(--font-geist-mono)] text-2xl font-bold bg-gray-100 text-black py-1 w-full ">
          04: All Set!
        </h1>
      </div>

      <div ref={ticketRef} className="ticket bg-gray-100 dark:bg-white">
        <div className="holes-top"></div>
        <div className="title">
          <div className="relative text-center w-full">
            <textarea
              value={customTitle}
              ref={textareaRef}
              onChange={(e) => setCustomTitle(e.target.value)}
              rows={2}
              className="cinema text-2xl font-[family-name:var(--font-geist-mono)] text-black bg-transparent w-full outline-none resize-none leading-snug focus:border-b-2 border-dashed border-black cursor-text transition text-center"
              placeholder="You're Invited to a Watch Party!"
            />
            <p
              onClick={() => {
                const textarea = textareaRef.current;
                if (textarea) {
                  textarea.focus();
                  const len = textarea.value.length;
                  textarea.setSelectionRange(len, len); // <-- move caret to end
                }
              }}
              className="hide-on-export text-sm text-gray-500 italic mt-1 flex items-center gap-2 justify-center"
            >
              Yes, you can edit the title
              <HiOutlinePencilAlt />
            </p>
          </div>

          <p className="movie-title text-xl my-2 font-extrabold text-black font-[family-name:var(--font-geist-mono)] text-center">
            {selectedMovie?.title}
          </p>
        </div>
        <div className="poster">
          <Image
            width={200}
            height={400}
            className="object-center object-cover w-auto  h-auto mx-auto "
            src={`/api/image-proxy?url=${encodeURIComponent(
              selectedMovie.poster
            )}`}
            alt={selectedMovie.title}
          />
        </div>
        <div className="info">
          <div className="font-[family-name:var(--font-geist-mono)]">
            <div className="flex  justify-between gap-16">
              <div className="flex flex-col items-start">
                <h1 className="text-lg font-medium">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CiCalendarDate />
                    Date
                  </div>
                </h1>
                <h1 className="text-xl font-semibold">{date}</h1>
              </div>

              <div className="flex flex-col items-end">
                <h1 className="text-lg font-medium">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CiTimer />
                    Time
                  </div>
                </h1>
                <h1 className="text-xl font-semibold">{time}</h1>
              </div>
            </div>

            <div className=" mt-6 flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h1 className="text-lg font-medium">
                  <div className="flex justify-center items-center gap-2 text-gray-600">
                    <RiUserHeartLine />
                    Guess
                  </div>
                </h1>
                <h1 className="text-xl font-semibold">{guess}</h1>
              </div>

              <div className="flex flex-col items-end">
                <h1 className="text-lg font-medium">
                  <div className="flex justify-center items-start gap-2 text-gray-600">
                    <TbUserShield />
                    Host
                  </div>
                </h1>
                <h1 className="text-xl font-semibold">{host}</h1>
              </div>
            </div>

            <div className=" mt-6 flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h1 className="text-lg font-medium">
                  <div className="flex justify-center items-center gap-2 text-gray-600">
                    <GiDuration />
                    Duration
                  </div>
                </h1>
                <h1 className="text-xl font-semibold">
                  {selectedMovie.duration
                    ? `${selectedMovie.duration} min`
                    : "N/A"}{" "}
                </h1>
              </div>

              <div className="flex flex-col items-end">
                <h1 className="text-lg font-medium">
                  <div className="flex justify-center items-center gap-2 text-gray-600">
                    <RxDiscordLogo />
                    App
                  </div>
                </h1>
                <h1 className="text-xl font-semibold">Discord</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="holes-lower"></div>
        <div className="serial">
          <Barcode />
          <table className="numbers">
            <tbody>
              <tr>
                <td>9</td>
                <td>1</td>
                <td>7</td>
                <td>3</td>
                <td>7</td>
                <td>5</td>
                <td>4</td>
                <td>4</td>
                <td>4</td>
                <td>5</td>
                <td>4</td>
                <td>1</td>
                <td>4</td>
                <td>7</td>
                <td>8</td>
                <td>7</td>
                <td>3</td>
                <td>4</td>
                <td>1</td>
                <td>4</td>
                <td>5</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <EmailModal
        isOpen={showModal}
        guess={guess}
        onClose={() => setShowModal(false)}
        onSend={async (guestEmail, setLoading) => {
          if (!ticketRef.current) {
            setLoading(false);
            return;
          }

          const topHoles = ticketRef.current.querySelector(
            ".holes-top"
          ) as HTMLElement;
          const hint = ticketRef.current.querySelector(
            ".hide-on-export"
          ) as HTMLElement;

          if (topHoles) topHoles.style.display = "none";
          if (hint) hint.style.display = "none";

          try {
            const dataUrl = await htmlToImage.toPng(ticketRef.current);

            const res = await fetch("/api/email-ticket", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: guestEmail,
                ticketImage: dataUrl,
                movieTitle: selectedMovie?.title,
                hostName: host,
                date,
                time,
                movieDuration: selectedMovie.duration,
              }),
            });

            const result = await res.json();

            if (result.success) {
              toast.success("Ticket sent successfully!");
              setShowModal(false);
            } else {
              toast.error("Failed to send ticket.");
            }
          } catch (error) {
            console.error("Email error:", error);
            toast.error("Error sending email.");
          } finally {
            if (topHoles) topHoles.style.display = "";
            if (hint) hint.style.display = "";
            setLoading(false);
          }
        }}
      />

      <button
        onClick={() => setShowModal(true)}
        className="mt-2 border border-solid cursor-pointer border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-100 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] gap-3 font-[family-name:var(--font-geist-mono)]"
      >
        <HiOutlineMail />
        Email Ticket
      </button>

      <a
        href={selectedMovie.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 border border-solid cursor-pointer border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-white text-black hover:bg-gray-100 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] gap-3 font-[family-name:var(--font-geist-mono)]"
      >
        <RiMovieAiLine />
        Watch Here
      </a>
    </div>
  );
};

export default Step4Ticket;
