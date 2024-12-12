import { REST, Routes } from "discord.js";
import {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    TEST_SERVER_ID
} from "../config/index.js";
import commands from "../commands/utility/index.js";

const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        const data = await rest.put(
            Routes.applicationGuildCommands(DISCORD_CLIENT_ID, TEST_SERVER_ID),
            { body: commands.map((command) => command.data.toJSON()) }
        );

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        console.error(error);
    }
})();
