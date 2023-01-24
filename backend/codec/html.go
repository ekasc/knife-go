package main

import (
	"html"
)

// Encodes HTML
func EncodeHTML(input string) string {
	return html.EscapeString(input)
}

// Decodes HTML
func DecodeHTML(input string) string {
	return html.UnescapeString(input)
}
