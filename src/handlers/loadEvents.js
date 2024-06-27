const clientEvent = (event) => require(`../events/client/${event}`)
const guildEvent = (event) => require(`../events/guild/${event}`)

/**
 * This function loads the events in the client and guild folders
 * @param {client} client The discord client
 */
function loadEvents(client) {
	client.on("ready", () => clientEvent("ready")(client))
	client.on("interactionCreate",(m) => guildEvent("slashCommands")(m, client))
}

module.exports = {
	loadEvents
}