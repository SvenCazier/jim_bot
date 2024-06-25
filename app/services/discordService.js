"use strict";

require("dotenv").config();
const path = require("path");
const DateChecker = require("./dateCheckerService");
const MessageGenerator = require("../utils/messageGenerator");

const { Client, GatewayIntentBits, GuildScheduledEvent, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType } = require("discord.js");

class DiscordModel {
	constructor() {
		this.client = new Client({
			intents: [
				//
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildScheduledEvents,
			],
		});

		this.client.once("ready", () => {
			console.log(`Logged in as ${this.client.user.tag}`);
			this.sendMessage("1200488928361316352", MessageGenerator.getRandomGreeting());
		});

		this.login();
	}

	async login() {
		this.client.login(process.env.DISCORDTOKEN);
	}

	async logout() {
		await this.sendMessage("1200488928361316352", MessageGenerator.getRandomLogoutMessage());
	}

	async sendMessage(channelId, message) {
		await this.client.guilds.fetch();
		const channel = this.client.channels.cache.get(channelId);
		if (channel) {
			await channel.send(message);
			return "Message sent!";
		} else {
			return "Channel not found";
		}
	}

	async getAllEvents() {
		const guild = await this.client.guilds.fetch(process.env.GUILDID);

		if (!guild) return console.log("Guild not found");

		const event_manager = new GuildScheduledEventManager(guild);
		return await event_manager.fetch();
	}
	async createEvent(event) {
		try {
			const guild = await this.client.guilds.fetch(process.env.GUILDID);
			if (!guild) throw new Error("Guild not found");

			const event_manager = new GuildScheduledEventManager(guild);
			console.log(event);
			const entityType = event.channel ? GuildScheduledEventEntityType.Voice : GuildScheduledEventEntityType.External;
			console.log(entityType);
			const result = await event_manager.create({
				name: event.name,
				scheduledStartTime: new Date(parseInt(event.scheduledStartTime)),
				scheduledEndTime: new Date(parseInt(event.scheduledEndTime)),
				privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
				entityType: entityType,
				description: event.description,
				channel: event.channel,
				entityMetadata: { location: "" },
				image: path.join(__dirname, `../../public/img/${event.typeId}.png`),
			});
			return result;
		} catch (error) {
			console.error(error.message);
			throw new Error("Failed to create event");
		}
	}

	async editEvent(event) {
		// const event_manager = new GuildScheduledEventManager(process.env.GUILDID);
		// event_manager.edit()
		// editScheduledEvent(guildId, eventId, body);
	}

	async deleteEvent(eventId) {
		const guild = await this.client.guilds.fetch(process.env.GUILDID);
		if (!guild) return console.log("Guild not found");
		const event_manager = new GuildScheduledEventManager(guild);
		event_manager.delete(eventId);
	}

	async getInvite() {
		const guild = await this.client.guilds.fetch(process.env.GUILDID);
		const channel = guild.channels.cache.get(process.env.INVITECHANNELID);
		return await channel.createInvite({
			maxAge: 86400,
			maxUses: 1,
			unique: true,
		});
	}
}

const discordModel = new DiscordModel();

discordModel.client.on("guildScheduledEventCreate", async (event) => {
	const channel = await discordModel.client.channels.fetch("1200488928361316352");
	channel.send(`@everyone ${MessageGenerator.getRandomAnnouncementOpening()} A new event has been created. ${event}`);
	// write to db
});

discordModel.client.on("guildScheduledEventDelete", async (event) => {
	const dateChecker = new DateChecker();
	const channel = await discordModel.client.channels.fetch("1200488928361316352");
	channel.send(`@everyone We regret to inform you that ${dateChecker.getWhen(event.scheduledStartTimestamp).toLowerCase()} ${event.name} event has been cancelled.`);
	// write to db
});

discordModel.client.on("guildScheduledEventUpdate", async (oldEvent, newEvent) => {
	const dateChecker = new DateChecker();
	const channel = await discordModel.client.channels.fetch("1200488928361316352");
	const randomAnnouncementOpening = MessageGenerator.getRandomAnnouncementOpening();
	const when = dateChecker.getWhen(oldEvent.scheduledStartTimestamp);
	channel.send(`@everyone ${randomAnnouncementOpening} ${randomAnnouncementOpening.endsWith("!") ? when : when.toLowerCase()} ${oldEvent.name} event has been changed to ${newEvent} .`);
	// write to db
});

module.exports = discordModel;
