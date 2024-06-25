class ValidationRules {
	static NOT_EMPTY = "NOT_EMPTY";
	static POSITIVE_INTEGER = "POSITIVE_INTEGER";
	static TIMESTAMP = "TIMESTAMP";
	static DISCORDID = "DISCORDID";
}

class ValidationService {
	static validateInputs(inputs, validationRules) {
		if (!Object.keys(validationRules).length) return null;

		const sanitizedInputs = this.sanitizeInputs(inputs);

		const isValid = Object.entries(validationRules).every(([key, rules]) => {
			const inputValue = sanitizedInputs[key];
			// Check if the input field allows empty values
			const allowEmpty = rules.includes(ValidationRules.NOT_EMPTY) ? false : true;

			// If the input value is empty and it's allowed, consider it as valid
			if (allowEmpty && inputValue === "") return true;
			return rules.every((rule) => {
				switch (rule) {
					case ValidationRules.NOT_EMPTY:
						return inputValue !== "";
					case ValidationRules.POSITIVE_INTEGER:
						return this.isPositiveInteger(inputValue);
					case ValidationRules.TIMESTAMP:
						return this.isValidTimestamp(inputValue);
					case ValidationRules.DISCORDID:
						return this.isValidDiscordId(inputValue);
					default:
						return false; // Unknown rule, consider it as failed
				}
			});
		});

		return isValid ? sanitizedInputs : null;
	}

	static isValidDiscordId(value) {
		return inputValue.length > 16 && inputValue.length < 20 && $this.isPositiveInteger(value);
	}

	static isValidTimestamp(value) {
		if (value.length === 13) return !isNaN(new Date(value).getTime());
		return false;
	}

	static isPositiveInteger(value) {
		return !isNaN(parseInt(value)) && isFinite(value) && parseInt(value) > 0;
	}

	static sanitizeInputs(inputs) {
		const sanitizedInputs = {};
		for (const [key, value] of Object.entries(inputs)) {
			if (typeof value === "string") {
				// Remove leading and trailing whitespace
				const trimmedValue = value.trim();
				// Escape HTML entities
				const escapedValue = this.escapeHtml(trimmedValue);
				sanitizedInputs[key] = escapedValue;
			} else {
				sanitizedInputs[key] = value;
			}
		}
		return sanitizedInputs;
	}

	static escapeHtml(input) {
		// Define a map of HTML entities and their corresponding replacements
		const htmlEntities = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"/": "&#x2F;",
			// Add more entities as needed
		};
		// Replace HTML entities with their escaped counterparts
		return input.replace(/[&<>"'/]/g, (match) => htmlEntities[match]);
	}
}
