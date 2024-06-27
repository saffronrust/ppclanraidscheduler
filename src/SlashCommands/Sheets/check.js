const { MessageEmbed } = require("discord.js");
const { dayChecker } = require("../../handlers/dayChecker");

/**
 * This function checks the sheet for an available raid timing, condition is met when 6 or more people register the same timeslot
 * The command calls the dayChecker function for each day of the week to check if there are enough people available to play
 * If there are enough people available, dayChecker will return the array containing the timeslot and the users available
 * If there are no suitable timeslots available (i.e. dayChecker returns 0), the command will return an error message
 */
module.exports = {
	name: "check",
	description: "Checks the sheet for an available raid timing, condition is met when 6 or more people register the same timeslot",
	userPerms: ["ADMINISTRATOR"],
	options: null,
	run: async(client, interaction, args) => {
		const mondayColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!B2:B99"
		});

		const tuesdayColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!C2:C99"
		});

		const wednesdayColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!D2:D99"
		});

		const thursdayColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!E2:E99"
		});

		const fridayColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!F2:F99"
		});

		const saturdayColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!G2:G99"
		});

		const sundayColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!H2:H99"
		});

		const userColumns = await client.googleSheets.values.get({
			auth: client.auth,
			spreadsheetId: client.sheetId,
			range: "Sheet1!A2:A99"
		});

		const mondayCheck = dayChecker(mondayColumns, userColumns);
		const tuesdayCheck = dayChecker(tuesdayColumns, userColumns);
		const wednesdayCheck = dayChecker(wednesdayColumns, userColumns);
		const thursdayCheck = dayChecker(thursdayColumns, userColumns);
		const fridayCheck = dayChecker(fridayColumns, userColumns);
		const saturdayCheck = dayChecker(saturdayColumns, userColumns);
		const sundayCheck = dayChecker(sundayColumns, userColumns);

		const resultArray = [mondayCheck, tuesdayCheck, wednesdayCheck, thursdayCheck, fridayCheck, saturdayCheck, sundayCheck];

		const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

		const userArray = [];
		for (let i = 0; i < resultArray.length; i++) {

			// if an element of resultArray is not 0, it means there are enough people available to play
			if (resultArray[i] != 0) {
				// index from 2 because thats when the usernames start
				for (let j = 2; j < resultArray[i].length; j++) {
					// this creates an array of the available people
					userArray.push(resultArray[i][j]);
				}
				const embed = new MessageEmbed().setColor("GREEN")
				console.log("Raid timing found")
				embed.setDescription(`Raid is set for ${dayOfWeek[i]} at ${resultArray[i][1]} with the following users:\n ${userArray.join(", ")}`);
				return interaction.reply({ embeds: [embed] })
			}
		}

		// if we come to here, that means all the days have been checked and no suitable time for raid has been found
		// i.e. all the elements of resultArray are 0
		const embed = new MessageEmbed().setColor("RED")
		console.log("Raid timing not found")
		embed.setDescription(`No suitable time for raid found`)
		return interaction.reply({ embeds: [embed] })
	}
}