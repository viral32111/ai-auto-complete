// Import third-party packages
import { default as express } from "express"
import log4js from "log4js" // CommonJS module so can't import only what we need

// Import our scripts
import { randomArrayValue } from "./helpers/array.js"

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
const { EXPRESS_ADDRESS, EXPRESS_PORT, EXPRESS_BROWSER_DIRECTORY } = await import( "./config.js" )

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
