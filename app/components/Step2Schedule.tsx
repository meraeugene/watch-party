import { toast } from "sonner";
import { generateTimeOptions } from "../helpers/utils";
import { IoCaretBack } from "react-icons/io5";

interface Step2ScheduleProps {
  date: string;
  time: string;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setStep: (step: number) => void;
}

const Step2Schedule = ({
  date,
  time,
  setDate,
  setTime,
  setStep,
}: Step2ScheduleProps) => {
  return (
    <div>
      <button
        onClick={() => setStep(1)}
        className="mt-6 border border-solid cursor-pointer border-black/[.08] transition-colors flex items-center justify-center bg-white text-black dark:bg-gray-200 dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-8 sm:h-12 px-4 sm:px-5  sm:w-auto md:w-[158px] font-[family-name:var(--font-geist-mono)] mb-8"
      >
        <IoCaretBack fontSize={18} />
      </button>

      <div className=" mb-4">
        <h1 className="text-center  uppercase dark:bg-white bg-[#0a0a0a] w-full py-1 text-white dark:text-black font-[family-name:var(--font-geist-mono)] text-2xl font-bold">
          Watch Party
        </h1>
        <h1 className="text-center font-[family-name:var(--font-geist-mono)] text-2xl font-bold bg-gray-200 text-black py-1">
          02: Create Schedule
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-[family-name:var(--font-geist-mono)]">
          Date:
          <input
            type="date"
            className="w-full border border-solid border-black/[.08] dark:border-white/[.145] px-3 py-2 mt-2 bg-white dark:bg-gray-50 dark:text-black"
            value={date}
            style={{ colorScheme: "light" }}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="font-[family-name:var(--font-geist-mono)]">
          Time:
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-solid border-black/[.08] dark:border-white/[.145] px-3 py-2 mt-2  text-black outline-none dark:text-white"
          >
            <option value="" disabled>
              Select Time
            </option>
            {generateTimeOptions(30).map((t) => (
              <option className="bg-white dark:bg-black" key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={() => {
          if (!date || !time) {
            toast.error("Please select both date and time.");
            return;
          }
          setStep(3);
        }}
        className="mt-6 border border-solid cursor-pointer border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center text-white dark:bg-[#f2f2f2] bg-[#0a0a0a] dark:text-black dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] font-[family-name:var(--font-geist-mono)]"
      >
        Next: Find Movie
      </button>
    </div>
  );
};

export default Step2Schedule;
