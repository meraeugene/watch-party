import { toast } from "sonner";
import { IoCaretBack } from "react-icons/io5";
import { generateTimeOptions } from "@/helpers/utils";

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
    <div className="lg:max-w-xl mx-auto">
      <button onClick={() => setStep(1)} className="back-button">
        <IoCaretBack fontSize={18} />
      </button>

      <div className=" mb-6">
        <h1 className="text-center drop-shadow border border-[#798dbc]  tokyo-glow  uppercase  w-full py-1  font-[family-name:var(--font-geist-mono)] text-2xl font-bold ">
          Watch Party
        </h1>
        <h2 className="text-center font-[family-name:var(--font-geist-mono)] text-xl font-semibold text-[#001] bg-[#cbd9f3] py-1 mb-8 ">
          02: Create Schedule
        </h2>
      </div>

      <div className="flex flex-col gap-4 text-white ">
        <label className="font-[family-name:var(--font-geist-mono)]">
          Date:
          <input
            type="date"
            className="w-full  text-black outline-none bg-gray-100    px-3 py-2 mt-2 "
            placeholder="Select Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="font-[family-name:var(--font-geist-mono)]">
          Time:
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-gray-100 text-black border border-solid border-white/[.2] px-3 py-2 mt-2 outline-none"
          >
            <option value="" disabled>
              Select Time
            </option>
            {generateTimeOptions(30).map((t) => (
              <option key={t} value={t}>
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
        className="mt-8 ctn-button"
      >
        Next: Find Movie
      </button>
    </div>
  );
};

export default Step2Schedule;
