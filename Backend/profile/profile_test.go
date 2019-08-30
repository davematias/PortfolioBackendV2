package main

import (
	"testing"
)

func TestHandler(t *testing.T) {
	request := Request{}
	Handler(request)
}
