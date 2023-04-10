package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/domain/post"
	"selysia.com/post-store/src/internal/interfaces/rest"
	"selysia.com/post-store/src/internal/interfaces/rest/post/mapper"
	openapi "selysia.com/post-store/src/server/go"
)

func newPostController() rest.Controller[openapi.PostResponse] {
	postApplicationService, err := internal.InitializePostApplicationService()
	if err != nil {
		panic(err)
	}

	return rest.NewController(rest.Controller[openapi.PostResponse]{
		DomainDataAccessor: postControllerHandler{
			PostApplicationService: postApplicationService,
		},
		SuccessResponseCode: rest.Created,
	})
}

type postControllerHandler struct {
	PostApplicationService application.PostApplicationService
}

func (handler postControllerHandler) Execute(request events.APIGatewayProxyRequest, authUserId string) (openapi.PostResponse, error) {
	var createPostRequestObject openapi.CreateOrUpdatePostRequest
	err := json.Unmarshal([]byte(request.Body), &createPostRequestObject)
	if err != nil {
		return openapi.PostResponse{}, fmt.Errorf("could unmarshal body to create post request object: %w", err)
	}

	if err := openapi.AssertCreateOrUpdatePostRequestRequired(createPostRequestObject); err != nil {
		return openapi.PostResponse{}, fmt.Errorf("request object validation failed: %w", err)
	}

	createdPost, err := handler.PostApplicationService.CreatePost(post.CreateParameters{
		Message:   createPostRequestObject.Message,
		UserId:    authUserId,
		PublishAt: createPostRequestObject.PublishAt,
	})
	if err != nil {
		return openapi.PostResponse{}, fmt.Errorf("finding posts by user id failed: %w", err)
	}

	var restResponse = mapper.EntityToResponseObject(createdPost)

	return restResponse, nil
}

func main() {
	controller := newPostController()
	lambda.Start(controller.CreateApiResponse)
}
