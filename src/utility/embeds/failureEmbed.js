/**
 * This function creates a failure embed template, user just needs to input the description
 * @param {string} description The description of the failure
 * @returns the failure embed
 */
function failureEmbedFunc(description) {
    const failureEmbed = new MessageEmbed().setColor("RED")
    failureEmbed.setDescription(description)
    return failureEmbed
}

module.exports = {
	failureEmbedFunc
}