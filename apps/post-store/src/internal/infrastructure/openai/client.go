package openai

import (
	"context"
	"fmt"

	"github.com/sashabaranov/go-openai"
)

func NewOpenAiClient() Client {
	return Client{}
}

type Client struct {
}

func (Client) Ask(input string) string {

	client := openai.NewClient("_")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: input,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return ""
	}

	return resp.Choices[0].Message.Content
}

func (c Client) Shorten(text string, maxLen int) string {
	client := openai.NewClient("_")
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: fmt.Sprintf("Reduce the content \"%s\" to less than %v characters", text, maxLen),
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return ""
	}

	return resp.Choices[0].Message.Content
}
