"use strict";

const express = require("express");
const router = express.Router();
const guildScheduledEventController = require("../controllers/guildScheduledEventController");
const inviteController = require("../controllers/inviteController");
const messageController = require("../controllers/messageController");

/* EVENTS */
router
	.route("/event") //
	.get(guildScheduledEventController.getAllEvents)
	.post(guildScheduledEventController.createEvent);

router
	.route("/event/:id") //
	.get(guildScheduledEventController.getEventById)
	.put(guildScheduledEventController.updateEventById)
	.delete(guildScheduledEventController.deleteEventById);

/* INVITES */
router
	.route("/invite") //
	.get(inviteController.getInvite);

/* MESSAGES */
router
	.route("/event") //
	.post(messageController.sendMessage);

module.exports = router;
