const { successEmbedFunc } = require("../../utility/embeds/successEmbed");

/**
 * This function removes all users from the sheet by deleting all rows except the first one, which contains the headers
 */
module.exports = {
	name: "removeall",
	description: "Clears the entire sheet",
	userPerms: ["ADMINISTRATOR"],
	options: null,
    run: async (client, interaction, args) => {
        try {
			// delete all rows from 2nd row onwards
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
                                    startIndex: 1,
                                    endIndex: 99,
                                },
                            },
                        },
                    ],
                },
            });

            console.log("Sheet cleaned");
            const successEmbed = successEmbedFunc("Sheet has been cleaned");
            await interaction.reply({ embeds: [successEmbed] });
        } catch (error) {
            console.error("Error cleaning sheet: ", error);
            const failureEmbed = failureEmbedFunc("An error occurred while cleaning the sheet.");
            await interaction.reply({ embeds: [failureEmbed] });
        }
    }
}