import { Collection, Events, MessageFlags } from "discord.js";

const execute = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    const { cooldowns } = interaction.client;
    if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }
    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount =
        (command.cooldown ?? defaultCooldownDuration) * 1_000;

    if (timestamps.has(interaction.user.id)) {
        const expirationTime =
            timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1_000);
            return interaction.reply({
                content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
                flags: MessageFlags.Ephemeral
            });
        }
    }

    try {
        await command.execute(interaction);
        timestamps.set(interaction.user.id, now);
        setTimeout(
            () => timestamps.delete(interaction.user.id),
            cooldownAmount
        );
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                flags: MessageFlags.Ephemeral
            });
        } else {
            await interaction.reply({
                content: "There was an error while executing this command!",
                flags: MessageFlags.Ephemeral
            });
        }
    }
};

const interactionCreate = {
    name: Events.InteractionCreate,
    execute
};

export default interactionCreate;
