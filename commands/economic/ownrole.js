import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import model from "../../models.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ownrole")
        .setDescription("you can make your own role!")
        .addStringOption(option => option
            .setName("name")
            .setDescription("enter name for your role")
            .setRequired(true)    
        )
        .addStringOption(option => option
            .setName("color")
            .setDescription("enter your code color. for example: #1a1a1a. you can get it by google: `HTML color code`")
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
            const data = await model.findOne({ user: interaction.member.user.id })
            const name = interaction.options.getString("name");
            const color = interaction.options.getString("color");
            const roleBool = data.roleBool;
            
            if(data) {
                if(roleBool) {
                    if(data.job == "Programmer" || data.job == "Engineer" && data.balance >= 5000) {
                        await interaction.guild.roles.create({
                            name: name,
                            color: color
                        })
                        .catch(err => errorEmbed(false, interaction, "Error!", "Try to use another color"))
    
                        const roles = interaction.guild.roles.cache;
                        const role = roles.find(role => role.name === name);
    
                        await interaction.member.roles.add(role);
    
                        await model.findOneAndUpdate(
                            {
                                user: interaction.member.user.id
                            },
                            {
                                balance: data.balance - 5000
                            }
                        )
    
                        await model.findOneAndUpdate(
                            {
                                user: interaction.member.user.id
                            },
                            {
                                roleBool: false
                            }
                        )
    
                        const embed = new EmbedBuilder()
                        .setColor('#ffc0cb')
                        .setTitle("My congrutulations! You did it!")
                        .setDescription(`${interaction.member}, you've been created a \`${role.name}\` role! `)
                        .setThumbnail("https://em-content.zobj.net/source/skype/289/party-popper_1f389.png")
                        .setFooter({
                            text: `New role created by: ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                    
                        await interaction.reply({ embeds: [embed] })
                        .catch(err => console.error(err)) 
                    } else {
                        errorEmbed(false, interaction, "Error!", "You need some of high job or balace: `Programmer` or `Engineer` + `5000 coins` required")
                    }
                } else {
                    errorEmbed(false, interaction, "Error!", "You already used this command! You can use it only `1` times.")
                }
            } else {
                errorEmbed(false, interaction, "I can't find you!", `I can't find you in database. Please, use \`/job\` and choose some kind of job to register you and your job in database! \n
                Also you can use \`/avaible\` to check, what jobs are avaible for you now.`)
            }
        } catch(err) { console.error(err) }
    },
}