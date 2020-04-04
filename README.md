# Rename-js
Rename your variables and other names in order to match your language's naming conventions

## Renaming
rename(varName, inputType, outputType)
```js
let rename = require("./rename")

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
