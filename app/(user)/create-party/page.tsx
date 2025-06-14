import CreateParty from "./CreateParty";
import { getCurrentUser } from "@/actions/auth";

export default async function page() {
  const user = await getCurrentUser(); // server-side call

  return <CreateParty user={user} />;
}
