import "../index.js"

// Import third-party packages
import chai, { use, assert } from "chai"

// Import our scripts
import { expressApp } from "../express.js"
import { StatusCode } from "../statusCode.js"
import { MAX_COMPLETIONS } from "../config.js"

// Enable plugins
use( ( await import( "chai-http" ) ).default )
use( ( await import( "chai-string" ) ).default )

suite( "API Routes", () => {
	test( "Topics", async () => {
		const response = await chai.request( expressApp ).get( "/api/topics" ).send()

		// Ensure the HTTP status code is 200 OK
		assert.equal( response.status, 200, "HTTP response status code is not 200 OK" )

		// Ensure the HTTP response content type is JSON
		assert.containIgnoreCase( response.header[ "content-type" ], "application/json", "HTTP response content type is not JSON" )

		// Ensure the HTTP response content is a JSON object
		assert.isObject( response.body, "HTTP response content is not an object" )
		assert.containsAllKeys( response.body, [ "code", "data" ], "JSON payload does not contain the expected properties" )

		// Ensure the status code is successful
		assert.isNumber( response.body[ "code" ], "JSON payload code property is not a number" )
		assert.equal( response.body[ "code" ], StatusCode.Success, "JSON payload code property is not success" )

		// Ensure the expected properties are present
		assert.isObject( response.body[ "data" ], "JSON payload data property is not an object" )
		assert.containsAllKeys( response.body[ "data" ], [ "topics" ], "JSON payload data property does not contain the expected properties" )

		// Ensure the topics are present
		assert.isArray( response.body[ "data" ][ "topics" ], "JSON payload topics property is not an array" )
		assert.isNotEmpty( response.body[ "data" ][ "topics" ], "JSON payload topics property is empty" )
	} )

	test( "Completions", async () => {
		const response = await chai.request( expressApp ).post( "/api/completions" ).send( {
			topic: "cooking",
			query: "How do I bake a"
		} )

		// Ensure the HTTP status code is 200 OK
		assert.equal( response.status, 200, "HTTP response status code is not 200 OK" )

		// Ensure the HTTP response content type is JSON
		assert.containIgnoreCase( response.header[ "content-type" ], "application/json", "HTTP response content type is not JSON" )

		// Ensure the HTTP response content is a JSON object
		assert.isObject( response.body, "HTTP response content is not an object" )
		assert.containsAllKeys( response.body, [ "code", "data" ], "JSON payload does not contain the expected properties" )

		// Ensure the status code is successful
		assert.isNumber( response.body[ "code" ], "JSON payload code property is not a number" )
		assert.equal( response.body[ "code" ], StatusCode.Success, "JSON payload code property is not success" )

		// Ensure the expected properties are present
		assert.isObject( response.body[ "data" ], "JSON payload data property is not an object" )
		assert.containsAllKeys( response.body[ "data" ], [ "completions" ], "JSON payload data property does not contain the expected properties" )

		// Ensure the completions are present
		assert.isArray( response.body[ "data" ][ "completions" ], "JSON payload completions property is not an array" )
		assert.isNotEmpty( response.body[ "data" ][ "completions" ], "JSON payload completions property is empty" )
		assert.isAtMost( response.body[ "data" ][ "completions" ].length, MAX_COMPLETIONS, "JSON payload completions property contains more items than expected" )
	} )
} )
