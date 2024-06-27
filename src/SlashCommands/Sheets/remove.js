const { MessageEmbed } = require("discord.js");

/**
 * This function removes a user from the sheet
 * They will input the user they want to remove from the sheet
 * If the user is not in the sheet, they will get an error message
 * Once they have removed the user, the sheet will be automatically updated
 * I should probably run an admin check here to make sure no one abuses this
 */
module.exports = {
	name: "remove",
	description: "Removes a user from the sheet",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "user",
			description: "The user to be removed from the sheet",
			type: "USER",
			required: true
		}
	],
	run: async(client, interaction, args) => {
		const user = await interaction.options.getUser("user");
		const username = user.username;

		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!A:A"
		});

		const data = rows.data.values.find(row => row[0] === username);

		// if the user is not in the list, return an error message
		if (!data) {
			const failureEmbed = new MessageEmbed().setColor("RED")
			console.log("User", username, "is not in the list")
			failureEmbed.setDescription(`User is not in the list`)
			return interaction.reply({ embeds: [failureEmbed] })
		} 

		// else, continue with the deletion process
		let toDeleteRow;

		// find the row to delete based on the username matching
		for (let i = 0; i < rows.data.values.length; i++) {
			const row = rows.data.values[i];
			if (row[0] === username) {
				toDeleteRow = i;
			}
		}

		await client.googleSheets.batchUpdate({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			resource: {
					"requests": [
					{
						"deleteDimension": {
							"range": {
								"sheetId": 0,
								"dimension": "ROWS",
								"startIndex": toDeleteRow,
								"endIndex": toDeleteRow + 1,
							},
						}
					}
				]
			}
		}).catch(console.error)

		const successEmbed = new MessageEmbed().setColor("GREEN")
		console.log("User", username, "successfully removed")
		successEmbed.setDescription(`User has been removed from the list`)
		return interaction.reply({ embeds: [successEmbed] })
	}
}