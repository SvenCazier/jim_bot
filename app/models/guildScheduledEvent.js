const mongoose = require("mongoose");

const guildScheduledEventSchema = new mongoose.Schema({
	eventId: { type: String, required: true, index: true },
	guildId: { type: String, required: true },
	channelId: { type: String, required: false },
	creatorId: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: false },
	scheduledStartTime: { type: Number, required: true },
	scheduledEndTime: { type: Number, required: true },
	eventTypeId: { type: Number, required: true },
});

const GuildScheduledEvent = mongoose.model("GuildScheduledEvent", guildScheduledEventSchema);

module.exports = GuildScheduledEvent;
