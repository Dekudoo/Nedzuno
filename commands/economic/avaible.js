import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import { jobsPrice } from "../../jobs.js";
import model from "../../models.js";

export default {
    data: new SlashCommandBuilder()
        .setName("avaible")
        .setDescription("shows jobs, what avaible for you")
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
                const balance = data.balance;

                const avaibleJobs = () => {
                    let res = new Array();

                    for(let job in jobsPrice) jobsPrice[job] <= balance ? res.push(`\`${job}\``) : job

                    return res.join(',');
                }

                const embed = new EmbedBuilder()
                    .setColor('#ffc0cb')
                    .setTitle("I've checked database!")
                    .setDescription(`Avaible jobs for you:
                        ${avaibleJobs()}
                    `)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                
                await interaction.reply({ embeds: [embed] })
                .then(() => setTimeout(() => interaction.deleteReply(), 10000))
                .catch(err => console.error(err))
            } else {
                const embed = new EmbedBuilder()
                    .setColor('#ffc0cb')
                    .setTitle("I've checked database!")
                    .setDescription(`Avaible jobs for you: \`Psychologist\`, \`Student\`, \`Builder\`,`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                
                await interaction.reply({ embeds: [embed] })
                .then(() => setTimeout(() => interaction.deleteReply(), 10000))
                .catch(err => console.error(err))
            }
        } catch(err) { console.error(err) }
    },
}