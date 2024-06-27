const { MessageEmbed } = require("discord.js");
const { isUserInSheet } = require("../../utility/isUserInSheet");

const { successEmbedFunc } = require("../../utility/embeds/successEmbed");
const { failureEmbedFunc } = require("../../utility/embeds/failureEmbed");

module.exports = {
	name: "add",
	description: "Adds a user to the spreadsheet",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "user",
			description: "The user to add to the spreadsheet",
			type: "USER",
			required: true,
		},
		{
			name: "monday",
			description: "Put A for afternoon, B for night, C for all day, and D for not available",
			type: "STRING",
			required: true,
		},
		{
			name: "tuesday",
			description: "Put A for afternoon, B for night, C for all day, and D for not available",
			type: "STRING",
			required: true,
		},
		{
			name: "wednesday",
			description: "Put A for afternoon, B for night, C for all day, and D for not available",
			type: "STRING",
			required: true,
		},
		{
			name: "thursday",
			description: "Put A for afternoon, B for night, C for all day, and D for not available",
			type: "STRING",
			required: true,
		},
		{
			name: "friday",
			description: "Put A for afternoon, B for night, C for all day, and D for not available",
			type: "STRING",
			required: true,
		},
		{
			name: "saturday",
			description: "Put A for afternoon, B for night, C for all day, and D for not available",
			type: "STRING",
			required: true,
		},
		{
			name: "sunday",
			description: "Put A for afternoon, B for night, C for all day, and D for not available",
			type: "STRING",
			required: true,
		}
	],
	run: async(client, interaction, args) => {
		const user = await interaction.options.getUser("user");
		const monday = await interaction.options.getString("monday");
		const tuesday = await interaction.options.getString("tuesday");
		const wednesday = await interaction.options.getString("wednesday");
		const thursday = await interaction.options.getString("thursday");
		const friday = await interaction.options.getString("friday");
		const saturday = await interaction.options.getString("saturday");
		const sunday = await interaction.options.getString("sunday");

		const username = await user.username;

		if (isUserInSheet(client, username)) {

			///////////////////////////////////////////////////////////////////////////
			// TODO: Create a separate folder to display success and failure embeds ///
			///////////////////////////////////////////////////////////////////////////

			const failureEmbed = failureEmbedFunc(`User has already been added to the list`)
			// const failureEmbed = new MessageEmbed().setColor("RED")
			// failureEmbed.setDescription(`User has already been added to the list`)
			console.log("User", username, "already added")
			return interaction.reply({ embeds: [failureEmbed] })
		} else if (!isUserInSheet(client, username)) {
			await client.googleSheets.values.append({
				auth: client.auth,
				spreadsheetId: client.sheetId,
				range: "Sheet1!A:H",
				valueInputOption: "USER_ENTERED",
				resource: {
					values: [
						[username, monday, tuesday, wednesday, thursday, friday, saturday, sunday]
					]
				}
			});

			const successEmbed = successEmbedFunc(`User has been added to the list`)
			// const successEmbed = new MessageEmbed().setColor("GREEN")
			// successEmbed.setDescription(`User has been added to the list`)
			console.log("User", username, "successfully added")
			return interaction.reply({ embeds: [successEmbed] })
		}
	}
}