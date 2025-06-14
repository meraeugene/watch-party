"use client";

import { createClient } from "@/utils/supabase/client";

const LoginButton = () => {
  const handleLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `https://watch-party-invitation.vercel.app/auth/callback`,
        // redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="text-sm cursor-pointer tokyo-glow bg-[#001] text-black  border border-[#798dbc] py-[0.2rem] px-2 rounded-sm font-semibold drop-shadow  "
    >
      LOGIN
    </button>
  );
};

export default LoginButton;
