// Import third-party packages
import { config as dotenv } from "dotenv"
import log4js from "log4js"

// Import our scripts
import { isNullOrBlank } from "./helpers/string.js"

// Create the logger for this file
const log = log4js.getLogger( "config" )

// Load the environment variables file
log.debug( "Loading environment variables file..." )
const dotenvResult = dotenv()
if ( dotenvResult.error || !dotenvResult.parsed ) {
	log.debug( "Failed to load environment variables file! (%s)", dotenvResult.error?.message ) // This is debug level as we want to silently fail in production when the file doesn't exist
} else {
	log.debug( "Loaded %d environment variables.", Object.keys( dotenvResult.parsed ).length )
}

log.debug( "Checking environment variables..." )

// Browser directory
export const EXPRESS_BROWSER_DIRECTORY = process.env[ "EXPRESS_BROWSER_DIRECTORY" ] ?? "./browser"

// Express listen IP address
export const EXPRESS_ADDRESS = process.env[ "EXPRESS_ADDRESS" ] ?? "127.0.0.1"

// Express listen port number
export const expressPort = parseInt( process.env[ "EXPRESS_PORT" ] ?? "6900" )
if ( isNaN( expressPort ) ) {
	log.fatal( "Environment variable 'EXPRESS_PORT' is not a number!" )
	process.exit( 1 )
}
if ( expressPort < 0 || expressPort > 65535 ) {
	log.fatal( "Environment variable 'EXPRESS_PORT' is not a valid port number! (must be between 0 and 65535)" )
	process.exit( 1 )
}
export const EXPRESS_PORT = expressPort

// OpenAI API key
const openaiApiKey = process.env[ "OPENAI_API_KEY" ]
if ( isNullOrBlank( openaiApiKey ) ) {
	log.fatal( "Environment variable 'OPENAI_API_KEY' is not present or invalid!" )
	process.exit( 1 )
}
export const OPENAI_API_KEY = openaiApiKey

// OpenAI model
export const OPENAI_MODEL = process.env[ "OPENAI_MODEL" ] ?? "text-davinci-003"

// Maximum number of completions
export const MAX_COMPLETIONS = parseInt( process.env[ "MAX_COMPLETIONS" ] ?? "5" )

// Maximum character length of a search query
export const MAX_QUERY_LENGTH = parseInt( process.env[ "MAX_QUERY_LENGTH" ] ?? "100" )

log.debug( "All environment variables are present." )
