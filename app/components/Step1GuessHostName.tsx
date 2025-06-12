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
    <div className=" mb-4 lg:max-w-xl mx-auto">
      <h1 className="text-center  uppercase bg-[#0a0a0a] text-white dark:bg-white w-full py-1 dark:text-black font-[family-name:var(--font-geist-mono)] text-2xl font-bold ">
        Watch Party
      </h1>
      <h2 className="text-center font-[family-name:var(--font-geist-mono)] text-xl font-bold bg-gray-200 text-black py-1 mb-8 ">
        01: Host / Guest
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!guess.trim() || !host.trim()) {
            toast.error("Please type both host and guest names.");
            return;
          }
          setStep(2);
        }}
        className="flex flex-col gap-4"
      >
        <label className="font-[family-name:var(--font-geist-mono)]">
          Host Name:
          <input
            type="text"
            className="w-full border border-solid border-black/[.08] dark:border-white/[.145] px-3 py-2  outline-none mt-2  font-[family-name:var(--font-geist-mono)] "
            onChange={(e) => setHost(e.target.value)}
            value={host}
            placeholder="Enter host name"
          />
        </label>

        <label className="font-[family-name:var(--font-geist-mono)]">
          Guess Name:
          <input
            type="text"
            className="w-full border border-solid border-black/[.08] dark:border-white/[.145] px-3 py-2 outline-none mt-2 font-[family-name:var(--font-geist-mono)] "
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
            placeholder="Enter guest name"
          />
        </label>

        <button type="submit" className="mt-4 ctn-button ">
          Next: Create Schedule
        </button>
      </form>
    </div>
  );
};

export default Step1GuessHostName;
