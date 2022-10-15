require("dotenv").config();
const { readdirSync } = require("node:fs")
const { REST, Routes } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.discordToken);

module.exports = (client) => {
    const commands = [];
    readdirSync("./commands").forEach((dir) => {
        const files = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (const file of files) {
            const command = require(`../commands/${dir}/${file}`);
            commands.push({
                name: command.data.name,
                description: command.data.description
            })
            client.commands.set(command.data.name, {
                name: command.data.name,
                description: command.data.description,
                file: command
            })
            //db.set(`/commands/${command.config.name}`, command.config)
        };
    });

    (async () => {
        try {
            client.log("Starting Slash Command Registering")
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands }
            );
            client.log('Slash Commands • Registered')
        } catch (error) {
            client.log(error);
        }
    })();

}