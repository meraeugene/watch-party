import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { supabase } from "../lib/client-supabase";

export default async function ticketCommand(
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

  const embed = new EmbedBuilder()
    .setTitle(`🎫 Movie Ticket`)
    .setImage(usedTicket.ticket_url)
    .setColor("Green");

  return interaction.reply({ embeds: [embed], ephemeral: true });
}
