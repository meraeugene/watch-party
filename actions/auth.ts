"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error getting user:", error.message);
    return null;
  }

  const user = data.user;
  const discordId = user.identities?.[0]?.id || null;
  const avatar = user.user_metadata?.avatar_url || null;
  const username = user.user_metadata?.full_name || null;
  const tag = user.user_metadata?.name || null;

  return {
    id: user.id,
    discordId,
    email: user.email,
    username,
    tag,
    avatar,
  };
};

export const signOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error.message);
    return;
  }

  revalidatePath("/", "layout");

  redirect("/");
};
