// Import third-party packages
import log4js from "log4js" // CommonJS module so can't import only what we need

// Import our scripts
import { randomArrayValue } from "./helpers/array.js"
import { expressApp } from "./express.js"

// Configure the log4js package
log4js.configure( {
	appenders: { default: { type: "console" } },
	categories: { default: {
		appenders: [ "default" ],
		level: process.env.NODE_ENV === "production" ? "info" : "trace" // Do not log debug messages in production
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

// Load the configuration
const { EXPRESS_ADDRESS, EXPRESS_PORT } = await import( "./config.js" )

// Import our API routes
log.debug( "Importing API routes..." )
try {
	await import( "./routes/topics.js" )
	await import( "./routes/completions.js" )
} catch ( error ) {
	log.error( "Failed to import API routes!", error?.toString() )
	process.exit( 1 )
}
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
