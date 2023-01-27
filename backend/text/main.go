package main

import (
	"net/http"
)

func main() {
	i := MarkdownPreview(nil)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write(i)
	})
	http.ListenAndServe(":8080", nil)
}
