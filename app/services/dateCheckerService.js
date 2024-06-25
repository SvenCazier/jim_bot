"use strict";

class DateChecker {
	isToday = (date) => {
		const currentDate = new Date();
		date = new Date(date);
		return currentDate.getFullYear() === date.getFullYear() && currentDate.getMonth() === date.getMonth() && currentDate.getDate() === date.getDate();
	};

	isTomorrow = (date) => {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1);
		date = new Date(date);
		return currentDate.getFullYear() === date.getFullYear() && currentDate.getMonth() === date.getMonth() && currentDate.getDate() === date.getDate();
	};

	isThisWeek = (date) => {
		const currentDate = new Date();
		date = new Date(date);
		return currentDate.getFullYear() === date.getFullYear() && currentDate.getWeek() === date.getWeek();
	};

	isNextWeek = (date) => {
		const currentDate = new Date();
		date = new Date(date);
		currentDate.setDate(currentDate.getDate() + 7);
		return currentDate.getFullYear() === date.getFullYear() && currentDate.getWeek() === date.getWeek();
	};

	isThisMonth = (date) => {
		const currentDate = new Date();
		date = new Date(date);
		return currentDate.getFullYear() === date.getFullYear() && currentDate.getMonth() === date.getMonth();
	};

	isNextMonth = (date) => {
		const currentDate = new Date();
		date = new Date(date);
		currentDate.setMonth(currentDate.getMonth() + 1);
		return currentDate.getFullYear() === date.getFullYear() && currentDate.getMonth() === date.getMonth();
	};

	getWhen = (timestamp) => {
		if (this.isToday(timestamp)) {
			return "Today's";
		} else if (this.isTomorrow(timestamp)) {
			return "Tomorrow's";
		} else if (this.isThisWeek(timestamp)) {
			return "This week's";
		} else if (this.isNextWeek(timestamp)) {
			return "Next week's";
		} else if (this.isThisMonth(timestamp)) {
			return "This month's";
		} else if (this.isNextMonth(timestamp)) {
			return "Next month's";
		} else {
			return "The";
		}
	};
}

Date.prototype.getWeek = function () {
	const date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	const week1 = new Date(date.getFullYear(), 0, 4);
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
};

module.exports = DateChecker;
