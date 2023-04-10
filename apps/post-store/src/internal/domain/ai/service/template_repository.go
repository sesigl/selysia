package service

import (
	"bytes"
	validation "github.com/go-ozzo/ozzo-validation"
	"text/template"
)

type GenerateTweetTemplateData struct {
	Actor string
	Topic string
}

func generateTweetForTextPrompt(generateTweetTemplateData GenerateTweetTemplateData) (string, error) {

	err := validation.ValidateStruct(&generateTweetTemplateData,
		validation.Field(&generateTweetTemplateData.Actor, validation.Required, validation.Length(5, 10000)),
		validation.Field(&generateTweetTemplateData.Topic, validation.Required, validation.Length(5, 10000)),
	)
	if err != nil {
		return "", err
	}

	filledTemplate := template.Must(
		template.New("tweet").Parse("I want you to act as a {{.Actor}}. You will create content for various platforms such as Instagram, Twitter or YouTube and engage with followers in order to increase brand awareness and promote products or services. The content you create uses line-breaks for improved readability. You only answer with the content only. My first suggestion request is to write a tweet with less than 280 characters \"{{.Topic}}\""),
	)

	buf := &bytes.Buffer{}

	err = filledTemplate.Execute(buf, generateTweetTemplateData)
	if err != nil {
		return "", err
	}

	return buf.String(), nil
}
