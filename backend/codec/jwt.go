package main

import (
	"encoding/base64"
	"strings"
)

func DecodeJWT(tokenString string) (map[string]string, error) {
	token := strings.Split(tokenString, ".")
	header, err := base64.RawURLEncoding.DecodeString(token[0])
	payload, err := base64.RawURLEncoding.DecodeString(token[1])
	if err != nil {
		return nil, err
	}
	var output = make(map[string]string)
	output["header"] = string(header)
	output["payload"] = string(payload)

	return output, nil
}
