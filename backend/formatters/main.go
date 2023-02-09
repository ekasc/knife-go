package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Request struct {
	Type    string `json:"type"`
	Data    string `json:"data"`
	Options int    `json:"options"`
}

func main() {
	http.HandleFunc("/format", format1)

	http.ListenAndServe(":8080", nil)
}

func format1(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "POST" {
		p := Request{}

		if r.Body == nil {
			fmt.Println("body is empty")
		}

		dd := json.NewDecoder(r.Body)
		dd.UseNumber()
		err := dd.Decode(&p)
		if err != nil {
			fmt.Printf("err: %v\n", err)
		}
		defer r.Body.Close()

		payload := Format(p)

		json.NewEncoder(w).Encode(payload)
	}
}
