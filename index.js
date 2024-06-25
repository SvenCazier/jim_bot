"use strict";

require("dotenv").config();

const discordService = require("./app/services/discordService");
const DbConfig = require("./app/data/DbConfig");

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();

(async () => {
	try {
		await DbConfig.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@jimbot.dtfyi6u.mongodb.net/${process.env.MONGODATABASE}?retryWrites=true&w=majority`);
	} catch (error) {
		console.error("Error connecting to database:", error);
		process.exit(1);
	}
})();

//discordService.deleteEvent("1200488927916732518", "1200796057970417695");

// app.get("/", async function (req, res) {
// 	if (!discordService.client.isReady()) {
// 		await discordService.login();
// 	}
// 	discordService
// 		.sendMessage("1200488928361316352", req.query.msg)
// 		.then((response) => console.log(response))
// 		.catch((error) => console.error(error));
// 	const response = await discordService.getAllEvents("1200488927916732518");

// 	response.forEach((event) => console.log(event.id));
// 	res.send(response);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./app/routes/apiRoutes"));
app.get("*", function (req, res) {
	res.sendStatus(418);
});

app.listen(port);

// process.on('SIGINT', () => {});  // CTRL+C
// process.on('SIGQUIT', () => {}); // Keyboard quit
// process.on('SIGTERM', () => {}); // `kill` command

process.on("SIGINT", async function () {
	try {
		await discordService.logout();
	} catch (error) {
		console.error(error);
	} finally {
		console.log("destroyed");
		process.exit(0);
	}
});

// client.on("ready", async () => {
// 	const channel = await client.channels.fetch("1200488928361316352");
// 	if (!channel) return; // if the channel is not in the cache return and do nothing
// 	//channel.send("hello");
// 	//console.log(channel.id);
// 	const guild = await client.guilds.fetch("1200488927916732518");

// 	if (!guild) return console.log("Guild not found");
// 	/*
// 	const event_manager = new GuildScheduledEventManager(guild);

// 	await event_manager.create({
// 		name: "Test Event 2",
// 		scheduledStartTime: new Date(Date.now() + 10000),
// 		privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
// 		entityType: GuildScheduledEventEntityType.Voice,
// 		description: "This is a test Scheduled Event",
// 		channel: "1200512574316355715",
// 		image: null,
// 		reason: "Testing with creating a Scheduled Event",
// 	});*/

// 	// await channel.createInvite({ maxAge: 0, maxUses: 0 }).then(async (invite) => {
// 	// 	console.log(`https://discord.gg/${invite.code}`);
// 	// });
// });

// if (isBotReady) {
// 	something();
// }
// async function something() {
// 	if (client.isReady()) {
// 		try {
// 			const channel = await client.channels.fetch("1200488928361316352");
// 			if (channel) {
// 				channel.send("Hello from the other side...");
// 			} else {
// 				console.error("Channel not found.");
// 			}
// 		} catch (error) {
// 			console.error("Error sending message:", error);
// 		}
// 	}
// }

// client.login(process.env.TOKEN);

// // Example usage
// const inputs = {
// 	name: "<script>alert('XSS attack')</script>",
// 	email: "user@example.com",
// 	age: 25,
// 	bio: "<a href='javascript:alert(\"XSS attack\")'>Click me!</a>",
// 	image: "https://example.com/image.jpg",
// };

// const validationRules = {
// 	email: ["notEmpty"],
// 	password: ["notEmpty"],
// 	age: ["notEmpty", "integer"],
// 	bio: ["notEmpty"],
// 	image: ["notEmpty"],
// };

// const validatedInputs = ValidationService.validateInputs(inputs, validationRules);
// console.log(validatedInputs);
