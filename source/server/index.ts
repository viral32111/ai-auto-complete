// Import third-party packages
import { default as express } from "express"
import { config as dotenv } from "dotenv"
import log4js from "log4js" // CommonJS module so can't import only what we need

// Import our scripts
import { randomArrayValue } from "./helpers/array.js"

// Configure the log4js package
log4js.configure( {
	appenders: { default: { type: "console" } },
	categories: { default: {
		appenders: [ "default" ],
		level: process.env.NODE_ENV === "production" ? "info" : "debug" // Do not log debug messages in production
	} }
} )

// Create the logger for this file
const log = log4js.getLogger( "index" )
log.info( "Hello %s world ❤", randomArrayValue( [ "beautiful", "gorgeous", "spectacular", "stunning", "incredible" ] ) )

// Fatally log any uncaught errors
process.on( "uncaughtException", ( error ) => {
	log.fatal( "%s: %s", error.name, error.message )
	if ( error.stack != null ) console.error( error.stack )

	process.exit( 1 )
} )

// Load the environment variables file
log.debug( "Loading environment variables file..." )
const dotenvResult = dotenv()
if ( dotenvResult.error != undefined || dotenvResult.parsed == undefined ) {
	log.debug( "Failed to load environment variables file! (%s)", dotenvResult.error?.message ) // This is debug level as we want to silently fail in production when the file doesn't exist
} else {
	log.debug( "Loaded %d environment variables.", Object.keys( dotenvResult.parsed ).length )
}

// Ensure all environment variables are valid
log.debug( "Checking environment variables..." )
const EXPRESS_BROWSER_DIRECTORY = process.env[ "EXPRESS_BROWSER_DIRECTORY" ] ?? "./browser"
const EXPRESS_ADDRESS = process.env[ "EXPRESS_ADDRESS" ] ?? "127.0.0.1"
const EXPRESS_PORT = parseInt( process.env[ "EXPRESS_PORT" ] ?? "6900" )
if ( isNaN( EXPRESS_PORT ) ) {
	log.fatal( "Environment variable 'EXPRESS_PORT' is not a number!" )
	process.exit( 1 )
}
if ( EXPRESS_PORT < 0 || EXPRESS_PORT > 65535 ) {
	log.fatal( "Environment variable 'EXPRESS_PORT' is not a valid port number! (must be between 0 and 65535)" )
	process.exit( 1 )
}
log.debug( "All environment variables are present." )

// Setup Express
log.debug( "Initialising Express application..." )
export const expressApp = express()
expressApp.use( express.json( {
	limit: 1024 * 1024 * 1, // 1 MiB
	type: "application/json",
	strict: true
} ) )
if ( log.isDebugEnabled() ) expressApp.use( ( request, response, next ) => {
	response.on( "finish", () => log.debug( `HTTP ${ request.method } ${ request.path } ${ JSON.stringify( request.body ) } => ${ response.statusCode }` ) )
	next()
} )
expressApp.use( express.static( EXPRESS_BROWSER_DIRECTORY ) )
log.info( "Initialised Express application." )

// Import our API routes
log.debug( "Importing API routes..." )
import( "./routes/topics.js" )
import( "./routes/completions.js" )
log.debug( "Imported API routes." )

// Start Express
log.debug( "Starting Express application..." )
const httpServer = expressApp.listen( EXPRESS_PORT, EXPRESS_ADDRESS, () => {
	log.info( `Express application listening on http://${ EXPRESS_ADDRESS }:${ EXPRESS_PORT }.` )
} )

// Stop Express on CTRL+C
process.once( "SIGINT", () => {
	log.info( "Stopping..." )

	log.debug( "Stopping Express application..." )
	httpServer.close( () => {
		log.info( "Stopped Express application." )
	} )
} )
