import express from "express"
import { config as dotenv } from "dotenv"
import log4js from "log4js"

log4js.configure( {
	appenders: {
		default: {
			type: "console"
		}
	},
	categories: {
		default: {
			appenders: [ "default" ],
			level: process.env.NODE_ENV === "production" ? "info" : "debug"
		}
	}
} )

/*log4js.shutdown( () => {
	process.exit( 1 )
} )*/

const log = log4js.getLogger( "index" )
log.info( "Hello beautiful world ❤" )

process.on( "uncaughtException", ( error ) => {
	log.fatal( "%s: %s", error.name, error.message )
	if ( error.stack != null ) console.error( error.stack )
} )

log.debug( "Loading environment variables file..." )
const dotenvResult = dotenv()
if ( dotenvResult.error != undefined || dotenvResult.parsed == undefined ) {
	log.debug( "Failed to load environment variables file! (%s)", dotenvResult.error?.message )
} else {
	log.debug( "Loaded %d environment variables.", Object.keys( dotenvResult.parsed ).length )
}

log.debug( "Checking environment variables..." )
const EXPRESS_BROWSER_DIRECTORY = process.env[ "EXPRESS_BROWSER_DIRECTORY" ] ?? "./browser"
const EXPRESS_ADDRESS = process.env[ "EXPRESS_ADDRESS" ] ?? "127.0.0.1"
const EXPRESS_PORT = parseInt(  process.env[ "EXPRESS_PORT" ] ?? "6900" )
if ( isNaN( EXPRESS_PORT ) ) {
	log.fatal( "Environment variable 'EXPRESS_PORT' is not a number!" )
	process.exit( 1 )
}
if ( EXPRESS_PORT < 0 || EXPRESS_PORT > 65535 ) {
	log.fatal( "Environment variable 'EXPRESS_PORT' is not a valid port number! (must be between 0 and 65535)" )
	process.exit( 1 )
}
log.debug( "All environment variables are present." )

log.debug( "Initialising Express application..." )
const expressApp = express()
expressApp.use( express.json() )
expressApp.use( ( request, response, next ) => {
	response.on( "finish", () => {
		log.debug( `HTTP ${ request.method } ${ request.path } ${ request.body } => ${ response.statusCode }` )
	} )

	next()
} )
expressApp.use( express.static( EXPRESS_BROWSER_DIRECTORY ) )
log.info( "Initialised Express application." )

expressApp.get( "/", ( request, response ) => {
	response.send( "Hello world!" )
} )

const httpServer = expressApp.listen( EXPRESS_PORT, EXPRESS_ADDRESS, async () => {
	log.info( `Express application listening on http://${ EXPRESS_ADDRESS }:${ EXPRESS_PORT }.` )
} )

process.once( "SIGINT", async () => {
	log.info( "Stopping..." )

	log.debug( "Stopping Express application..." )
	httpServer.close( () => {
		log.info( "Stopped Express application." )
	} )
} )