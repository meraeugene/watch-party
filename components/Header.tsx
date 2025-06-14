import Image from "next/image";
import { getCurrentUser } from "@/actions/auth";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { Menu } from "./Menu";

const Header = async () => {
  const user = await getCurrentUser();

  return (
    <div className="bg-black/10  border-white/10 tokyo-glow text-black  top-0 fixed w-full z-20 h-12  shadow-md border-b backdrop-blur-sm px-6 font-[family-name:var(--font-geist-mono)] flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        {" "}
        <Image src="/logo.svg" alt="Watch Party Logo" width={44} height={44} />
        <h1 className="uppercase font-semibold drop-shadow  ">Watch Party</h1>
      </Link>

      {user ? <Menu user={user} /> : <LoginButton />}
    </div>
  );
};

export default Header;
