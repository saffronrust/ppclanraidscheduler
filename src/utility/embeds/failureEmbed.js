function failureEmbedFunc(description) {
    const failureEmbed = new MessageEmbed().setColor("RED")
    failureEmbed.setDescription(description)
    return failureEmbed
}

module.exports = {
	failureEmbedFunc
}