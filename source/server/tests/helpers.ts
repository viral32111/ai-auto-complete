// Import third-party packages
import { assert } from "chai"

// Import our scripts
import { randomArrayValue } from "../helpers/array.js"
import { isWhitespace } from "../helpers/whitespace.js"

suite( "Helper Functions", () => {
	test( "Is string whitespace", () => {
		assert.isTrue( isWhitespace( " " ), "String with a space is not whitespace" )
		assert.isTrue( isWhitespace( "\t" ), "String with a tab is not whitespace" )

		assert.isFalse( isWhitespace( "1" ), "String with a number is whitespace" )
		assert.isFalse( isWhitespace( "hello" ), "String with a word is whitespace" )
	} )
	
	test( "Random array value", () => {
		const testArray = [ "hello", "world", "testing", "123" ]
		const randomValue = randomArrayValue( testArray )

		assert.include( testArray, randomValue, "Randomly chosen value is not in the array" )
	} )
} )
