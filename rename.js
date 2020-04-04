function rename(w, inputType, outputType) {
	let words = []
	let abbrs = []
	switch(inputType) {
		case "camelCase":
			words.push([]) // Start a new word
			let prevWasUpper = true // continue on abbreviations
			w.split("").forEach(ch => {
				if(ch == ch.toUpperCase() && !prevWasUpper) {
					// If the next word starts, transform array of chars to string
					words[words.length - 1] = words[words.length - 1].join("")
					let word = words[words.length - 1]

					// Save abbreviations to process them on output
					if(word.length > 1 && word == word.toUpperCase()) {
						abbrs.push(words.length - 1)
					}

					// Start a new word
					words.push([])
				}
				words[words.length - 1].push(ch)
				prevWasUpper = ch == ch.toUpperCase()
			})
			words[words.length - 1] = words[words.length - 1].join("")

			// save abbreviations to process them on output
			if(words.length != 0 && words[words.length - 1] == words[words.length - 1].toUpperCase()) {
				abbrs.push(words.length - 1)
			}

			// we may have an empty word if that was a PascalCase word
			if(words[0] == []) words.shift()
			break
		case "snake_case":
			words = w.split("_").filter(word => word?.length != 0)
			break
		case "kebab-case":
			words = w.split("-").filter(word => word?.length != 0)
			break
	}

	switch(outputType) {
		case "lower_snake_case":
		case "snake_case":
			return words.join("_").toLowerCase()

		case "UPPER_SNAKE_CASE":
			return words.join("_").toUpperCase()

		case "lowercase":
			return words.join("").toLowerCase()

		case "UPPERCASE":
			return words.join("").toUpperCase()

		case "camelCase":
			let word = words.shift()
			return (abbrs.includes(0) ? word.toUpperCase() : word.toLowerCase()) + words.map((w, i) => abbrs.includes(i) ? w.toUpperCase() : upperLeadingChar(w)).join("")

		case "PascalCase":
		case "UpperCamelCase":
			return words.map((w, i) => abbrs.includes(i) ? w.toUpperCase() : upperLeadingChar(w)).join("")

		case "lower-kebab-case":
		case "kebab-case":
			return words.join("-").toLowerCase()

		case "UPPER-KEBAB-CASE":
			return words.join("-").toUpperCase()

		case "camel_Snake_Case":
			return (abbrs.includes(0) ? word.toUpperCase() : word.toLowerCase()) + "_" + words.map((w, i) => abbrs.includes(i) ? w.toUpperCase() : upperLeadingChar(w)).join("_")

		case "Pascal_Snake_Case":
		case "Upper_Camel_Snake_Case":
			return words.map((w, i) => abbrs.includes(i) ? w.toUpperCase() : upperLeadingChar(w)).join("_")

		case "camel-Kebab-Case":
			return (abbrs.includes(0) ? word.toUpperCase() : word.toLowerCase()) + "-" + words.map((w, i) => abbrs.includes(i) ? w.toUpperCase() : upperLeadingChar(w)).join("-")

		case "Pascal-Kebab-Case":
		case "Upper-Camel-Kebab-Case":
			return words.map((w, i) => abbrs.includes(i) ? w.toUpperCase() : upperLeadingChar(w)).join("-")
	}
	function upperLeadingChar(word) {
		return word[0].toUpperCase() + word.substr(1).toLowerCase()
	}
}

module.exports = rename
module.exports.fromText = function(input, start, end, inputType, outputType) {
	let arr = input.split("\n").map(line => line.split(start)[1]?.split?.(end)?.[0]).filter(a => a)
	arr = arr.map(w => {
		return rename(w, inputType, outputType)		
	})
	return arr
}