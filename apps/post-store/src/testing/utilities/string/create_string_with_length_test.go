package string

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateStringWithLength(t *testing.T) {
	t.Run("creating string with length zero", func(t *testing.T) {
		result := CreateStringWithLength(0)
		assert.Equal(t, "", result)
	})

	t.Run("creating string with length ten", func(t *testing.T) {
		result := CreateStringWithLength(10)
		assert.Equal(t, "aaaaaaaaaa", result)
	})
}
