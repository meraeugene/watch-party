import { toast } from "sonner";

interface Step1GuessNameProps {
  guess: string;
  host: string;
  setHost: (host: string) => void;
  setGuess: (guess: string) => void;
  setStep: (step: number) => void;
}
const Step1GuessHostName = ({
  guess,
  host,
  setGuess,
  setStep,
  setHost,
}: Step1GuessNameProps) => {
  return (
    <div className=" mb-4">
      <h1 className="text-center  uppercase bg-[#0a0a0a] text-white dark:bg-white w-full py-1 dark:text-black font-[family-name:var(--font-geist-mono)] text-2xl font-bold">
        Watch Party
      </h1>
      <h1 className="text-center font-[family-name:var(--font-geist-mono)] text-2xl font-bold bg-gray-200 text-black py-1 mb-8">
        01: Host / Guest
      </h1>

      <div className="flex flex-col gap-4">
        <label className="font-[family-name:var(--font-geist-mono)]">
          Host Name:
          <input
            type="text"
            className="w-full border border-solid border-black/[.08] dark:border-white/[.145] px-3 py-2  outline-none mt-2  font-[family-name:var(--font-geist-mono)]"
            onChange={(e) => setHost(e.target.value)}
            value={host}
            placeholder="Enter host name"
          />
        </label>

        <label className="font-[family-name:var(--font-geist-mono)]">
          Guess Name:
          <input
            type="text"
            className="w-full border border-solid border-black/[.08] dark:border-white/[.145] px-3 py-2 outline-none mt-2 font-[family-name:var(--font-geist-mono)]"
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
            placeholder="Enter guest name"
          />
        </label>
      </div>

      <button
        onClick={() => {
          if (!guess.trim() || !host.trim()) {
            toast.error("Please type both host and guest names.");
            return;
          }
          setStep(2);
        }}
        className="mt-8 border border-solid cursor-pointer border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#0a0a0a] dark:bg-[#f2f2f2] text-white dark:text-black dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] font-[family-name:var(--font-geist-mono)]"
      >
        Next: Create Schedule
      </button>
    </div>
  );
};

export default Step1GuessHostName;
