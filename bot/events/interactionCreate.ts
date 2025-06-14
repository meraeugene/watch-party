import { Interaction } from "discord.js";
import ticketCommand from "../commands/ticket";
import remindCommand from "../commands/remind";

export default async function interactionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ticket") {
    await ticketCommand(interaction);
  }

  if (interaction.commandName === "remind") {
    await remindCommand(interaction);
  }
}
