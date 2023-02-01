import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { errorEmbed } from "../../error.js";
import { check } from "./setspam.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping a choosen user with choosen amount")
        .addUserOption(option => option
            .setName("user")
            .setDescription("choose user to ping")
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName("amount")
            .setDescription("choose ping-amount")
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
                const member = interaction.options.getMember("user");
                const amount = interaction.options.getNumber("amount");
                
                const embed = new EmbedBuilder()
                        .setColor('#ffc0cb')
                        .setDescription(`Starting ping ${member}, I'll ping ${member} ${amount} times`)
    
                await interaction.reply({ embeds: [embed]})
                .then(() => {
                    for(let i = 0; i < amount; i++) {
                        interaction.channel.send(`Woke up, ${member}!!`)
                    }
                })
                .catch(err => errorEmbed(err, interaction))
            } catch(err) {
                errorEmbed(err, interaction);
            }
        } else {
            errorEmbed(false, interaction, "Channel is not spam channel", "Please, use `/setspam` to set this channel to spam channel and use this type of commands")
        }
    },
}