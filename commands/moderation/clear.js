import { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("you can delete some messages in your chat")
        .addNumberOption(option => option
            .setName("amount")
            .setDescription("choose amount of messages to be deleted")
            .setMaxValue(100)
            .setMinValue(1)
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
            const amount = interaction.options.getNumber("amount");
            const user = interaction.member;
            
            if(user.permissions.has([PermissionsBitField.Flags.ManageMessages])) {
                const embed = new EmbedBuilder()
                    .setColor('#ffc0cb')
                    .setTitle("Done!")
                    .setDescription(`Deleted \`${amount}\` messages \n Thanks for using me!`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
            
                await interaction.channel.bulkDelete(amount, true)
                .then(async () => {
                    await interaction.reply({ embeds: [embed]})
                    .then(() => {
                        setTimeout(async() => {
                            try {
                                await interaction.deleteReply()
                                .catch(err => console.error(err))
                            } catch(err) { console.error(err) }
                        }, 5000)
                    })
                    .catch(err => console.error(err))
                })
                .catch(err => errorEmbed(err, interaction))
            } else {
                errorEmbed(null, interaction, "Permissions error!", "You havent got enough permissions to use this command")
            }
        } catch(err) {
            errorEmbed(err, interaction)
        }
    },
}