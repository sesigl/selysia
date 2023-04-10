package main

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestSameValue_returnsSameValue(t *testing.T) {
	value := "value"
	sameValueResult := sameValue(value)

	assert.Equal(t, "value", sameValueResult)
}
