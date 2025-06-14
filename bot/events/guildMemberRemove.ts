import { GuildMember, PartialGuildMember } from "discord.js";
import { supabase } from "../lib/client-supabase";

export default async function guildMemberRemove(
  member: GuildMember | PartialGuildMember
) {
  if (!member.guild || !member.user || !member.guild.id) return;
  if (member.guild.id !== process.env.DISCORD_GUILD_ID) return;

  const { data: tickets, error } = await supabase
    .from("watch_party_tickets")
    .select("*")
    .eq("guest_discord_id", member.user.id)
    .in("status", ["pending", "joined"]);

  if (error) {
    console.error("❌ Supabase error:", error.message);
    return;
  }

  const ticket = tickets?.[0];
  if (!ticket) return;

  const normalizedTextChannelName =
    `💞-${ticket.host_name}-${ticket.guest_name}`
      .toLowerCase()
      .replace(/\s+/g, "-");
  const voiceChannelName = `🎬 - ${ticket.movie_title}`;

  const textChannel = member.guild.channels.cache.find(
    (c) => c.name === normalizedTextChannelName
  );

  const voiceChannel = member.guild.channels.cache.find(
    (c) => c.name === voiceChannelName
  );

  if (textChannel) await textChannel.delete().catch(console.error);
  if (voiceChannel) await voiceChannel.delete().catch(console.error);

  await supabase
    .from("watch_party_tickets")
    .update({ status: "left" })
    .eq("id", ticket.id);

  console.log(`🗑️ Watch party channels deleted for guest: ${member.user.tag}`);
}
