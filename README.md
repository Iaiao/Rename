# Rename
Rename your variables and other names in order to follow your language's naming conventions

## Renaming
rename(varName, inputType, outputType)
```js
const rename = require("rename")

rename("my_snake_case_variable", "snake_case", "camelCase") // => mySnakeCaseVariable
```

inputType's:
- "camelCase" (also parses PascalCase and working with ABBReviations)
- "snake_case" (also parses UPPER_CASE_and_Mixed_Case)
- "kebab-case" (also parses UPPER-CASE-and-Mixed-Case)

outputType's:
- "snake_case" ("lower_snake_case")
- "UPPER_SNAKE_CASE"
- "lowercase",
- "UPPERCASE",
- "camelCase",
- "PascalCase" ("UpperCamelCase")
- "kebab-case" ("lower-kebab-case")
- "UPPER-KEBAB-CASE"
- "camel_Snake_Case"
- "Pascal_Snake_Case" ("Upper_Camel_Snake_Case")
- "camel-Kebab-Case"
- "Pascal-Kebab-Case" ("Upper-Camel-Kebab-Case")

## Importing from text
```js
const rename = require("rename")

let logs = `
  [42:00:00] Info: {var_1}
  [01:33:70] Info: {var_2}
  [04:03:02] Info: {var_three}
`

console.log(rename.fromText(logs, "{", "}", "snake_case", "camelCase")) // [var1, var2, varThree]
//                    input ^^^^   ^    ^    ^^^^^^^^^^^|  ^^^^^^^^^- output type
//                 starting char(s)|    |ending char(s) ^-input type
