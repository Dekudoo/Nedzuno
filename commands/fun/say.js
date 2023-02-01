import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("i'll say choosen phrase")
        .addStringOption(option => option
            .setName("phrase")
            .setDescription("choose a phrase that i need to say")
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
            const phrase = interaction.options.getString("phrase");
            
            const embed = new EmbedBuilder()
                .setColor('#ffc0cb')
                .setTitle("Done!")
                .setDescription(`I'll say this in one milisecond`)
                .setFooter({
                    text: `Sending from: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            await interaction.reply({ embeds: [embed] })
            .then(() => interaction.deleteReply())
            .catch(err => console.error(err))

            await interaction.channel.send(phrase.toString())
            .catch(err => console.error(err))
        } catch(err) {
            errorEmbed(err, interaction)
        }
    },
}