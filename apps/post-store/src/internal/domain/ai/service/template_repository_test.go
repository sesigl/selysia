package service

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestTemplates(t *testing.T) {
	t.Run("remove hashtags - no change for text without hashtags", func(t *testing.T) {
		prompt, err := generateTweetForTextPrompt(GenerateTweetTemplateData{
			Actor: "developer",
			Topic: "Importance of SOLID principles",
		})

		assert.Nil(t, err)
		assert.Equal(t, "I want you to act as a developer. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The content you create uses line-breaks for improved readability. You only answer with the content only. My first suggestion request is to write a tweet with less than 280 characters \"Importance of SOLID principles\"", prompt)
	})
}
