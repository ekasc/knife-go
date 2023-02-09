package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/Joker/hpp"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
)

type Payload struct {
	Body string `json:"body"`
}

func Format(i Request) Payload {
	switch i.Type {
	case "json":
		return Payload{Body: FormatJSON(i.Data, i.Options)}
	case "html":
		return Payload{Body: FormatHTML(i.Data)}
	case "css":
		return Payload{Body: MiniCSS(i.Data)}
	}

	return Payload{}
}

// Prettier JSON
func FormatJSON(jason string, indent int) string {
	var out bytes.Buffer
	err := json.Indent(&out, []byte(jason), "", strings.Repeat(" ", indent))
	if err != nil {
		panic(err)
	}
	return out.String()

}

// Minifies CSS
func MiniCSS(cssString string) string {
	m := minify.New()
	m.AddFunc("text/css", css.Minify)

	minifiedCSS, err := m.String("text/css", cssString)
	if err != nil {
		fmt.Println(err)
	}

	return minifiedCSS
}

func FormatHTML(i string) string {
	bf := new(bytes.Buffer)
	hpp.Format(strings.NewReader(i), bf)

	return bf.String()
}
