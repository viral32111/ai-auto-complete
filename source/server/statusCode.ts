// Response status codes for API routes
export enum StatusCode {
	Success = 0,

	MissingProperty = 1,
	InvalidPropertyType = 2,

	EmptyTopic = 3,
	QueryTooLong = 4,
	UnknownTopic = 5
}
