package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
)

func FormatJSON(jason string, indent int) (string, error) {
	var out bytes.Buffer
	err := json.Indent(&out, []byte(jason), "", strings.Repeat(" ", indent))
	if err != nil {
		panic(err)
	}
	return out.String(), nil
}

func MiniCSS(cssString string) string {
	cssString = `body { 
		font-family: 'Helvetica';
		text-align: center; 
	}

	.main-box{ 
		display: flex;
		flex-wrap: wrap;
	}
	.one, .two, .three, .four { 
		flex-basis: 40%;
	}
	kbd {
		text-align: left; 
		display:inline-block;
		line-height:1.5;
	}

	div { 
		border: 1px lightgrey dotted;
		margin: 30px;
	}

	h1, h2 { 
		color: purple;
	}

	li + li { 
		color: pink;
	}

	h3 ~ p { 
		font-size: 40px;
	}

	section div { 
		color: blue;
	}
	`
	m := minify.New()
	m.AddFunc("text/css", css.Minify)

	minifiedCSS, err := m.String("text/css", cssString)
	if err != nil {
		fmt.Println(err)
	}

	return minifiedCSS
}
