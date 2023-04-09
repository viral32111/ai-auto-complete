// Import third-party packages
import log4js from "log4js"

// Import our scripts
import { CompletionsRequestPayload, CompletionsResponsePayload } from "../interfaces/completions.js"
import { isBlank } from "../helpers/string.js"
import { expressApp } from "../index.js"
import { StatusCode } from "../statusCode.js"
import { topics } from "./topics.js"
import { generateSearchCompletions } from "../openai.js"
import { MAX_COMPLETIONS, MAX_QUERY_LENGTH } from "../config.js"

// Create the logger for this file
const log = log4js.getLogger( "routes/completions" )

// API route for generating the auto-completions
expressApp.post( "/api/completions", async ( request, response ) => {

	// Ensure the topic was provided
	if ( !request.body.topic ) return response.status( 400 ).json( {
		code: StatusCode.MissingProperty,
		data: { parameter: "topic" }
	} )
	log.debug( "Request provided topic property '%s'.", request.body.topic )

	// Ensure the search query was provided
	if ( !request.body.query ) return response.status( 400 ).json( {
		code: StatusCode.MissingProperty,
		data: { parameter: "query" }
	} )
	log.debug( "Request provided query property '%s'.", request.body.query )

	// Ensure the topic is a string
	if ( typeof( request.body[ "topic" ] ) !== "string" ) return response.status( 400 ).json( {
		code: StatusCode.InvalidPropertyType,
		data: { parameter: "topic" }
	} )
	log.debug( "Request topic property '%s' is a string.", request.body.topic )

	// Ensure the search query is a string
	if ( typeof( request.body[ "query" ] ) !== "string" ) return response.status( 400 ).json( {
		code: StatusCode.InvalidPropertyType,
		data: { parameter: "query" }
	} )
	log.debug( "Request query property '%s' is a string.", request.body.query )

	// Convert the request body to the payload structure
	const requestPayload = request.body as CompletionsRequestPayload
	log.debug( "Cast request to completions request payload." )

	// Ensure the topic is not blank
	if ( isBlank( requestPayload.query ) ) return response.status( 400 ).json( {
		code: StatusCode.EmptyTopic,
		data: { topic: requestPayload.topic }
	} )
	log.debug( "Request topic '%s' is not blank.", requestPayload.topic )

	// The query can be blank, but we'll trim it anyway
	requestPayload.query = requestPayload.query.trim()
	log.debug( "Trimmed request query '%s'.", requestPayload.query )

	// Ensure the query is not too long
	if ( requestPayload.query.length > MAX_QUERY_LENGTH ) return response.status( 400 ).json( {
		code: StatusCode.QueryTooLong,
		data: {
			query: requestPayload.query,
			maxLength: MAX_QUERY_LENGTH
		}
	} )
	log.debug( "Request query '%s' is not too long.", requestPayload.query )

	// Ensure the topic exists in the list
	if ( !topics.includes( requestPayload.topic ) ) return response.status( 400 ).json( {
		code: StatusCode.UnknownTopic,
		data: { topic: requestPayload.topic }
	} )
	log.debug( "Request topic '%s' is valid.", requestPayload.topic )

	// Create the payload to send back to the client
	const responsePayload: CompletionsResponsePayload = {
		topic: requestPayload.topic,
		completions: []
	}

	// Attempt to generate the auto-completions
	try {
		log.info( "Generating up to %d search auto-completions for topic '%s' with query '%s'...", MAX_COMPLETIONS, requestPayload.topic, requestPayload.query )
		responsePayload.completions = await generateSearchCompletions( requestPayload.topic, requestPayload.query, MAX_COMPLETIONS )
		log.info( "Generated %d search auto-completions: '%s'", responsePayload.completions.length, responsePayload.completions.join( "', '" ) )
	} catch ( error ) {
		log.error( "Failed to generate auto-completions! (%s)", error instanceof Error ? error.message : error )

		return response.status( 500 ).json( {
			code: StatusCode.GenerationFailure,
			data: {}
		} )
	}

	// Return the response payload
	response.json( {
		code: StatusCode.Success,
		data: responsePayload
	} )

} )
