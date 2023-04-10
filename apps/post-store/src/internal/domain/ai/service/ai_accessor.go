package service

import (
	"fmt"
	"selysia.com/post-store/src/internal/infrastructure/openai"
)

func NewAiAccessor() Accessor {
	return Accessor{
		openAiClient: openai.NewOpenAiClient(),
	}
}

type Accessor struct {
	openAiClient openai.Client
}

const maxLen = 280

func (ai Accessor) GenerateTweetAboutText(text string, actor string) (string, error) {
	generatedTweetTextPrompt, err := generateTweetForTextPrompt(GenerateTweetTemplateData{
		Actor: actor,
		Topic: text,
	})
	if err != nil {
		return "", fmt.Errorf("tweet generation failed: %w", err)
	}

	openAiClient := openai.NewOpenAiClient()
	response := openAiClient.Ask(generatedTweetTextPrompt)

	responseWithoutHashTags := removeHashTags(response)

	return ai.ensureMaxLength(responseWithoutHashTags), nil
}

func (ai Accessor) ensureMaxLength(responseWithoutHashTags string) string {
	finalResponse := responseWithoutHashTags
	contentLen := len(finalResponse)
	if contentLen > maxLen {
		finalResponse = ai.openAiClient.Shorten(finalResponse, maxLen)
	}
	return finalResponse
}
