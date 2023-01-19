package main

import (
	"strconv"
)

type Base struct {
	Binary      string
	Decimal     string
	Octal       string
	Hexadecimal string
}

func Convert(number string, base int, newbase int) interface{} {
	num, _ := strconv.ParseInt(number, base, 64)
	//body := strconv.FormatInt(num, newbase)
	return Base{
		Binary:      strconv.FormatInt(num, 2),
		Decimal:     strconv.FormatInt(num, 10),
		Octal:       strconv.FormatInt(num, 8),
		Hexadecimal: strconv.FormatInt(num, 16),
	}
}
