const { MessageEmbed } = require("discord.js");

/**
 * This function creates a success embed template, user just needs to input the description
 * @param {string} description The description of the success
 * @returns the success embed
 */
function successEmbedFunc(description) {
    const successEmbed = new MessageEmbed().setColor("GREEN")
    successEmbed.setDescription(description)
    return successEmbed
}

module.exports = {
	successEmbedFunc
}