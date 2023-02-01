import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import model from "../../models.js";

export default {
    data: new SlashCommandBuilder()
        .setName("job")
        .setDescription("let you play game")
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        try {
            const embed = new EmbedBuilder()
                .setColor('#ffc0cb')
                .setTitle("Choose your job, and try to get coins!")
                .setDescription(`First of all you need to choose your job, but you need some coins for cool job, so now you need to choose some kind of poor job`)
                .setThumbnail("https://cdn3.emoji.gg/emojis/9445-blurple-staff.png")
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
            
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder("Select your job")
                        .addOptions(
                            {
                                label: "Programmer",
                                description: "Cost: 10000$. Salary: 100$ / hour",
                                value: "value-1",
                                emoji: {
                                    name: "💻"
                                }
                            },
                            {
                                label: "Engineer",
                                description: "Cost: 10000$. Salary: 100$ / hour",
                                value: "value-2",
                                emoji: {
                                    name: "🛠️"
                                }
                            },
                            {
                                label: "Architect",
                                description: "Cost: 9000$. Salary: 90$ / hour",
                                value: "value-3",
                                emoji: {
                                    name: "⚒️"
                                }
                            },
                            {
                                label: "Prostitute",
                                description: "Cost: 8000$. Salary: 80$ / hour",
                                value: "value-4",
                                emoji: {
                                    name: "🤡"
                                }
                            },
                            {
                                label: "Military",
                                description: "Cost: 8000$. Salary: 80$ / hour",
                                value: "value-5",
                                emoji: {
                                    name: "🎖️"
                                }
                            },
                            {
                                label: "Teacher",
                                description: "Cost: 7000$. Salary: 70$ / hour",
                                value: "value-6",
                                emoji: {
                                    name: "🎓"
                                }
                            },
                            {
                                label: "Trucker",
                                description: "Cost: 6000$. Salary: 60$ / hour",
                                value: "value-7",
                                emoji: {
                                    name: "🚛"
                                }
                            },
                            {
                                label: "Lawyer",
                                description: "Cost: 5000$. Salary: 50$ / hour",
                                value: "value-8",
                                emoji: {
                                    name: "💵"
                                }
                            },
                            {
                                label: "Astronaut",
                                description: "Cost: 4000$. Salary: 50$ / hour",
                                value: "value-9",
                                emoji: {
                                    name: "🚀"
                                }
                            },
                            {
                                label: "Loader",
                                description: "Cost: 800$. Salary: 40$ / hour",
                                value: "value-10",
                                emoji: {
                                    name: "📦"
                                }
                            },
                            {
                                label: "Сook",
                                description: "Cost: 500$. Salary: 30$ / hour",
                                value: "value-11",
                                emoji: {
                                    name: "👨‍🍳"
                                }
                            },
                            {
                                label: "Miner",
                                description: "Cost: 300$. Salary: 20$ / hour",
                                value: "value-12",
                                emoji: {
                                    name: "⛏️"
                                }
                            },
                            {
                                label: "Psychologist",
                                description: "Cost: 10$. Salary: 5$ / hour",
                                value: "value-13",
                                emoji: {
                                    name: "🎭"
                                }
                            },
                            {
                                label: "Student",
                                description: "Cost: 10$. Salary: 5$ / hour",
                                value: "value-14",
                                emoji: {
                                    name: "👨‍🎓"
                                }
                            },
                            {
                                label: "Builder",
                                description: "Cost: 10$. Salary: 5$ / hour",
                                value: "value-15",
                                emoji: {
                                    name: "👷‍♂️"
                                }
                            },
                        )
                );

            await interaction.reply({ embeds: [embed], components: [row]})
            .catch(err => console.error(err))

            client.on("interactionCreate", async inter => {
                if(!inter.isStringSelectMenu()) return;

                const mongoAdd = async (jobToAdd, cost) => {
                    let data = await model.findOne({ user: inter.member.user.id });
                    let balance;

                    if(data) {
                        model.findOneAndUpdate(
                            {
                                user: inter.member.user.id
                            },
                            {
                                balance: 10
                            }
                        )
                        data = await model.findOne({ user: inter.member.user.id });
                        balance = data.balance;
                    } else {
                        await new model({
                            user: inter.member.user.id,
                            username: inter.member.user.tag,
                            job: "Builder",
                            balance: 10,
                            time: 3600000
                        }).save().then(() => {
                            data = model.findOne({ user: inter.member.user.id });
                            balance = 10;
                        }).catch(err => console.error(err))
                    }
                    

                    if(balance < cost || isNaN(balance)) {
                        const embed = errorEmbed(false, inter, "You haven't got enough coins!", `${inter.member}, please choose more cheaper job, or use \`/work\` to get coins!`);
                        await inter.reply({ embeds: [embed]})
                        .catch(err => console.error(err))
                    } else {
                        const embed = new EmbedBuilder()
                            .setColor('#ffc0cb')
                            .setTitle(`Done, ${inter.member.user.username}! Your job is ${jobToAdd} now!`)
                            .setDescription(`You can use \`/work\` every hour to get your coins and buy other kind of jobs!`)
                            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
                            .setFooter({
                                text: `Requested by: ${interaction.user.tag}`,
                                iconURL: interaction.user.displayAvatarURL(),
                            })

                        await model.findOneAndUpdate(
                            {
                                user: inter.member.user.id
                            },
                            {
                                job: jobToAdd
                            }
                        )
                        .then(() => inter.reply)
                        .catch(err => console.error(err));

                        await model.findOneAndUpdate(
                            {
                                user: inter.member.user.id
                            },
                            {
                                balance: balance - cost
                            }
                        )
                        .catch(err => console.error(err))

                        await inter.reply({ embeds: [embed]})
                        .then(() => setTimeout(() => {
                            try {
                                inter.deleteReply()
                            } catch(err) { console.error(err)}
                        }, 10000))
                        .catch(err => console.error(err))
                    }
                }

                const selected = inter.values[0];

                switch(selected) {
                    case "value-1":
                        mongoAdd("Programmer", 10000);
                        break;

                    case "value-2":
                        mongoAdd("Engineer", 10000);
                        break;

                    case "value-3":
                        mongoAdd("Architect", 9000);
                        break;

                    case "value-4":
                        mongoAdd("Prostitute", 8000);
                        break;

                    case "value-5":
                        mongoAdd("Military", 8000);
                        break;
                    
                    case "value-6":
                        mongoAdd("Teacher", 7000);
                        break;
                    
                    case "value-7":
                        mongoAdd("Trucker", 6000);
                        break;

                    case "value-8":
                        mongoAdd("Lawyer", 5000);
                        break;

                    case "value-9":
                        mongoAdd("Astronaut", 4000);
                        break;

                    case "value-10":
                        mongoAdd("Loader", 800);
                        break;

                    case "value-11":
                        mongoAdd("Cook", 500);
                        break;

                    case "value-12":
                        mongoAdd("Miner", 300);
                        break;

                    case "value-13":
                        mongoAdd("Psychologist", 10);
                        break;

                    case "value-14":
                        mongoAdd("Student", 10);
                        break;
                     
                    case "value-15":
                        mongoAdd("Builder", 10);
                        break;
                }

                setTimeout(() => {
                    interaction.deleteReply();
                }, 4000);
            })

        } catch(err) {
            try {
                errorEmbed(err, interaction) 
            } catch(err) { console.error(err)}
        }
    },
}