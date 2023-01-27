package main

import (
	"net/url"
)

func EncodeURL(input string) string {
	return url.QueryEscape(input)
}

func DecodeURL(input string) (string, error) {
	output, err := url.QueryUnescape(input)
	if err != nil {
		return "", err
	}
	return output, nil
}
