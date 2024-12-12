import { Client, Events, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN } from "./config/index.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  console.log("Client is: ", readyClient.user);
});

client.login(DISCORD_TOKEN);
