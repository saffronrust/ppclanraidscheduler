const { successEmbedFunc } = require("../../utility/embeds/successEmbed");
const { failureEmbedFunc } = require("../../utility/embeds/failureEmbed");

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
	options: null,
    run: async (client, interaction, args) => {
        try {
            const user = interaction.user;
            const username = user.username;

            const rows = await client.googleSheets.values.get({
                auth: client.auth,
                spreadsheetId: client.sheetId,
                range: "Sheet1!A:A"
            });

            const rowIndex = rows.data.values.findIndex(row => row[0] === username);

			// if rowIndex doesn't find anything, it returns -1 by default
            if (rowIndex === -1) {
                console.log("User", username, "is not in the list");
                const failureEmbed = failureEmbedFunc("User is not in the list");
                await interaction.reply({ embeds: [failureEmbed] });
                return;
            }

			// if rowIndex finds the user, it deletes the row
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

            console.log("User", username, "successfully removed");
            const successEmbed = successEmbedFunc("User has been removed from the list");
            await interaction.reply({ embeds: [successEmbed] });

        } catch (error) {
            console.error("Error removing user: ", error);
            const failureEmbed = failureEmbedFunc("An error occurred while removing the user.");
            await interaction.reply({ embeds: [failureEmbed] });
        }
    }
}