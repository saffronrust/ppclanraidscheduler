const { successEmbedFunc } = require("../../utility/embeds/successEmbed");
const { failureEmbedFunc } = require("../../utility/embeds/failureEmbed");

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
	options: [
		// {
		// 	name: "user",
		// 	description: "The user to update in the spreadsheet",
		// 	type: "USER",
		// 	required: true,
		// },
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
    run: async (client, interaction, args) => {
        try {

			// // check if the user is updating their own timings
			// if (interaction.options.getUser("user").id != interaction.user.id) {
			// 	console.log("User tried to update other people's timings");
			// 	const failureEmbed = failureEmbedFunc("You can only update your own timings");
			// 	await interaction.reply({ embeds: [failureEmbed] });
			// 	return;
			// }

            // const user = interaction.options.getUser("user");
			const user = interaction.user;
            const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
            const timings = days.map(day => interaction.options.getString(day));
            const username = user.username;

            const rows = await client.googleSheets.values.get({
                auth: client.auth,
                spreadsheetId: client.sheetId,
                range: "Sheet1!A:A"
            });

            const rowIndex = rows.data.values.findIndex(row => row[0] === username);

			// user not in sheet, send failure embed
            if (rowIndex === -1) {
                console.log("User", username, "is not in the list");
                const failureEmbed = failureEmbedFunc("User is not in the list");
                await interaction.reply({ embeds: [failureEmbed] });
                return;
            }

			// delete the original row
            await client.googleSheets.batchUpdate({
                auth: client.auth,
                spreadsheetId: client.sheetId,
                resource: {
                    requests: [
                        {
                            deleteDimension: {
                                range: {
                                    sheetId: 0,
                                    dimension: "ROWS",
                                    startIndex: rowIndex,
                                    endIndex: rowIndex + 1
                                }
                            }
                        }
                    ]
                }
            });

			// add the updated row
            await client.googleSheets.values.append({
                auth: client.auth,
                spreadsheetId: client.sheetId,
                range: "Sheet1!A:H",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [[username, ...timings]]
                }
            });

            console.log("User", username, "successfully updated");
            const successEmbed = successEmbedFunc("User has been updated");
            await interaction.reply({ embeds: [successEmbed] });

        } catch (error) {
            console.error("Error updating user: ", error);
            const failureEmbed = failureEmbedFunc("An error occurred while updating the user.");
            await interaction.reply({ embeds: [failureEmbed] });
        }
    }
}