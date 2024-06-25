const discordService = require("../services/discordService");
const GuildScheduledEventData = require("../data/guildScheduledEventData");
const { ValidationService, ValidationRules } = require("../services/validationService");
const isValidMongoId = require("../utils/validateMongooseId");

const guildScheduledEventController = {
	createEvent: async (req, res) => {
		// also do authentication
		try {
			// DO TYPE CHECKING AND SHIT HERE
			// CREATE AN EVENT IN DISCORD SERVICE, GET RESULT, SAVE TO DB

			const validationResult = ValidationService.validateInputs(req.body);
			if (!validationResult) res.status(422).send(req.body);

			const validationRules = {
				name: [ValidationRules.NOT_EMPTY],
				typeId: [ValidationRules.NOT_EMPTY, ValidationRules.POSITIVE_INTEGER],
				scheduledStartTime: [ValidationRules.NOT_EMPTY, ValidationRules.TIMESTAMP],
				scheduledEndTime: [ValidationRules.NOT_EMPTY, ValidationRules.TIMESTAMP],
				channel: [ValidationRules.DISCORDID],
			};

			const validatedInputs = ValidationService.validateInputs(inputs, validationRules);

			// name: event.name,
			// scheduledStartTime: new Date(parseInt(event.scheduledStartTime)),
			// scheduledEndTime: new Date(parseInt(event.scheduledEndTime)),
			// privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
			// entityType: entityType,
			// description: event.description,
			// channel: event.channel,
			// entityMetadata: { location: "" },
			// image: path.join(__dirname, `../../public/img/${event.typeId}.png`),

			const event = discordService.createEvent(validationResult);

			//const event = await GuildScheduledEventData.createEvent(event);

			return res.status(201).json(event);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send(error.message);
		}
	},

	getAllEvents: async (req, res) => {
		try {
			const response = await GuildScheduledEventData.getAllEvents();
			const events = response.map((event) => {
				return transformResult(event);
			});
			return res.json(events);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send(error.message);
		}
	},

	getEventById: async (req, res) => {
		try {
			const id = req.params.id;
			if (!isValidMongoId(id)) {
				return res.status(400).send("Invalid id");
			}

			const event = await GuildScheduledEventData.getEventById(id);
			if (!event) {
				return res.status(404).send("Event not found");
			}

			res.json(transformResult(event));
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal server error");
		}
	},

	updateEventById: async (req, res) => {
		try {
			const event = await GuildScheduledEventData.updateEventById(req.params.id, req.body);
			return res.json(transformResult(event));
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Internal server error");
		}
	},

	deleteEventById: async (req, res) => {
		try {
			//const event = await GuildScheduledEventData.deleteEventById({ eventId: req.params.eventId });
			//res.json(event);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Internal server error");
		}
	},
};

const transformResult = (result) => {
	const { _id: id, eventId, creatorId, scheduledEndTime, __v, ...rest } = result.toObject();
	return { id, ...rest };
};

module.exports = guildScheduledEventController;
