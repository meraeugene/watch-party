import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import "./register-commands";
import guildMemberAdd from "./events/guildMemberAdd";
import interactionCreate from "./events/interactionCreate";
import guildMemberRemove from "./events/guildMemberRemove";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Bot is ready as ${client.user?.tag}`);
});

client.on("guildMemberAdd", (member) => guildMemberAdd(member, client));
client.on("guildMemberRemove", (member) => guildMemberRemove(member));
client.on("interactionCreate", (interaction) => interactionCreate(interaction));

client.login(process.env.DISCORD_BOT_TOKEN);
