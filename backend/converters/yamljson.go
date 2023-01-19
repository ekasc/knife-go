package main

import (
	"encoding/json"

	"gopkg.in/yaml.v3"
)

func yamlToJson(i interface{}) interface{} {
	switch x := i.(type) {
	case map[interface{}]interface{}:
		m2 := map[string]interface{}{}
		for k, v := range x {
			m2[k.(string)] = yamlToJson(v)
		}
		return m2
	case []interface{}:
		for i, v := range x {
			x[i] = yamlToJson(v)
		}
	}
	return i
}

// Converts YAML string to JSON string. Will break if YAML string contains tabs instead of spaces.
func YAMLToJSON(yamal string) error {
	var body interface{}
	if err := yaml.Unmarshal([]byte(yamal), &body); err != nil {
		panic(err)
	}

	body = yamlToJson(body)
	b, err := json.Marshal(body)
	if err != nil {
		return err
	}

	var j any
	err = json.Unmarshal(b, &j)
	if err != nil {
		return err
	}

	if b, err = json.MarshalIndent(j, "", "  "); err != nil {
		return err
	}
	//fmt.Println(string(b))
	_ = b
	return nil
}

func JSONToYAML(jason string) error {
	var jasonObj map[string]interface{}
	json.Unmarshal([]byte(jason), &jasonObj)
	yamalData, _ := yaml.Marshal(jasonObj)
	// fmt.Println(string(yamalData))
	_ = yamalData
	return nil
}
