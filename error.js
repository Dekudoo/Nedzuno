import { EmbedBuilder } from "discord.js";

export const errorEmbed = async (err, interaction, title, text) => {
    try {
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle(title || "Bruh, we have some error here!!")
                .setDescription(text || `Error! Try to use command again! \n\nError code: \n\n \`${err}\``)
                .setThumbnail("https://cdn.pixabay.com/photo/2015/06/09/16/12/error-803716_960_720.png")
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
            ]
        })
        .then(() => setTimeout(() =>  interaction.deleteReply(), 15000))
        .catch(err => console.error(err));
    } catch(err) {
        console.error(err);
    }
}