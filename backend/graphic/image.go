package main

import (
	"github.com/sunshineplan/imgconv"
)

func ConvertIMG() error {
	src, err := imgconv.Open("./forest.JPG")
	if err != nil {
		return err
	}
	imgconv.Save("forest2.png", src, &imgconv.FormatOption{Format: imgconv.PNG})
	if err != nil {
		return err
	}
	return nil
}
