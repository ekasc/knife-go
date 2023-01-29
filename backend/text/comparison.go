package main

import (
	"github.com/sergi/go-diff/diffmatchpatch"
)

// Compares two input texts
func CompareText(input string, input_2 string) string {
	i := diffmatchpatch.New()
	diffs := i.DiffMain(input, input_2, false)
	text := i.DiffPrettyHtml(diffs)
	return text
}
