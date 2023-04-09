// Simple function to check if a string is all whitespace using a regular expression
export const isBlank = ( string: string ) => /^\s*$/.test( string )

// Checks if a string is null/undefined, or all whitespace characters
export const isNullOrBlank = ( value: string | null | undefined ): value is null | undefined => typeof( value ) !== "string" || isBlank( value )
