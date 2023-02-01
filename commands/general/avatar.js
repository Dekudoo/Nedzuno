import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("shows your's / choosen user's avatar")
        .addUserOption(option => option
            .setName("user")
            .setDescription("choose a user and we will show his avatar")    
        )
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        try {
            const Response = new EmbedBuilder()
            .setColor('#ffc0cb')
            .setFooter({
                text: `Requested By: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            
            if(!interaction.options.getMember("user")) {
                Response.setImage(`${interaction.user.displayAvatarURL()}?size=300`);
                Response.setAuthor({ name: `${interaction.user.username}'s avatar` })
                await interaction.reply({embeds: [Response]})
                .catch(err => errorEmbed(err, interaction)) 
            } else {
                const member = interaction.options.getMember("user");
                Response.setImage(`${member.displayAvatarURL()}?size=300`);
                Response.setAuthor({ name: `${member.user.username}'s avatar` })
                await interaction.reply({embeds: [Response]})
                .catch(err => console.error(err))
            }
        } catch(err) {
            errorEmbed(err, interaction);
        }
    },
}