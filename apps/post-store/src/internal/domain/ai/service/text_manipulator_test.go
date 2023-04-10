package service

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestTextManipulator(t *testing.T) {
	var expectedOutput = "This is some text"
	t.Run("remove hashtags - no change for text without hashtags", func(t *testing.T) {
		input := "This is some text"
		output := RemoveHashTagsFn()(input)
		assert.Equal(t, expectedOutput, output)
	})

	t.Run("remove hashtags - removes single hashtag", func(t *testing.T) {
		input := "This is some #hashTag text"
		output := RemoveHashTagsFn()(input)
		assert.Equal(t, expectedOutput, output)
	})

	t.Run("remove hashtags - removes multiple hashtags and removes duplicated whitespaces", func(t *testing.T) {
		input := "This is some  #hashTag #other  #oneMore text"
		output := RemoveHashTagsFn()(input)
		assert.Equal(t, expectedOutput, output)
	})
	t.Run("remove hashtags - removes multiple hashtags and whitespace at the start and end", func(t *testing.T) {
		input := " #other This is some text #hashTag "
		output := RemoveHashTagsFn()(input)
		assert.Equal(t, expectedOutput, output)
	})

	t.Run("remove hashtags - removes multiple hashtags and quotes", func(t *testing.T) {
		input := " \"#other This is some text #hashTag\" "
		output := RemoveHashTagsFn()(input)
		assert.Equal(t, expectedOutput, output)
	})

	t.Run("remove hashtags - removes multiple hashtags and quotes without trailing spaces", func(t *testing.T) {
		input := "\"#other This is some text #hashTag\""
		output := RemoveHashTagsFn()(input)
		assert.Equal(t, expectedOutput, output)
	})
}
