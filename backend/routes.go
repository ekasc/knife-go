package main

import (
	"codec"
	"converters"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"

	"formatters"
)

func HandleRoutes() {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.URLFormat)
	r.Use(render.SetContentType(render.ContentTypeJSON))

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://*", "https://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: false,
	}))

	// Formatters
	r.Post("/format/json", formatters.HandlePrettyJSON)
	r.Post("/format/html", formatters.HandlePrettyHTML)
	r.Post("/format/css", formatters.HandleMiniCSS)

	// Converters
	r.Post("/convert/json", converters.HandleJsonToYAML)
	r.Post("/convert/yaml", converters.HandleYamlToJSON)
	r.Post("/convert/base", converters.HandleConvertBase)

	// Codec
	r.Post("/encode/base64", codec.HandleEncodeBase64)
	r.Post("/decode/base64", codec.HandleDecodeBase64)
	r.Post("/encode/html", codec.HandleEncodeHTML)
	r.Post("/decode/html", codec.HandleDecodeHTML)
	r.Post("/encode/url", codec.HandleEncodeURL)
	r.Post("/decode/url", codec.HandleDecodeURL)
	r.Post("/decode/jwt", codec.HandleDecodeJWT)

	log.Println("Listening on port 8080")

	http.ListenAndServe(":8080", r)
}
