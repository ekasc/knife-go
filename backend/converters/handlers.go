package converters

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"gopkg.in/yaml.v3"
)

type BaseRequest struct {
	Number string `json:"number"`
	Base   int    `json:"base"`
}

type Payload[P string | interface{}] struct {
	Body P `json:"body"`
}

type Base struct {
	Binary      string
	Decimal     string
	Octal       string
	Hexadecimal string
}

type Request struct {
	Type string `json:"type"`
	Data string `json:"data"`
}

func handleYTJ(i interface{}) interface{} {
	switch x := i.(type) {
	case map[interface{}]interface{}:
		m2 := map[string]interface{}{}
		for k, v := range x {
			m2[k.(string)] = handleYTJ(v)
		}
		return m2
	case []interface{}:
		for i, v := range x {
			x[i] = handleYTJ(v)
		}
	}
	return i
}

// Converts YAML string to JSON string. Will break if YAML string contains tabs instead of spaces.
func YAMLToJSON(yamal string) string {
	var body interface{}
	if err := yaml.Unmarshal([]byte(yamal), &body); err != nil {
		panic(err)
	}

	body = handleYTJ(body)
	b, err := json.MarshalIndent(body, "", "  ")
	if err != nil {
		log.Println(err)
	}
	return string(b)
}

func JSONToYAML(jason string) string {
	var jasonObj map[string]interface{}
	json.Unmarshal([]byte(jason), &jasonObj)
	yamalData, _ := yaml.Marshal(jasonObj)
	return string(yamalData)
}

func ConvertBase(number string, base int) Base {
	num, _ := strconv.ParseInt(number, base, 64)
	//body := strconv.FormatInt(num, newbase)
	return Base{
		Binary:      strconv.FormatInt(num, 2),
		Decimal:     strconv.FormatInt(num, 10),
		Octal:       strconv.FormatInt(num, 8),
		Hexadecimal: strconv.FormatInt(num, 16),
	}
}

func HandleYamlToJSON(w http.ResponseWriter, r *http.Request) {
	var p Request

	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload[string]{YAMLToJSON(p.Data)})
	}
}

func HandleJsonToYAML(w http.ResponseWriter, r *http.Request) {
	var p Request
	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload[string]{JSONToYAML(p.Data)})
	}
}

func HandleConvertBase(w http.ResponseWriter, r *http.Request) {
	var p BaseRequest
	if r.Method == "POST" {
		json.NewDecoder(r.Body).Decode(&p)
		json.NewEncoder(w).Encode(Payload[Base]{ConvertBase(p.Number, p.Base)})
	}
}
