const { dayChecker } = require("../../handlers/dayChecker");
const { successEmbedFunc } = require("../../utility/embeds/successEmbed");
const { failureEmbedFunc } = require("../../utility/embeds/failureEmbed");

/**
 * This function checks the sheet for an available raid timing, condition is met when 6 or more people register the same timeslot
 * The command calls the dayChecker function for each day of the week to check if there are enough people available to play
 * If there are enough people available, dayChecker will return the array containing the timeslot and the users available
 * If there are no suitable timeslots available (i.e. dayChecker returns 0), the command will return an error message
 */
module.exports = {
    name: "check",
    description: "Checks the sheet for an available raid timing",
    options: null,
    run: async (client, interaction, args) => {
        try {
            const ranges = [
                "Sheet1!B2:B99",
                "Sheet1!C2:C99",
                "Sheet1!D2:D99",
                "Sheet1!E2:E99",
                "Sheet1!F2:F99",
                "Sheet1!G2:G99",
                "Sheet1!H2:H99"
            ];

            const userColumns = await client.googleSheets.values.get({
                auth: client.auth,
                spreadsheetId: client.sheetId,
                range: "Sheet1!A2:A99"
            });

            const columns = await Promise.all(
                ranges.map(range => client.googleSheets.values.get({
                    auth: client.auth,
                    spreadsheetId: client.sheetId,
                    range
                }))
            );

			// checks is the result array from the dayChecker function for each day of the week
            const checks = columns.map(col => dayChecker(col, userColumns));
            const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

			// if every element in checks is 0, send failure embed
            if (checks.every(result => result === 0)) {
				console.log("No suitable time for raid found");
                const failureEmbed = failureEmbedFunc("No suitable time for raid found");
                await interaction.reply({ embeds: [failureEmbed] });
            } else {
				// if not, that means there is a suitable timing, go through the checks array and find the first suitable time
                for (let i = 0; i < checks.length; i++) {
                    if (checks[i] !== 0) {
						// get the 2nd element onwards of the array, which contains the users available
                        const userArray = checks[i].slice(2);
						console.log("Raid timing found");
                        const successEmbed = successEmbedFunc(`Raid is set for ${dayOfWeek[i]} at ${checks[i][1]} with the following users:\n ${userArray.join(", ")}`);
                        await interaction.reply({ embeds: [successEmbed] });
                        break;  // Stop after finding the first suitable time
                    }
                }
            }
        } catch (error) {
            console.error("Error checking raid timing: ", error);
            const failureEmbed = failureEmbedFunc("An error occurred while checking the raid timing.");
            await interaction.reply({ embeds: [failureEmbed] });
        }
    }
};
