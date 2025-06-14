import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";

type CallToActionProps = {
  handleClick: () => void | Promise<void>;
};

const CallToAction = ({ handleClick }: CallToActionProps) => {
  return (
    <section className="py-16 px-6 md:px-16 text-center    border-t  bg-[#001]  border-[#384375] ">
      <FadeInWhenVisible>
        <h2 className="text-3xl font-bold mb-6 tokyo-glow">
          Ready to Watch Together?
        </h2>
        <p className=" mb-10 text-base text-[#c0caf5] ">
          Create your personalized watch party ticket in under a minute.
        </p>
        <button
          onClick={handleClick}
          className=" bg-[#001] tokyo-glow  border border-[#798dbc] font-semibold px-6 py-3 rounded-sm shadow-md cursor-pointer  transition"
        >
          Get Started
        </button>
      </FadeInWhenVisible>
    </section>
  );
};

export default CallToAction;
