"use client";

import { useTransition } from "react";
import { signOut } from "@/actions/auth";
import { RiLogoutCircleLine } from "react-icons/ri";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm flex items-center gap-2"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          Logging out
        </>
      ) : (
        <>
          <RiLogoutCircleLine />
          Logout
        </>
      )}
    </button>
  );
};

export default LogoutButton;
