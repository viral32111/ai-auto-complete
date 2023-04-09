// Simple function to check if a string is all whitespace using a regular expression
export const isBlank = ( string: string ) => /^\s*$/.test( string )

// Checks if a string is null/undefined, or all whitespace characters
export const isNullOrBlank = ( string: string | null | undefined ) => string === null || string === undefined || isBlank( string )
