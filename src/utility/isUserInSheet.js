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