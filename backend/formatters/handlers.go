package formatters

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/Joker/hpp"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
)

type Request struct {
	Type    string `json:"type"`
	Data    string `json:"data"`
	Options int    `json:"options"`
}

type Payload struct {
	Body string `json:"body"`
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

func HandlePrettyJSON(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload{FormatJSON(p.Data, p.Options)})
	}

}

func HandlePrettyHTML(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload{FormatHTML(p.Data)})
	}
}

func HandleMiniCSS(w http.ResponseWriter, r *http.Request) {
	var p Request
	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload{MiniCSS(p.Data)})
	}
}
