const { InteractionType } = require("discord.js")
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        let client = interaction.client;
        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;

            const command = client.commands.get(interaction.commandName).file
            if (command) {
                command.execute(client, interaction);
            } else {
                log(interaction.commandName + "does not exist in the commands folder")
            }

        }
    }
}