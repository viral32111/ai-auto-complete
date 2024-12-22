// Import our scripts
import { expressApp } from "../express.js"
import { StatusCode } from "../statusCode.js"

// The list of topics the client can choose from
export const topics = [
	"cooking",
	"programming",
	"science",
	"technology",
	"travel",
	"engineering",
	"art",
	"music",
	"movies",
	"books"
]

// API route for fetching the list of topics
expressApp.get( "/api/topics", ( _, response ) => response.json( {
	code: StatusCode.Success,
	data: {
		topics: topics
	}
} ) )
