import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("ball")
        .setDescription("i'll answer your question")
        .addStringOption(option => option
            .setName("question")
            .setDescription("ask your question, and i'll give you answer")
            .setRequired(true)  
        )
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        try {
            const answers = ["Naturally yes", "Exactly", "Why you ask me this?!", "NOOOOOOOOO", "No, you should not", "I am only a discord bot", "Yes, do it!", "bruh", "you are just a discord member", "Yes, of course", "NO, WHY YOU THINKING ABIUT THAT", "BRUH"]

            const random = (n) => Math.floor(Math.random() * n);

            await interaction.reply(answers[random(answers.length)])
            .catch(err => console.error(err))

            await interaction.channel.send(phrase.toString())
            .catch(err => console.error(err))
        } catch(err) {
            errorEmbed(err, interaction)
        }
    },
}