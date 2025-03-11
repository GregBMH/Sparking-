const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log('Ready on Bot');
});

const fs = require('node:fs');
const path = require('node:path');

client.commands = new Collection();

const foldersPath = path.join(__dirname,'src', 'commands');

if (!fs.existsSync(foldersPath)) {
    console.error(`El directorio 'src/commands' no existe en la ruta: ${foldersPath}`);
    process.exit(1); 
}

const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const folderPath = path.join(foldersPath, folder);
    
    if (fs.lstatSync(folderPath).isDirectory()) {
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] El comando en ${filePath} no tiene las propiedades "data" o "execute".`);
            }
            console.log(`Se cargo correctamente ${filePath}`);
        }
    } else {
        console.log(`[WARNING] Se esperaba una carpeta, pero se encontró un archivo: ${folderPath}`);
    }
}


client.login(token);