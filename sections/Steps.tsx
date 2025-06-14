import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import {
  FaUserFriends,
  FaCalendarAlt,
  FaFilm,
  FaTicketAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserFriends />,
    title: "Step 1: Host & Guest",
    desc: "Enter your name and your guest's name to personalize your watch party invitation.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Step 2: Schedule",
    desc: "Pick the perfect date and time so everyone can show up on time.",
  },
  {
    icon: <FaFilm />,
    title: "Step 3: Choose a Movie",
    desc: "Search from trending and latest movies to select the perfect flick.",
  },
  {
    icon: <FaTicketAlt />,
    title: "Step 4: Get Your Ticket",
    desc: "Receive a beautiful watch party ticket with a summary and watch link, straight to your guess email.",
  },
];

const Steps = () => {
  return (
    <section
      id="steps"
      className="py-16 px-6 md:px-16 bg-[#001]   backdrop-blur-md border-t  border-[#384375]"
    >
      <FadeInWhenVisible>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4  tokyo-glow ">How It Works</h2>
          <p className=" text-[#c0caf5]">
            Four elegant steps to bring everyone together for the perfect movie
            night.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <FadeInWhenVisible key={i} delay={i * 0.2}>
            <div className="p-6 md:p-8 h-full  backdrop-blur-lg rounded-lg border border-[#384375] shadow-xl hover:shadow-2xl transition-all">
              <div className="text-4xl  mb-4">{step.icon}</div>
              <h3 className="text-xl tokyo-glow font-semibold mb-2  ">
                {step.title}
              </h3>
              <p className=" text-[#c0caf5]">{step.desc}</p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
};

export default Steps;
