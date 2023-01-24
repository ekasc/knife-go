package main

import (
	"encoding/base64"
)

// Encodes input to UTF-8
func EncodeBase64(input string) (string, error) {
	dst := make([]byte, base64.StdEncoding.EncodedLen(len(input)))
	base64.StdEncoding.Encode(dst, []byte(input))

	return string(dst), nil
}

// Decodes input from UTF-8
func DecodeBase64(input string) (string, error) {
	output, err := base64.StdEncoding.DecodeString(input)
	if err != nil {
		return "", err
	}

	return string(output), nil
}
