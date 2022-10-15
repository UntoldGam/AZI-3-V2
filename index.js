require("dotenv").config();

const express = require('express');
const app = express();

const listener = app.listen(process.env.PORT, () => {
    log('Your app is currently listening on port: ' + listener.address().port);
});

app.get('/', (req, res) => {
    res.send('AZI-3 V2 is Online');
});

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { discordToken } = process.env;
const moment = require("moment");
const { readdirSync } = require("node:fs")
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});
client.commands = new Collection();

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
client.log = log

function functions() {
    let handlers_loaded = false
    let functions_loaded = false
    /*
        .then(() => {
        handlers_loaded = true
    });
    */
    readdirSync('./functions').forEach((module) => {
        require(`./functions/${module}`)(client)
    }).then(() => {
        functions_loaded = true
    });
    //handlers_loaded == true && 
    let result = functions_loaded == true ? true : false
    return result
} 

function init() {
    const p = new Promise((resolve, reject) => [
         resolve(functions)
    ])

    return p
}

client.once('ready', () => {
    log("Bot is ready.")
    init().then(() => {
        log("Handlers and Functions have been loaded.")
        require("./handlers/commandUpload.js")(client)
    }).catch((error) => {
        log(`There was an error while loading the handlers and functions: ${error}`)
    } )
    
});

readdirSync('./discordEvents').forEach((eventFile) => {
    const event = require(`./discordEvents/${eventFile}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(discordToken).then(() => {
    log("Bot has been logged in.")
})