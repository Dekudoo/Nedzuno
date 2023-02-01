import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("mute choosen user")
        .addUserOption(option => option
            .setName("user")
            .setDescription("choose a user and i'll mute him")
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName("minutes")
            .setDescription("choose time to mute this user")
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
            const minutes = interaction.options.getNumber("minutes");
            
            const embed = new EmbedBuilder()
                .setColor('#ffc0cb')
                .setTitle("Done!")
                .setDescription(`${member} was muted for \`${minutes}\` minutes.`)
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/300px-Sign-check-icon.png")
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            await member.timeout(minutes * 60000).catch(err => errorEmbed(err, interaction))
            .catch(err => console.error(err))
            
            await interaction.reply({ embeds: [embed] })
            .catch(err => errorEmbed(err, interaction))
        } catch(err) {
            errorEmbed(err, interaction);
        }
    },
}