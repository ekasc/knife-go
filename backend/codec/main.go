package main

import "fmt"

func main() {
	i, err := DecodeJWT("")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(i)
}
