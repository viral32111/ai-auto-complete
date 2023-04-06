// Import third-party packages
import log4js from "log4js"

// Import our scripts
import { CompletionsRequestPayload, CompletionsResponsePayload } from "../interfaces/completions.js"
import { isWhitespace } from "../helpers/whitespace.js"
import { expressApp } from "../index.js"
import { StatusCode } from "../statusCode.js"
import { topics } from "./topics.js"

// Configuration
//const COMPLETIONS_COUNT = 5 // The number of completions to generate
const QUERY_MAX_LENGTH = 100 // The maximum number of characters allowed in a query

// Create the logger for this file
const log = log4js.getLogger( "routes/completions" )

// API route for generating the auto-completions
expressApp.post( "/api/completions", ( request, response ) => {

	// Ensure the topic was provided
	if ( request.body.topic === undefined ) return response.status( 400 ).json( {
		code: StatusCode.MissingProperty,
		data: { parameter: "topic" }
	} )

	// Ensure the search query was provided
	if ( request.body.query === undefined ) return response.status( 400 ).json( {
		code: StatusCode.MissingProperty,
		data: { parameter: "query" }
	} )

	// Ensure the topic is a string
	if ( typeof( request.body[ "topic" ] ) !== "string" ) return response.status( 400 ).json( {
		code: StatusCode.InvalidPropertyType,
		data: { parameter: "topic" }
	} )

	// Ensure the search query is a string
	if ( typeof( request.body[ "query" ] ) !== "string" ) return response.status( 400 ).json( {
		code: StatusCode.InvalidPropertyType,
		data: { parameter: "query" }
	} )

	// Convert the request body to the payload structure
	const requestPayload = request.body as CompletionsRequestPayload

	// Ensure the topic is not blank
	if ( isWhitespace( requestPayload.query ) === true ) return response.status( 400 ).json( {
		code: StatusCode.EmptyTopic,
		data: { topic: requestPayload.topic }
	} )

	// The query can be blank, but we'll trim it anyway
	requestPayload.query = requestPayload.query.trim()

	// Ensure the query is not too long
	if ( requestPayload.query.length > QUERY_MAX_LENGTH ) return response.status( 400 ).json( {
		code: StatusCode.QueryTooLong,
		data: {
			query: requestPayload.query,
			maxLength: QUERY_MAX_LENGTH
		}
	} )

	// Ensure the topic exists in the list
	if ( topics.includes( requestPayload.topic ) === false ) return response.status( 400 ).json( {
		code: StatusCode.UnknownTopic,
		data: { topic: requestPayload.topic }
	} )

	// Create the payload to send back to the client
	const responsePayload: CompletionsResponsePayload = {
		topic: requestPayload.topic,
		completions: []
	}

	// TODO
	log.debug( "Topic: '%s'", requestPayload.topic )
	log.debug( "Query: '%s'", requestPayload.query )
	response.json( {
		code: StatusCode.Success,
		data: responsePayload
	} )

} )
