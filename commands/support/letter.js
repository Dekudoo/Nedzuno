import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { errorEmbed } from "../../error.js";
import { developer } from "../../developer.js";

export default {
    data: new SlashCommandBuilder()
        .setName("letter")
        .setDescription("send a letter to developer")
        .addStringOption(option => option
            .setName("message")
            .setDescription("what do you want send to developer?")
            .setMaxLength(1000)
            .setMinLength(30)
            .setRequired(true)
        )
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        const message = interaction.options.getString("message");

        try {
            (await client.users.fetch(developer.id)).send(`New message from ${interaction.member.user.tag} \n Message: ${message}`)
            .catch(err => console.error(err))
            await interaction.reply("Done!")
        } catch(err) {
            console.error(err)
        }
    },
}