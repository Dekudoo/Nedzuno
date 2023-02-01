import { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("bye")
        .setDescription("kick choosen user")
        .addUserOption(option => option
            .setName("user")
            .setDescription("choose user amd i'll kick him")
            .setRequired(true)
        )
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        const user = interaction.member;
        try {
            if(user.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                const member = interaction.options.getMember("user");

                const embed = new EmbedBuilder()
                    .setColor('#ffc0cb')
                    .setTitle("Done!")
                    .setDescription(`${member} was kicked.`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/300px-Sign-check-icon.png")
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })

                await member.kick()
                .then(async () => {
                    await interaction.reply({ embeds: [embed] })
                    .catch(err => errorEmbed(err, interaction))
                })
                .catch(err => errorEmbed(false, interaction, "Permissions error!", "I can't kick this user, because he is moderator"))
            } else {
                errorEmbed(false, interaction, "Permissions error!", "You haven't got enough permissions to use this command!")
            }
        } catch(err) {
            errorEmbed(err, interaction);
        }
    },
}