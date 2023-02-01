import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import model from "../../models.js";
import { developer } from "../../developer.js";

export default {
    data: new SlashCommandBuilder()
        .setName("give")
        .setDescription("you can give some coins")
        .addUserOption(option => option
            .setName("user")
            .setDescription("choose a user to give coins")
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName("amount")
            .setDescription("choose amount of coins to give")
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
            const memberData = await model.findOne({ user: interaction.member.user.id });
            const userData = await model.findOne({ user: interaction.options.getMember("user").user.id })
            const user = interaction.options.getMember("user");
            const amount = interaction.options.getNumber("amount");
            const member = interaction.member;
            
            if(memberData && userData) {
                const memberBalance = memberData.balance;
                const userBalance = userData.balance;
                if(memberBalance >= amount) {
                    if(interaction.member.user.id !== developer.id) {
                        await model.findOneAndUpdate(
                            {
                                user: member.user.id
                            },
                            {
                                balance: memberBalance - amount
                            }
                        )
                    }
    
                    await model.findOneAndUpdate(
                        {
                            user: user.user.id
                        },
                        {
                            balance: userBalance + amount
                        }
                    )
    
                    const embed = new EmbedBuilder()
                        .setColor('#ffc0cb')
                        .setTitle("Done!")
                        .setDescription(`${user}, you was giving a ${amount} coins. ${member} send you this!`)
                        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/100px-Sign-check-icon.png")
                        .setFooter({
                            text: `Requested by: ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                    
                    await interaction.reply({ embeds: [embed] })
                    .catch(err => console.error(err))
                } else {
                    errorEmbed(false, interaction, "You havent got enough coins!", "You haven't got enough coins. Use \`/work\` to get some!")
                }
            } else {
                errorEmbed(false, interaction, "I can't find someone!", `I can't find you or ${user} in database. Please, use \`/job\` and choose some kind of job to register you and your job in database! \n
                Also you can use \`/avaible\` to check, what jobs are avaible for you now.`)
            }
        } catch(err) { console.error(err) }
    },
}