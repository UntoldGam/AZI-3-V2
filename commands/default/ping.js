const { SlashCommandBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription("a test")
module.exports = {
    data,
    async execute(client, interaction) {
        client.log(interaction.commandName + " has been run")
        interaction.reply({
            content: `${interaction.commandName} has been run`
        })
    }
}