const { successEmbedFunc } = require("../../utility/embeds/successEmbed");

module.exports = {
	name: "removeall",
	description: "Clears the entire sheet",
	userPerms: ["ADMINISTRATOR"],
	options: null,
	run: async(client, interaction, args) => {

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
								"startIndex": 1,
								"endIndex": 99,
							},
						}
					}
				]
			}
		}).catch(console.error)

		console.log("Sheet cleaned")
		const successEmbed = successEmbedFunc(`Sheet has been cleaned`)
		await interaction.reply({ embeds: [successEmbed] })
	}
}