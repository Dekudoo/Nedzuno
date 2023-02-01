import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
export default {
    data: new SlashCommandBuilder()
        .setName("who")
        .setDescription("choose a random user for your phrase")
        .addStringOption(option => option
            .setName("phrase")
            .setDescription("who what?")
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
            const phrase = interaction.options.getString("phrase");
            const members = await interaction.guild.members.fetch();
    
            const random = (number) => Math.floor(Math.random() * number);
    
            const randMember = members.at(random(members.size - 1));
            
            await interaction.reply({ embeds: [new EmbedBuilder()
                .setColor('#ffc0cb')
                .setTitle(`${randMember.user.username}!!`)
                .setDescription(`${randMember} ${phrase}`)]
            })
            .catch(err => console.error(err))
        } catch(err) {
            errorEmbed(err, interaction)
        }
    },
}