"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ticketCommand;
const discord_js_1 = require("discord.js");
const client_supabase_1 = require("../lib/client-supabase");
async function ticketCommand(interaction) {
    const { data: tickets, error } = await client_supabase_1.supabase
        .from("watch_party_tickets")
        .select("*")
        .or(`guest_discord_id.eq.${interaction.user.id},host_discord_id.eq.${interaction.user.id}`);
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
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`🎫 Movie Ticket`)
        .setImage(usedTicket.ticket_url)
        .setColor("Green");
    return interaction.reply({ embeds: [embed], ephemeral: true });
}
