const { isUserInSheet } = require("../../utility/isUserInSheet");

const { successEmbedFunc } = require("../../utility/embeds/successEmbed");
const { failureEmbedFunc } = require("../../utility/embeds/failureEmbed");

/**
 * This function adds a user to the sheet with their timings for the week
 * They will input their discord username and the timeslots for each day of the week
 * 4 options are available for each day: A for afternoon, B for night, C for all day, and D for not available
 * They can only input their timings once, if they try to input it again, they will get an error message
 * Once they have input their timings, the sheet will be automatically updated
 */
module.exports = {
	name: "add",
	description: "Adds a user to the sheet with their timings for the week",
	userPerms: ["ADMINISTRATOR"],
	// i wish i could make this less messy, but this was my best attempt
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
    run: async (client, interaction, args) => {
        try {
            const user = interaction.options.getUser("user");
            const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
            const timings = days.map(day => interaction.options.getString(day));

            const username = user.username;
            const userInSheet = await isUserInSheet(client, username);

			// if user is in sheet, send failure embed
            if (userInSheet) {
                console.log("User", username, "already added");
                const failureEmbed = failureEmbedFunc("User has already been added to the list");
                await interaction.reply({ embeds: [failureEmbed] });
            } else {
				// if user not in sheet, input their username and timings into a row at the sheet
                await client.googleSheets.values.append({
                    auth: client.auth,
                    spreadsheetId: client.sheetId,
                    range: "Sheet1!A:H",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [[username, ...timings]]
                    }
                });

                console.log("User", username, "successfully added");
                const successEmbed = successEmbedFunc("User has been added to the list");
                await interaction.reply({ embeds: [successEmbed] });
            }
        } catch (error) {
            console.error("Error adding user: ", error);
            const failureEmbed = failureEmbedFunc("An error occurred while adding the user.");
            await interaction.reply({ embeds: [failureEmbed] });
        }
    }
}