import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { DateTime } from "luxon";
import { supabase } from "../lib/client-supabase";

export default async function remindCommand(
  interaction: ChatInputCommandInteraction
) {
  const { data: tickets, error } = await supabase
    .from("watch_party_tickets")
    .select("*")
    .or(
      `guest_discord_id.eq.${interaction.user.id},host_discord_id.eq.${interaction.user.id}`
    );

  if (error) {
    console.error("❌ Supabase error:", error.message);
    return interaction.reply({
      content: "❌ Something went wrong fetching your ticket.",
      ephemeral: true,
    });
  }

  const usedTicket = tickets?.[0];

  if (!usedTicket) {
    return interaction.reply({
      content: "❌ No ticket found.",
      ephemeral: true,
    });
  }

  const movieDateTime = DateTime.fromFormat(
    `${usedTicket.date} ${usedTicket.time}`,
    "yyyy-MM-dd h:mm a",
    { zone: "Asia/Manila" }
  );

  const now = DateTime.now().setZone("Asia/Manila");
  const msUntilMovie = movieDateTime.toMillis() - now.toMillis();

  if (msUntilMovie <= 0) {
    return interaction.reply({
      content: "⚠️ The movie has already started!",
      ephemeral: true,
    });
  }

  const hours = Math.floor(msUntilMovie / 3600000);
  const minutes = Math.floor((msUntilMovie % 3600000) / 60000);

  const countdown = `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;

  const embed = new EmbedBuilder()
    .setTitle("🔔 Movie Reminder")
    .setDescription(
      `**Date:** ${usedTicket.date}\n**Time:** ${usedTicket.time}\n\n⏳ **Time left:** ${countdown}`
    )
    .setColor("Orange");

  return interaction.reply({ embeds: [embed], ephemeral: true });
}
