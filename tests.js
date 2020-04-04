let rename = require("./rename")
let assert = require("assert")

function assertEq(arr1, arr2) {
	assert(arr1.length == arr2.length && arr1.every((el, i) => el == arr2[i]))
}

// camelCase and PascalCase
let input1 = `
	Some useless info and Var{First}
	[42:13:37] Var{SecondVar}
	nothing useful here
	Var{oneMoreWord}
	Var{ABBR}
`

// snake_case
let input2 = `%snake_case%
	empty
	it can parse "%CAPS_LOCKED_WORDS%"
	and %_something__strange_____%
`


// kebab-case
let input3 = `%kebab-case%
	empty
	it can parse "%CAPS-LOCKED-WORDS%"
	and %-something--strAnge-----%
`

assert(rename("camelCaseVar", "camelCase", "kebab-case") == "camel-case-var")
assertEq(rename.fromText(input1, "Var{", "}", "camelCase", "camelCase"), ["first", "secondVar", "oneMoreWord", "ABBR"])
assertEq(rename.fromText(input1, "Var{", "}", "camelCase", "snake_case"), ["first", "second_var", "one_more_word", "abbr"])
assertEq(rename.fromText(input1, "Var{", "}", "camelCase", "UPPER_SNAKE_CASE"), ["FIRST", "SECOND_VAR", "ONE_MORE_WORD", "ABBR"])
assertEq(rename.fromText(input1, "Var{", "}", "camelCase", "kebab-case"), ["first", "second-var", "one-more-word", "abbr"])
assertEq(rename.fromText(input1, "Var{", "}", "camelCase", "UPPER-KEBAB-CASE"), ["FIRST", "SECOND-VAR", "ONE-MORE-WORD", "ABBR"])
assertEq(rename.fromText(input2, "%", "%", "snake_case", "Pascal-Kebab-Case"), ["Snake-Case", "Caps-Locked-Words", "Something-Strange"])
assertEq(rename.fromText(input3, "%", "%", "kebab-case", "Pascal_Snake_Case"), ["Kebab_Case", "Caps_Locked_Words", "Something_Strange"])