"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCurrentUser } from "@/actions/auth";
import Steps from "@/sections/Steps";
import Hero from "@/sections/Hero";
import Footer from "@/components/Footer";
import CallToAction from "@/sections/CallToAction";

export default function Home() {
  const router = useRouter();

  const handleClick = async () => {
    const user = await getCurrentUser();

    if (user) {
      router.push("/create-party");
    } else {
      toast.info("Please login first to create a watch party.");
    }
  };

  return (
    <main className="font-[family-name:var(--font-geist-mono)]  text-white">
      <Hero handleClick={handleClick} />
      <Steps />
      <CallToAction handleClick={handleClick} />
      <Footer />
    </main>
  );
}
