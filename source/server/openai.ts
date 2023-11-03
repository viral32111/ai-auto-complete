// Import third-party packages
import log4js from "log4js"

// Import our scripts
import { OPENAI_API_KEY, OPENAI_MODEL } from "./config.js"
import { isBlank } from "./helpers/string.js"
import OpenAI from "openai"

// Create the logger for this file
const log = log4js.getLogger( "openai" )

// Setup the OpenAI API client
log.debug( "Creating OpenAI API client..." )
const openai = new OpenAI( {
	apiKey: OPENAI_API_KEY,
} )
log.info( "Created OpenAI API client." )

// Generates a completion for a given prompt
const generateCompletion = async ( prompt: string ) => {

	// Call the API to generate a single completion
	log.debug( "Generating text completion for prompt '%s'...", prompt )
	const response = await openai.completions.create( {
		model: OPENAI_MODEL,
		prompt: prompt,
		max_tokens: 512, // Not too long!
		n: 1,
		user: "ai-auto-complete"
	} )
	log.debug( "Generated %d text completion(s): '%s' (%s).", response.choices.length, JSON.stringify( response.choices ), response.id )

	// Ensure we actually got a completion
	if ( response.choices.length <= 0 ) throw new Error( "No completion was generated" )
	if ( response.choices[ 0 ].text == undefined ) throw new Error( "Completion does not contain any text" )

	// Return the text of the completion
	return response.choices[ 0 ].text

}

// Shorthand for generating auto-completions for a search query
export const generateSearchCompletions = async ( topic: string, query: string, maximumAmount: number ) => {

	// Generate the completion text by giving the AI instructions
	const completion = await generateCompletion( [
		`Generate up to ${ maximumAmount } search engine auto-completion suggestions for the topic "${ topic }" that start with "${ query }".`,
		"Be concise with your suggestions.",
		"Write each of your suggestions on a separate line.",
		"Do not prefix your suggestions with the list number.",
		"Suffix your suggestions with appropriate grammar (e.g., question mark if they are questions).",
	].join( " " ) )

	// Divide the completion text up by lines with text - https://stackoverflow.com/a/2132045
	const autoCompletions = completion.split( "\n" ).map( value => value.trim() ).filter( line => !isBlank( line ) )

	// Warn if the AI generated too many completions
	if ( autoCompletions.length > maximumAmount ) log.warn( "Generated too many auto-completions! (expected %d, but got %d)", maximumAmount, autoCompletions.length )

	return autoCompletions

}
