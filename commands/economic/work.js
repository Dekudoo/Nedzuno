import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import model from "../../models.js";
import { jobs } from "../../jobs.js";

export default {
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("you can get coins one time in hour")
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        try {
            const data = await model.findOne({ user: interaction.member.user.id });

            const updateTimeAndIndicator = async (timer=3600000) => {
                let time = timer;
                const timeInterval = setInterval(() => {
                    if(time !== 0) {
                        time -= 1000;
                    } else {
                        clearInterval(timeInterval);
                    }
                }, 1000)

                const interval = setInterval(async () => {
                    await model.findOneAndUpdate(
                        {
                            user: interaction.member.user.id
                        },
                        {
                            time: time
                        }
                    )
                }, 1000)
                
                setTimeout(async () => {
                    await model.findOneAndUpdate(
                        {
                            user: interaction.member.user.id
                        },
                        {
                            indicator: true
                        }
                    ).then(() => clearInterval(interval))
                }, time)
            }
            
            if(data) {
                let balance = data.balance;
                const indicator = data.indicator;
                const job = data.job;

                const getJob = () => {
                    let res;
                    for(let jobb in jobs) {
                        if(jobb === job) {
                            res = jobb;
                        }
                    }
                    return jobs[res];
                }

                if(indicator) {
                    await model.findOneAndUpdate(
                        {
                            user: interaction.member.user.id
                        },
                        {
                            balance: balance + getJob(),
                            indicator: false
                        }
                    )
                    .catch(err => errorEmbed(err, interaction))

                    const embed = new EmbedBuilder()
                    .setColor('#ffc0cb')
                    .setTitle("Good job!")
                    .setDescription(`You has worked very hard, and you earn some coins.Your balance is ${!isNaN(balance) ? balance + getJob() : balance} coins!`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    })

                    await interaction.reply({ embeds: [embed] })
                    .catch(err => console.error(err))
                    .then(() => {
                        setTimeout(() => interaction.deleteReply(), 10000);
                        data.time === 3600000 ? updateTimeAndIndicator() : data.time
                    })
                    .catch(err => console.error(err))
                } else {
                    await errorEmbed(false, interaction, "Time is not ended", `You need to wait a little more.  \n Namely: \`${Math.round(data.time / 60 / 1000)}\` minutes`)
                    .then(() => {
                        data.time < 3600000 && !data.indicator ? updateTimeAndIndicator(data.time) : data.time
                    })
                }
            } else {
                errorEmbed(false, interaction, "I can't find you!", `I can't find you in database. Please, use \`/job\` and choose some kind of job to register you and your job in database! \n
                Also you can use \`/avaible\` to check, what jobs are avaible for you now.`)
            }
        } catch(err) { console.error(err) }
    },
}