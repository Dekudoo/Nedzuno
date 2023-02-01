import { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("you can dm someone with bot")
        .addUserOption(option => option
            .setName("user")
            .setDescription("choose a member to dm for")
            .setRequired(true)    
        )
        .addStringOption(option => option
            .setName("content")
            .setDescription("what's message do you want to send?")
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
            const message = interaction.options.getString("content");

            const embed = new EmbedBuilder()
                .setColor('#ffc0cb')
                .setTitle("Message for you!")
                .setDescription(`**${message}**`)
                .setFooter({
                    text: `Sending from: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })

            await member.send({ embeds: [embed]})
            .then(() => interaction.reply({ embeds: [new EmbedBuilder()
                .setColor('#ffc0cb')
                .setTitle("Done!")
                .setDescription(`Message was sending`)
                .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
            ]
            })
            .then(() => setTimeout(() => interaction.deleteReply(), 3000))
            .catch(err => errorEmbed(err, interaction)))
            .catch(err => errorEmbed(err, interaction))
        } catch(err) {
            errorEmbed(err, interaction) 
        }
    },
}