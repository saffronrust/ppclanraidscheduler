# ppclanraidscheduler

A discord bot that I made in my own spare time to facilitate raid timings with my Destiny 2 clan, using Google Sheets as a database.

## Tech Stack and APIs Used
<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google Sheets</title><path d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"/></svg>

## Motivation
In our friend group, we schedule weekly sessions to play Destiny 2 raids. We typically use Google Sheets to input our timings. However, as our clan grew, it became increasingly unwieldy to scroll through the Google Sheets. Thus, I was inspired to make this discord bot.

- Why a discord bot?
Discord is our primary means of communication within the group, so it made sense to create a bot directly within our discord server.
- Why still use Google Sheets?
At first, I wanted to make the bot communicate with Firestore or MongoDB's APIs. However, I wanted to make minimal disruptions to our current workflow. Besides, in the unlikely event that the bot catastrophically fails, we can always revert back to manually updating the Google Sheets.

## Pre-requisites
- Discord.js v13 or higher (`npm install discord.js@latest`)
- NodeJS [v16.6 or higher](https://nodejs.org/en/download/prebuilt-installer)
- Google APIs Client Library for NodeJS (`npm install googleapis`)
- `applications.commands` scope enabled for your bot in the [Discord developer portal](https://discord.com/developers)

## Getting Started
1. Git clone the repo
- Go to command prompt, and navigate to the directory you want
- `git clone https://github.com/saffronrust/ppclanraidscheduler.git`

2. Install dependencies
- `npm install`

3. In a text editor of your choice, configure the `config.json` and `credentials.json` file
```json
{
	"botToken": "ENTER_YOUR_BOT_TOKEN_HERE",
	"spreadsheetId": "ID_OF_THE_GOOGLE_SHEET",
	"ownerId": "ENTER_YOUR_ID_HERE",
	"prefix": "ANY_PREFIX_OF_YOUR_CHOICE",
	"error_logs": "ENTER_THE_ERROR_LOGS_CHANNEL_ID_HERE"
}
```
- `botToken` is the token of your bot
- `spreadsheetId` is the ID of the Google Sheet you want to use
- `ownerId` is the ID of the owner of the bot
- `prefix` is the prefix of the bot
- `error_logs` is the ID of the channel where you want to send the error logs
- **Please read [the guide on discord.js](https://discordjs.guide/#before-you-begin) if you're unsure of how to configure the `config.json` file**

- The `credentials.json` file is not included here, but you need it to use this bot.
- **Watch [this video](http://www.youtube.com/watch?v=PFJNJQCU_lo) on how to get the `credentials.json` file**

4. Start the bot
- `node .`

## Future Plans
As of now, I have no plans to improve upon this bot. This was just a personal project for my friend group. However, I'm thinking of adding more functionalities and aesthetics to the bot, for example, color-coding the timings and pinging the relevant users when a raid timing has been found. Also I should probably add documentation.

## Acknowledgements
Huge, huge thanks to [Simpleboy353's SheetsBot](https://github.com/Simpleboy353/SheetsBot) for the foundation of this bot. I wouldn't have known how to start using the Google Sheets API without building upon his bot. Please [buy him a coffee](https://buymeacoffee.com/simpleboy353) if you liked this bot.
