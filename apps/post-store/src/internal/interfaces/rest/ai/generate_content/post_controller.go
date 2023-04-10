package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"math"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/interfaces/rest"
	openapi "selysia.com/post-store/src/server/go"
)

func newGenerateContentPostController() rest.Controller[openapi.AiContentResponse] {
	postApplicationService, err := internal.InitializeAiApplicationService()
	if err != nil {
		panic(err)
	}

	return rest.NewController(rest.Controller[openapi.AiContentResponse]{
		DomainDataAccessor: generateContentPostControllerHandler{
			AiApplicationService: postApplicationService,
		},
		SuccessResponseCode: rest.Success,
	})
}

type generateContentPostControllerHandler struct {
	AiApplicationService application.AiApplicationService
}

func (handler generateContentPostControllerHandler) Execute(request events.APIGatewayProxyRequest, authUserId string) (openapi.AiContentResponse, error) {
	var aiContentPostRequest openapi.AiContentPostRequest
	err := json.Unmarshal([]byte(request.Body), &aiContentPostRequest)
	if err != nil {
		return openapi.AiContentResponse{}, fmt.Errorf("could unmarshal body to create post request object: %w", err)
	}

	if err := openapi.AssertAiContentPostRequestRequired(aiContentPostRequest); err != nil {
		return openapi.AiContentResponse{}, fmt.Errorf("request object validation failed: %w", err)
	}

	createdContentReply, err := handler.AiApplicationService.CreateContentAbout(aiContentPostRequest.Text, aiContentPostRequest.Actor, authUserId)
	if err != nil {
		return openapi.AiContentResponse{}, fmt.Errorf("content generation failed failed: %w", err)
	}

	var restResponse = openapi.AiContentResponse{
		Text: createdContentReply.Content,
		RateLimit: openapi.AiContentResponseRateLimit{
			TimeUntilRefreshSeconds: int32(math.Round(createdContentReply.RateLimit.TimeUntilRefresh.Seconds())),
			Usage:                   int32(createdContentReply.RateLimit.Usage),
			Limit:                   int32(createdContentReply.RateLimit.Limit),
		},
	}

	return restResponse, nil
}

func main() {
	controller := newGenerateContentPostController()
	lambda.Start(controller.CreateApiResponse)
}
