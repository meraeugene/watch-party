"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const commands = [
    new discord_js_1.SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Show your ticket info"),
    new discord_js_1.SlashCommandBuilder()
        .setName("remind")
        .setDescription("Send a countdown reminder"),
].map((cmd) => cmd.toJSON());
const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);
(async () => {
    try {
        console.log("🔄 Registering slash commands...");
        await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), { body: commands });
        console.log("✅ Slash commands registered.");
    }
    catch (err) {
        console.error("❌ Failed to register commands:", err);
    }
})();
