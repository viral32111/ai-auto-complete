// Import third-party packages
import { default as express } from "express"
import log4js from "log4js" // CommonJS module so can't import only what we need

// Create the logger for this file
const log = log4js.getLogger( "express" )

// Load the configuration
const { EXPRESS_BROWSER_DIRECTORY } = await import( "./config.js" )

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
