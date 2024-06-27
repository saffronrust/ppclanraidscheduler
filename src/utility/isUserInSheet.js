/**
 * This function checks if a user is in the google sheet
 * It combs through the entire user column for a matching username
 * @param {client} client 
 * @param {string} username 
 * @returns true if the user is in the sheet, false otherwise
 */
async function isUserInSheet(client, username) {
    const rows = await client.googleSheets.values.get({
        auth: client.auth,
        spreadsheetId: client.sheetId,
        range: "Sheet1!A:A"
    });

    const data = rows.data.values.find(row => row[0] === username);

    if (data) return true;
    else return false;
}

module.exports = {
	isUserInSheet
}