"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remindCommand;
const discord_js_1 = require("discord.js");
const luxon_1 = require("luxon");
const client_supabase_1 = require("../lib/client-supabase");
async function remindCommand(interaction) {
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
    const movieDateTime = luxon_1.DateTime.fromFormat(`${usedTicket.date} ${usedTicket.time}`, "yyyy-MM-dd h:mm a", { zone: "Asia/Manila" });
    const now = luxon_1.DateTime.now().setZone("Asia/Manila");
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
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("🔔 Movie Reminder")
        .setDescription(`**Date:** ${usedTicket.date}\n**Time:** ${usedTicket.time}\n\n⏳ **Time left:** ${countdown}`)
        .setColor("Orange");
    return interaction.reply({ embeds: [embed], ephemeral: true });
}
