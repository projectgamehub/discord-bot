import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.");

const execute = async (interaction) => {
    await interaction.reply(
        `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    );
};

const user = { data, execute };

export default user;
