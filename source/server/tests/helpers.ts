// Import third-party packages
import { assert } from "chai"

// Import our scripts
import { randomArrayValue } from "../helpers/array.js"
import { isBlank, isNullOrBlank } from "../helpers/string.js"

suite( "Helper Functions", () => {
	test( "Is string blank", () => {
		assert.isTrue( isBlank( " " ), "String with a space is not whitespace" )
		assert.isTrue( isBlank( "\t" ), "String with a tab is not whitespace" )

		assert.isFalse( isBlank( "1" ), "String with a number is whitespace" )
		assert.isFalse( isBlank( "hello" ), "String with a word is whitespace" )
	} )

	test( "Is string null or blank", () => {
		assert.isTrue( isNullOrBlank( null ), "Null string is not blank" )
		assert.isTrue( isNullOrBlank( undefined ), "Undefined string is not blank" )

		assert.isTrue( isNullOrBlank( " " ), "String with a space is not blank" )
		assert.isTrue( isNullOrBlank( "\t" ), "String with a tab is not blank" )

		assert.isFalse( isNullOrBlank( "1" ), "String with a number is blank" )
		assert.isFalse( isNullOrBlank( "hello" ), "String with a word is blank" )
	} )

	test( "Random array value", () => {
		const testArray = [ "hello", "world", "testing", "123" ]
		const randomValue = randomArrayValue( testArray )

		assert.include( testArray, randomValue, "Randomly chosen value is not in the array" )
	} )
} )
