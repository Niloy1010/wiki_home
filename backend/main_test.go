package main

import ("testing"
"errors")

func TestNameFromURL(t *testing.T){
	var tests = []struct {
		input string
		expectedName string
		expectedError error
	}{
		{"localhost:9090/articles","", errors.New("Not Found")},
		{"localhost:9090/articles/wiki","wiki", nil},
		{"localhost:9090/articles/wiki23","wiki23", nil},
	}
	for _,test := range tests{
		if outputName,outputError := nameFromURL(test.input); outputName != test.expectedName {
			t.Error("test inputted",test.input,"test expected",test.expectedName,test.expectedError,"test outputted",outputName,outputError)
		}
	}
}