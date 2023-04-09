// Import third-party packages
import { Configuration, OpenAIApi } from "openai"
import log4js from "log4js"

// Import our scripts
import { OPENAI_API_KEY } from "./config.js"
import { isBlank } from "./helpers/string.js"

// Create the logger for this file
const log = log4js.getLogger( "openai" )

// Setup the OpenAI API client
log.debug( "Creating OpenAI API client..." )
const openai = new OpenAIApi( new Configuration( {
	apiKey: OPENAI_API_KEY,
} ) )
log.info( "Created OpenAI API client." )

// Generates a completion for a given prompt
const generateCompletion = async ( prompt: string ) => {

	// Call the API to generate a single completion
	log.debug( "Generating completion for prompt '%s'...", prompt )
	const response = await openai.createCompletion( {
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 512, // Not too long!
		n: 1,
		user: "ai-auto-complete"
	} )
	log.debug( "Generated %d completions: '%s' (%s).", response.data.choices.length, response.data.choices.join( "', '" ), response.data.id )

	log.trace( JSON.stringify( response.data ) )

	// Ensure we actually got a completion
	if ( response.data.choices.length <= 0 ) throw new Error( "No completion was generated" )
	if ( response.data.choices[ 0 ].text == undefined ) throw new Error( "Completion does not contain any text" )

	// Return the text of the completion
	return response.data.choices[ 0 ].text

}

// Shorthand for generating auto-completions for a search query
export const generateSearchCompletions = async ( topic: string, query: string, maximumAmount: number ) => {

	// Generate the completion text by giving the AI instructions
	const completion = await generateCompletion( [
		`Generate up to ${ maximumAmount } search engine auto-completion suggestions for the topic "${ topic }" that start with "${ query }".`,
		"Be concise with your suggestions.",
		"Write each of your suggestions on a separate line."
	].join( " " ) )

	// Divide the completion text up by lines - https://stackoverflow.com/a/2132045
	const autoCompletions = completion.split( "\n" ).filter( line => isBlank( line ) === false )

	// Warn if the AI generated too many completions
	if ( autoCompletions.length > maximumAmount ) log.warn( "Generated too many auto-completions! (expected %d, but got %d)", maximumAmount, autoCompletions.length )

	return autoCompletions

}
