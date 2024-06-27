const { MessageEmbed } = require("discord.js");

/**
 * This function updates a user's timings in the sheet
 * They will input their discord username and the timeslots for each day of the week
 * 4 options are available for each day: A for afternoon, B for night, C for all day, and D for not available
 * If the user is not in the sheet, they will get an error message
 * Once they have updated their timings, the sheet will be automatically updated
 * This function essentially combines both the add and remove functions
 */
module.exports = {
	name: "update",
	description: "Updates a user's timings",
	userPerms: ["ADMINISTRATOR"],
	options: [
		{
			name: "user",
			description: "The user to update in the spreadsheet",
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

		const rows = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!A:A"
		});

		const data = rows.data.values.find(row => row[0] === username);

		if (data) {
			let toDeleteRow;

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

			const successEmbed = new MessageEmbed().setColor("GREEN")
			console.log("User", username, "successfully updated")
			successEmbed.setDescription(`User has been updated`)
			return interaction.reply({ embeds: [successEmbed] })
		} else if (!data) {
			const failureEmbed = new MessageEmbed().setColor("RED")
			console.log("User", username, "is not in the list")
			failureEmbed.setDescription(`User is not in the list`)
			return interaction.reply({ embeds: [failureEmbed] })
		}
	}
}