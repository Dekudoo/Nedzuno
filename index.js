import { Client, Routes, REST, GatewayIntentBits } from "discord.js";
import mongoose from "mongoose";
import fs from "fs";

const token = "token";
const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds ] 
});

const commands = new Object();

for(let command of fs.readdirSync("./commands/general")) {
    commands[command.split(".js")[0]] = await import(`./commands/general/${command}`).then(data => data.default);
}

for(let command of fs.readdirSync("./commands/spam")) {
    commands[command.split(".js")[0]] = await import(`./commands/spam/${command}`).then(data => data.default);
}

for(let command of fs.readdirSync("./commands/economic")) {
    commands[command.split(".js")[0]] = await import(`./commands/economic/${command}`).then(data => data.default);
}

for(let command of fs.readdirSync("./commands/fun")) {
    commands[command.split(".js")[0]] = await import(`./commands/fun/${command}`).then(data => data.default);
}

for(let command of fs.readdirSync("./commands/moderation")) {
    commands[command.split(".js")[0]] = await import(`./commands/moderation/${command}`).then(data => data.default);
}

for(let command of fs.readdirSync("./commands/support")) {
    commands[command.split(".js")[0]] = await import(`./commands/support/${command}`).then(data => data.default);
}

client.on("ready", async (message) => {
    console.log(`Info | Logged as ${client.user.tag}`);
    client.user.setStatus("dnd");
    client.user.setActivity("разработке");

    const rest = new REST({ version: '10' }).setToken(token);

    await rest.put(Routes.applicationCommands(client.user.id), { body: Object.values(commands).map(command => command.data) })
    .then(() => console.log(`Info | Slash-commands was turned on`))
    .catch((err) => console.log(`Error | Slash-commands was turned off (${err})`));

    mongoose.set("strictQuery", false);

    await mongoose.connect("mongodb+srv://Playdayer:xD_haha@cluster0.9z53wc4.mongodb.net/?retryWrites=true&w=majority", {
        keepAlive: true
    })
    .then(() => console.log("Info | MongoDB has been connected"))
    .catch(err => console.error(err))
});

client.on("interactionCreate", async interaction => {
    if(interaction.isCommand()) return commands[interaction.commandName].exec(interaction, client);
})

process.on("unhandledRejection", err => console.log(err.toString()));
client.login(token);
