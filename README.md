# ppclanraidscheduler

A discord bot that I made in my own spare time to facilitate raid timings with my Destiny 2 clan, that reads and writes to Google Sheets as a database.

## Tech Stack and APIs Used
<div>
<img src = "http://img.shields.io/badge/nodejs-339933?style=flat-square&logo=nodedotjs&logoColor=black" alt = "nodejs">
<img src="http://img.shields.io/badge/Javascript-fcd400?style=flat-square&logo=javascript&logoColor=black" alt="Javascript">
<img src = "http://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=black" alt = "npm">
<img src = "http://img.shields.io/badge/Google Sheets API-34A853?style=flat-square&logo=googlesheets&logoColor=black" alt = "Google Sheets API">
<img src = "http://img.shields.io/badge/Discord Bot API-5865F2?style=flat-square&logo=discord&logoColor=black" alt = "Discord Bot API">
</div>

## Functions
- `/add [timings]` Adds a user to the sheet with their timings for the week
- `/check` Checks the sheet for an available raid timing, condition is met when 6 or more people register the same timeslot
- `/remove` Removes a user from the sheet
- `/update [timings]` Updates a user's timings
- `/removeall` Clears the entire sheet, ready to be used for next week
- `/help` Lists all the functions available in the bot

## Motivation
In our friend group, we schedule weekly sessions to play Destiny 2 raids. We typically use Google Sheets to input our timings. However, as our clan grew, it became increasingly unwieldy to scroll through the Google Sheets. Thus, I was inspired to make this discord bot.

- Why a discord bot?

Discord is our primary means of communication within the group, so it made sense to create a bot directly within our discord server.

- Why still use Google Sheets?

At first, I wanted to make the bot communicate with Firestore or MongoDB's APIs. However, I wanted to make minimal disruptions to our current workflow. Besides, in the unlikely event that the bot catastrophically fails, we can always revert back to manually updating the Google Sheets.

## Pre-requisites
- Discord.js [v13 or higher](https://discordjs.guide/preparations/#installing-discord-js)
- NodeJS [v16.6 or higher](https://nodejs.org/en/download/prebuilt-installer)
- Google API Client Library in NodeJS
- `applications.commands` scope enabled for your bot in the [Discord developer portal](https://discord.com/developers)

## Getting Started
1. Git clone the repo
 
Go to command prompt, navigate to the directory you want, and type `git clone https://github.com/saffronrust/ppclanraidscheduler.git`

2. Install dependencies

Type `npm install` in the same directory

3. In a text editor of your choice, add the `config.json` and `credentials.json` file in `src/jsons`
```json
{
	// create a new config.json file and copy paste the code here
	"botToken": "ENTER_YOUR_BOT_TOKEN_HERE",
	"spreadsheetId": "ID_OF_THE_GOOGLE_SHEET",
	"ownerId": "ENTER_YOUR_ID_HERE",
	"prefix": "ANY_PREFIX_OF_YOUR_CHOICE",
	"error_logs": "ENTER_THE_ERROR_LOGS_CHANNEL_ID_HERE"
}
```
Legend:
- `botToken` is the token of your bot
- `spreadsheetId` is the ID of the Google Sheet you want to use
- `ownerId` is the ID of the owner of the bot
- `prefix` is the prefix of the bot
- `error_logs` is the ID of the channel where you want to send the error logs
- **Please read [the guide on discord.js](https://discordjs.guide/#before-you-begin) if you're unsure of how to configure the `config.json` file**

- The `credentials.json` file is not included here, but you need it to use this bot.
- **Watch [this video](http://www.youtube.com/watch?v=PFJNJQCU_lo) on how to get the `credentials.json` file**

4. Start the bot

Type `node .` in the main directory

5. Have fun!

## Future Plans
As of now, I have no concrete plans to improve upon this bot. This was just a personal project for my friend group. However, I'm thinking of adding more functionalities and aesthetics to the bot, for example, color-coding the timings and pinging the relevant users when a raid timing has been found.

Perhaps I'll deploy the bot for a month and see how it goes.

## Acknowledgements
Huge, huge thanks to [Simpleboy353's SheetsBot](https://github.com/Simpleboy353/SheetsBot) for the foundation of this bot. I wouldn't have known how to start using the Google Sheets API without building upon his bot. Please [buy him a coffee](https://buymeacoffee.com/simpleboy353) if you liked this bot.

## Additional Information
License: GPL 3.0
