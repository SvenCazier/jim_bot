const discordService = require("../services/discordService");

const inviteController = {
	getInvite: async (req, res) => {
		try {
			const event = await discordService.getInvite();
			res.status(201).json(event);
		} catch (error) {
			console.error(error.message);
			res.status(500).send(error.message);
		}
	},
};

module.exports = inviteController;
