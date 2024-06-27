function loadSlashCommands(client) {
    const fs = require("fs");

    let slash = []
  
    const commandFolders = fs.readdirSync("./src/SlashCommands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/SlashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../SlashCommands/${folder}/${file}`);
        if (command.name) {
          client.slash.set(command.name, command);
          slash.push(command)
          console.log("Loaded", file)
        } else {
          console.log("Error loading", file)
          continue;
        }
      }
    }
    client.on("ready", async() => {
      await client.application.commands.set(slash)
    })
  }
  
  module.exports = {
    loadSlashCommands,
  };