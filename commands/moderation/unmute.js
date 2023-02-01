import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("unmute choosen user")
        .addUserOption(option => option
            .setName("user")
            .setDescription("choose muted user and i'll unmute him")
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
            const member = interaction.options.getMember("user");
            
            const embed = new EmbedBuilder()
                .setColor('#ffc0cb')
                .setTitle("Done!")
                .setDescription(`${member} was unmuted.`)
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/300px-Sign-check-icon.png")
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            await member.timeout(1).catch(err => errorEmbed(err, interaction))
            .catch(err => console.error(err))
            
            await interaction.reply({ embeds: [embed] })
            .catch(err => errorEmbed(err, interaction))
        } catch(err) {
            errorEmbed(err, interaction);
        }
    },
}