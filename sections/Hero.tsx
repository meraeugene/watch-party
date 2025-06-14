import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import Image from "next/image";

type HeroProps = {
  handleClick: () => void | Promise<void>;
};

const Hero = ({ handleClick }: HeroProps) => {
  return (
    <section className="min-h-screen bg-[#001] flex flex-col-reverse xl:flex-row-reverse items-center justify-end md:justify-end gap-10 md:gap-16 px-6 md:px-20 pb-10 pt-20 text-center md:text-left lg:mx-auto lg:gap-20 lg:px-40">
      <FadeInWhenVisible>
        <div className="w-full lg:w-[80%]  ">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-6 leading-tight  drop-shadow  tokyo-glow">
            Host the Ultimate Movie Night
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8  text-[#c0caf5]">
            Invite friends, set the vibe, choose the movie — your watch party
            made simple and stylish.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button
              onClick={handleClick}
              className=" tokyo-glow bg-[#001] border border-[#798dbc]  px-6 py-3 rounded-sm font-bold drop-shadow cursor-pointer   shadow-md   transition"
            >
              Start a Watch Party
            </button>
            <a
              href="#steps"
              className="   text-[#001]  bg-[#cbd9f3]  font-semibold px-6 py-3 rounded-sm   transition"
            >
              How it Works
            </a>
          </div>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <div className="w-full  ">
          <div className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
            <Image
              src="/landing.webp"
              alt="Watch Party"
              width={1000}
              height={400}
              className="rounded-2xl w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

export default Hero;
