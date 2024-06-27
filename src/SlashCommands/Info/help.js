const { MessageEmbed } = require("discord.js")

/**
 * This function is used to list all the functions available in the bot
 */
module.exports = {
	name: "help",
	description: 'Lists all the functions available in the bot',
	options: null,
	run: async(client, interaction, args)=>{

		const embed = new MessageEmbed()
		.setTitle("Help Menu")
		.setDescription(client.slash.map(cmd => `\`${cmd.name} - ${cmd.description}\``).join("\n"))
		.setColor("GREEN");

		return interaction.reply({ embeds: [embed] });

	}
}