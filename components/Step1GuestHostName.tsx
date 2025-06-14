import { useRouter } from "next/navigation";
import { IoCaretBack } from "react-icons/io5";
import { toast } from "sonner";

interface Step1GuestNameProps {
  guest: string;
  host: string;
  setHost: (host: string) => void;
  setGuest: (guest: string) => void;
  setStep: (step: number) => void;
}
const Step1GuestHostName = ({
  guest,
  host,
  setGuest,
  setStep,
  setHost,
}: Step1GuestNameProps) => {
  const router = useRouter();

  return (
    <div className=" mb-4 lg:max-w-xl mx-auto">
      <button onClick={() => router.back()} className="back-button">
        <IoCaretBack fontSize={18} />
      </button>

      <h1 className="text-center drop-shadow border border-[#798dbc]  tokyo-glow  uppercase   w-full py-1  font-[family-name:var(--font-geist-mono)] text-2xl font-bold ">
        Watch Party
      </h1>
      <h2 className="text-center font-[family-name:var(--font-geist-mono)] text-xl font-semibold text-[#001] bg-[#cbd9f3] py-1 mb-8 ">
        01: Host / Guest
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!guest.trim() || !host.trim()) {
            toast.error("Please type both host and guest names.");
            return;
          }
          setStep(2);
        }}
        className="flex flex-col gap-4 text-white"
      >
        <label className="font-[family-name:var(--font-geist-mono)]">
          Host Name:
          <input
            type="text"
            className="w-full   border border-[#798dbc]  px-3 py-2  outline-none mt-2  font-[family-name:var(--font-geist-mono)] "
            onChange={(e) => setHost(e.target.value)}
            value={host}
            placeholder="Enter host name"
          />
        </label>

        <label className="font-[family-name:var(--font-geist-mono)]">
          Guest Name:
          <input
            type="text"
            className="w-full border  border-[#798dbc]  px-3 py-2 outline-none mt-2 font-[family-name:var(--font-geist-mono)] "
            onChange={(e) => setGuest(e.target.value)}
            value={guest}
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

export default Step1GuestHostName;
