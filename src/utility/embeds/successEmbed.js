function successEmbedFunc(description) {
    const successEmbed = new MessageEmbed().setColor("GREEN")
    successEmbed.setDescription(description)
    return successEmbed
}

module.exports = {
	successEmbedFunc
}