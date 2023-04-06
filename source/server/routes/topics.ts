// Import our scripts
import { expressApp } from "../index.js"

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
	"topics": topics
} ) )
