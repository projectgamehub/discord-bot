import { Client, GatewayIntentBits, Collection } from "discord.js";
import { DISCORD_TOKEN } from "./config/index.js";
import setCommands from "./utils/setCommands.js";
import setEvents from "./utils/setEvents.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

setCommands(client);
setEvents(client);

client.login(DISCORD_TOKEN);
