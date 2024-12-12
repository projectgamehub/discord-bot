import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command.")
    .addStringOption((option) =>
        option
            .setName("command")
            .setDescription("The command to reload.")
            .setRequired(true)
    );

const execute = async (interaction) => {
    const commandName = interaction.options
        .getString("command", true)
        .toLowerCase();
    const command = interaction.client.commands.get(commandName);

    if (!command) {
        return interaction.reply(
            `There is no command with name \`${commandName}\`!`
        );
    }

    try {
        const commandPath = `./${command.data.name}.js`;
        const { default: newCommand } = await import(
            `${commandPath}?update=${Date.now()}`
        );
        interaction.client.commands.set(newCommand.data.name, newCommand);
        await interaction.reply(
            `Command \`${newCommand.data.name}\` was reloaded!`
        );
    } catch (error) {
        console.error(error);
        await interaction.reply(
            `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
        );
    }
};

const reload = { data, execute };

export default reload;
