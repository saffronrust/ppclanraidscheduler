const { MessageEmbed } = require("discord.js");
const { dayChecker } = require("../../handlers/dayChecker");

module.exports = {
	name: "check",
	description: "Checks for an available raid time",
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
			if (resultArray[i] != 0) {

				for (let j = 2; j < resultArray[i].length; j++) {
					userArray.push(resultArray[i][j]);
				}
				const embed = new MessageEmbed().setColor("GREEN")
				console.log("Raid timing found")
				embed.setDescription(`Raid is set for ${dayOfWeek[i]} at ${resultArray[i][1]} with the following users:\n ${userArray.join(", ")}`);
				return interaction.reply({ embeds: [embed] })
			}
		}
		const embed = new MessageEmbed().setColor("RED")
		console.log("Raid timing not found")
		embed.setDescription(`No suitable time for raid found`)
		return interaction.reply({ embeds: [embed] })
	}
}