package main

import (
	"fmt"
)

func main() {
	jason := `Services:
    -   Orders:
        -   ID: $save ID1
            SupplierOrderCode: $SupplierOrderCode
        -   ID: $save ID2
            SupplierOrderCode: 111111`

	yamal := `{
	  "Services": [
		{
		  "Orders": [
			{
			  "ID": "$save ID1",
			  "SupplierOrderCode": "$SupplierOrderCode"},
			{
			  "ID": "$save ID2",
			  "SupplierOrderCode": 111111
			}
		  ]
		}
	  ]
	}
`
	err := YAMLToJSON(jason)
	if err != nil {
		fmt.Println(err)
	}
	err = JSONToYAML(yamal)
	if err != nil {
		fmt.Println(err)
	}
	body := Convert("10",10,16)
	fmt.Println(body)
}
