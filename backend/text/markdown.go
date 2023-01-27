package main

import (
	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/parser"
	"github.com/microcosm-cc/bluemonday"
)

// Renders a markdown preview
func MarkdownPreview(input []byte) []byte {
	return mdToHTML(input)
}

// Converts .md input to html
func mdToHTML(input []byte) []byte {
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs
	parser := parser.NewWithExtensions(extensions)
	unsafeOutput := markdown.ToHTML(input, parser, nil)
	output := bluemonday.UGCPolicy().SanitizeBytes(unsafeOutput)
	return output
}
