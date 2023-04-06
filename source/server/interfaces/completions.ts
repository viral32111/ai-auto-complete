// Structure of the request JSON payload
export interface CompletionsRequestPayload {
	topic: string,
	query: string
}

// Structure of the response JSON payload
export interface CompletionsResponsePayload {
	topic: string,
	completions: string[]
}
