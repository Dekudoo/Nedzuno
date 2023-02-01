import { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, userMention } from "discord.js";
import { errorEmbed } from "../../error.js";

export const spamChannels = new Array();

export const check = id => {
    let indicator = false;
    
    for(let channel of spamChannels) {
        if(id === channel) {
            indicator = true;
        }
    }

    return indicator;
}

export default {
    data: new SlashCommandBuilder()
        .setName("setspam")
        .setDescription("set your channel to spam channel")
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        const user = interaction.member;
        if(user.permissions.has([PermissionsBitField.Flags.ManageChannels]) && user.permissions.has([PermissionsBitField.Flags.ManageMessages])) {
            if(!check(interaction.channel.id)) {
                try {
                    const embed = new EmbedBuilder()
                        .setColor('#ffc0cb')
                        .setDescription(`Done! ${interaction.channel.name} now is spam channel`)
                    
                    await interaction.channel.setTopic("This channel is marked aka spam channel !")
                    .catch(err => console.error(err))
                    
                    spamChannels.push(interaction.channel.id);
                    
                    await interaction.reply({ embeds: [embed]})
                        .then(() => setTimeout(() => interaction.deleteReply(), 5000))
                        .catch(err => console.error(err))
                } catch(err) {
                    console.error(err)
                }
            } else {
                errorEmbed(false, interaction, "Channel is already spam channel", "Error!");
            }
        } else {
            errorEmbed(null, interaction, "Permissions error!", "You havent got enough permissions to use this command")
        }
    },
}