package codec

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"formatters"
	"html"
	"log"
	"net/http"
	"net/url"
	"strings"
)

type DecodedToken struct {
	Header   string `json:"header"`
	JPayload string `json:"payload"`
}

type Request struct {
	Type string `json:"type"`
	Data string `json:"data"`
}

type Payload[P string | DecodedToken] struct {
	Body P `json:"body"`
}

// Encodes input to UTF-8
func EncodeBase64(input string) (string, error) {
	dst := make([]byte, base64.StdEncoding.EncodedLen(len(input)))
	base64.StdEncoding.Encode(dst, []byte(input))

	token := strings.Split(input, ".")
	header, err := base64.RawURLEncoding.DecodeString(token[0])
	payload, err := base64.RawURLEncoding.DecodeString(token[1])
	if err != nil {
		fmt.Println(err)
	}
	resp := make(map[string]interface{}, 0)
	resp["header"] = string(header)
	resp["payload"] = string(payload)
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

// Encodes HTML
func EncodeHTML(input string) string {
	return html.EscapeString(input)
}

// Decodes HTML
func DecodeHTML(input string) string {
	return html.UnescapeString(input)
}

// Encodes URL
func EncodeURL(input string) string {
	return url.QueryEscape(input)
}

// Decodes URL
func DecodeURL(input string) (string, error) {
	output, err := url.QueryUnescape(input)
	if err != nil {
		return "", err
	}
	return output, nil
}

// Decode JWT
func DecodeJWT(tokenString string) (map[string][]byte, error) {
	token := strings.Split(tokenString, ".")
	header, err := base64.RawURLEncoding.DecodeString(token[0])
	payload, err := base64.RawURLEncoding.DecodeString(token[1])
	if err != nil {
		return nil, err
	}
	var output = make(map[string][]byte)
	output["header"] = header
	output["payload"] = payload

	return output, nil
}

func HandleEncodeBase64(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)

		if resp, err := EncodeBase64(p.Data); err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		} else {
			json.NewEncoder(w).Encode(Payload[string]{Body: resp})
		}

	}
}

func HandleDecodeBase64(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)

		if resp, err := DecodeBase64(p.Data); err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		} else {
			json.NewEncoder(w).Encode(Payload[string]{Body: resp})
		}

	}
}

func HandleEncodeHTML(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload[string]{Body: EncodeHTML(p.Data)})
	}
}

func HandleDecodeHTML(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload[string]{Body: DecodeHTML(p.Data)})
	}
}
func HandleEncodeURL(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload[string]{Body: EncodeURL(p.Data)})
	}
}

func HandleDecodeURL(w http.ResponseWriter, r *http.Request) {
	var p Request

	json.NewDecoder(r.Body).Decode(&p)
	if resp, err := DecodeURL(p.Data); err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		json.NewEncoder(w).Encode(Payload[string]{Body: resp})
	}
}

func HandleDecodeJWT(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		if token, err := DecodeJWT(p.Data); err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		} else {
			json.NewEncoder(w).Encode(Payload[DecodedToken]{
				Body: DecodedToken{
					Header:   formatters.FormatJSON(string(token["header"]), 2),
					JPayload: formatters.FormatJSON(string(token["payload"]), 2),
				},
			})

		}
	}

}
