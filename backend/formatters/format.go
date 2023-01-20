package main

import (
	"bytes"
	"encoding/json"
	"strings"
)

func FormatJSON(jason string, indent int) (string, error) {
	var out bytes.Buffer
	err := json.Indent(&out, []byte(jason), "", strings.Repeat(" ", indent))
	if err != nil {
		panic(err)
	}
	return out.String(), nil

	//if i, err := json.MarshalIndent(jason, "", strings.Repeat(" ", indent)); err != nil {
	//	return "", err
	//} else {
	//	return string(i), nil
	//}
}
