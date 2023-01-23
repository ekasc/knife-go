package main

import "fmt"

func main() {
	jason := `{"Services":[{"Orders":[{"ID":"$save ID1","SupplierOrderCode":"$SupplierOrderCode"},{"ID":"$save ID2","SupplierOrderCode":111111}]}]}`
	i, err := FormatJSON(jason, 3)
	if err != nil {
		fmt.Println(err)
	}
	_ = i

	i = MiniCSS("")
	if err != nil {
		fmt.Println(err)
	}

	i = FormatHTML("")
}
