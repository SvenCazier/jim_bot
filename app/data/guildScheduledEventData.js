const GuildScheduledEvent = require("../models/guildScheduledEvent");

class GuildScheduledEventData {
	static async createEvent(eventData) {
		try {
			const event = new GuildScheduledEvent(eventData);
			await event.save();
			return event;
		} catch (error) {
			console.error(error);
			throw new Error("Internal Server Error");
		}
	}

	static async getAllEvents() {
		try {
			return await GuildScheduledEvent.find();
		} catch (error) {
			console.error(error);
			throw new Error("Internal Server Error");
		}
	}

	static async getEventById(id) {
		try {
			return await GuildScheduledEvent.findById(id);
		} catch (error) {
			console.error(error);
			throw new Error("Internal Server Error");
		}
	}

	static async updateEventById(id, updatedEventData) {
		try {
			return await GuildScheduledEvent.findByIdAndUpdate(id, updatedEventData, { new: true });
		} catch (error) {
			console.error(error);
			throw new Error("Internal Server Error");
		}
	}

	static async deleteEventById(id) {
		try {
			return await GuildScheduledEvent.findByIdAndDelete(id);
		} catch (error) {
			console.error(error);
			throw new Error("Internal Server Error");
		}
	}
}

module.exports = GuildScheduledEventData;
