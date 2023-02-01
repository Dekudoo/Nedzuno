import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import model from "../../models.js";

export default {
    data: new SlashCommandBuilder()
        .setName("worktime")
        .setDescription("shows the time remaining before you can use /work")
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        try {
            const data = await model.findOne({ user: interaction.member.user.id })
            
            if(data) {
                const time = data.time;

                const embed = new EmbedBuilder()
                    .setColor('#ffc0cb')
                    .setTitle("I've checked database!")
                    .setDescription(`You can work in \`${Math.round(time / 60 / 1000)}\` minutes!\n
                    If your time is not changed, maybe you get some but. Use \`/work\` again, and it should work.`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                
                await interaction.reply({ embeds: [embed] })
                .then(() => {setTimeout(() => interaction.deleteReply(), 10000)})
                .catch(err => console.error(err))
            } else {
                errorEmbed(false, interaction, "I can't find you!", `I can't find you in database. Please, use \`/job\` and choose some kind of job to register you and your job in database! \n
                Also you can use \`/avaible\` to check, what jobs are avaible for you now.`)
            }
        } catch(err) { console.error(err) }
    },
}