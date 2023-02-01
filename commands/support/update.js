import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { errorEmbed } from "../../error.js";
import { developer } from "../../developer.js";

export default {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("ask me to update the bot if you want it")
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        const message = interaction.options.getString("message");

        try {
            (await client.users.fetch(developer.id)).send(`New update-vote from ${interaction.member.user.tag}`)
            .catch(err => console.error(err))
            await interaction.reply("Done!")
        } catch(err) {
            console.error(err)
        }
    },
}