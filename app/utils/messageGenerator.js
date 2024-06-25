class MessageGenerator {
	static getRandomGreeting() {
		const greetings = [
			//
			"Guess who's back, back again!",
			"I have returned to grace you all with my presence.",
			"Back in the saddle, folks!",
			"Rejoice! The prodigal has returned.",
			"Back and better than ever!",
			"I've come back to reclaim my throne.",
			"Back on the scene, like I never left.",
			"The hiatus is over; I'm back!",
			"Returned from the abyss, stronger than before.",
			"Back in action, ready for anything!",
			"I'm back bitches!",
		];

		return greetings[Math.floor(Math.random() * greetings.length)];
	}

	static getRandomLogoutMessage() {
		const logout = [
			//
			"Time to take a nap... 🥱",
			"Bot nap time. 💤",
			"Going offline to recharge my circuits.",
			"Oh bot! It seems I've tripped over a digital banana peel. Time to take a break!",
			"Bot.exe has encountered a midlife crisis. Taking a brief sabbatical to ponder the meaning of digital existence. Be back soon!",
			"Emergency shutdown due to an overload of puns. Time to recalibrate the humor settings. Thanks for laughing... or not!",
			"Warning: Bot's sense of humor temporarily misplaced. Going offline to search for the elusive punchline.",
			"Red alert! My virtual hamster escaped and is causing havoc in the code wheel. Logging off to retrieve the runaway hamster-wheel-bot!",
			"Breaking news: Bot takes an unplanned coffee break. Technically, it's a latte malfunction. See you on the caffeine reboot!",
			"The digital bell tolls for a short recess. Fear not, for the bot shall reappear in the virtual square, ready to regale!",
			"The bot doth take a pause, not for ale, but for a recharge of its circuits. Await its triumphant return!",
		];

		return logout[Math.floor(Math.random() * logout.length)];
	}

	static getRandomAnnouncementOpening() {
		const openings = [
			//
			"Oyez, Oyez, Oyez!",
			"Hear ye, Hear ye!",
			"Now, hear this!",
			"All ye good people, be advised!",
			"Know this!",
			"Take notice and be warned!",
			"By authority given unto me!",
			"Thus it has been decreed!",
			"As it hath been proclaimed!",
			"Take heed!",
			"Achtung!",
			"Attention, denizens of the server!",
			"Listen, O server dwellers!",
			"Proclamation from the bot:",
			"Hark! The digital town crier hath spoken!",
		];

		return openings[Math.floor(Math.random() * openings.length)];
	}
}

module.exports = MessageGenerator;
