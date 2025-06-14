"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
require("./register-commands");
const guildMemberAdd_1 = __importDefault(require("./events/guildMemberAdd"));
const interactionCreate_1 = __importDefault(require("./events/interactionCreate"));
const guildMemberRemove_1 = __importDefault(require("./events/guildMemberRemove"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
client.once("ready", () => {
    console.log(`🤖 Bot is ready as ${client.user?.tag}`);
});
client.on("guildMemberAdd", (member) => (0, guildMemberAdd_1.default)(member, client));
client.on("guildMemberRemove", (member) => (0, guildMemberRemove_1.default)(member));
client.on("interactionCreate", (interaction) => (0, interactionCreate_1.default)(interaction));
client.login(process.env.DISCORD_BOT_TOKEN);
