import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import { check } from "./setspam.js";

export default {
    data: new SlashCommandBuilder()
        .setName("spam")
        .setDescription("send a choosen message with choosen amount")
        .addStringOption(option => option
            .setName("message")
            .setDescription("enter message to spam")
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName("amount")
            .setDescription("choose amount")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        )
        .toJSON()
    ,
    /**
    *@param { import('discord.js').Interaction } interaction
    *@param { import('discord.js').Client } client
    */
    exec: async (interaction, client) => {
        if(check(interaction.channel.id)) {
            try {
                const message = interaction.options.getString("message");
                const amount = interaction.options.getNumber("amount");
                
                const embed = new EmbedBuilder()
                        .setColor('#ffc0cb')
                        .setDescription(`Okay! I'll send this message ${amount} times!`)
    
                await interaction.reply({ embeds: [embed]})
                .then(async () => {
                    for(let i = 0; i < amount; i++) {
                        await interaction.channel.send(`${message}`)
                        .catch(err => console.error(err))
                    }
                })
                .catch(err => console.error(err))
            } catch(err) {
                console.error(err)
            }
        } else {
            errorEmbed(false, interaction, "Channel is not spam channel", "Please, use `/setspam` to set this channel to spam channel and use this type of commands")
        }
    },
}