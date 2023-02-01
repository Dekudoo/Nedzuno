import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { errorEmbed } from "../../error.js";
import { helper } from "../../helper.js";

export default {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("shows full bot guide")
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        try {
            let category;
            const startEmbed = new EmbedBuilder()
                .setTitle("Full Nedzuno guide")
                .setDescription("Choose language and select the category of the bot below that you want to know about, and we will send you a complete guide about this category")
                .setThumbnail("https://images.emojiterra.com/twitter/512px/1f6e1.png")
                .setFooter({
                    text: `Requested by: ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL(),
                })
            
            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder("Select bot category")
                        .addOptions(
                            {
                                label: "All",
                                description: "All commands",
                                value: "all",
                                emoji: {
                                    name: "📋"
                                }
                            },
                            {
                                label: "General",
                                description: "General commands category",
                                value: "value-1",
                                emoji: {
                                    name: "💬"
                                }
                            },
                            {
                                label: "Moderation",
                                description: "Moderation commands category",
                                value: "value-2",
                                emoji: {
                                    name: "🛠️"
                                }
                            },
                            {
                                label: "Economic",
                                description: "Economic commands category",
                                value: "value-3",
                                emoji: {
                                    name: "💸"
                                }
                            },
                            {
                                label: "Fun",
                                description: "Fun commands category",
                                value: "value-4",
                                emoji: {
                                    name: "😎"
                                }
                            },
                            {
                                label: "Spam",
                                description: "Spam commands category",
                                value: "value-5",
                                emoji: {
                                    name: "⚠️"
                                }
                            },
                            {
                                label: "Support",
                                description: "Support commands category",
                                value: "value-6",
                                emoji: {
                                    name: "🛡️"
                                }
                            }
                        )
                );

            const rowButton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('england')
					.setEmoji("🏴󠁧󠁢󠁥󠁮󠁧󠁿")
					.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('russia')
					.setEmoji("🇷🇺")
					.setStyle(ButtonStyle.Primary),
			);

            interaction.reply({ embeds: [startEmbed], components: [row]});

            client.on("interactionCreate", async inter => {
                if(!inter.isStringSelectMenu()) return;
                const menu = inter.values[0];

                switch(menu) {
                    case "value-1":
                        category = "general";
                        break;
                    case "value-2":
                        category = "moderation";
                        break;
                    case "value-3":
                        category = "economic";
                        break;
                    case "value-4":
                        category = "fun";
                        break;
                    case "value-5":
                        category = "spam";
                        break;
                    case "value-6":
                        category = "support";
                        break;
                    case "all":
                        category = "all";
                        break;
                }
                
                await interaction.deleteReply()
                .catch(err => console.error(err))
                await inter.reply({ content: "Now select the language", components: [rowButton]})
                .then(() => {
                    setTimeout(() => {
                        inter.deleteReply();
                    }, 10000)
                })
                .catch(err => console.error(err))
            })

            client.on("interactionCreate", async inter => {
                if(!inter.isButton() || !category) return;

                const selected = inter.customId;

                switch(selected) {
                    case "england":
                        helper(false, true, interaction, category, inter.member);
                        break;
                    case "russia":
                        helper(true, false, interaction, category, inter.member);
                        break;
                }

                await inter.reply("Done!")
                .catch(err => console.error(err))
                .then(() => {
                    setTimeout(() => {
                        inter.deleteReply();
                    }, 10000)
                })

            })
        } catch(err) {
            console.error(err)
        }
    },
}