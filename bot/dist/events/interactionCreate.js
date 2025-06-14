"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = interactionCreate;
const ticket_1 = __importDefault(require("../commands/ticket"));
const remind_1 = __importDefault(require("../commands/remind"));
async function interactionCreate(interaction) {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === "ticket") {
        await (0, ticket_1.default)(interaction);
    }
    if (interaction.commandName === "remind") {
        await (0, remind_1.default)(interaction);
    }
}
