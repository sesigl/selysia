package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/google/uuid"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/domain/post"
	"selysia.com/post-store/src/internal/interfaces/rest"
	"selysia.com/post-store/src/internal/interfaces/rest/post/mapper"
	openapi "selysia.com/post-store/src/server/go"
)

func newPutController() rest.Controller[openapi.PostResponse] {
	postApplicationService, err := internal.InitializePostApplicationService()
	if err != nil {
		panic(err)
	}

	return rest.NewController(rest.Controller[openapi.PostResponse]{
		DomainDataAccessor: putControllerHandler{
			PostApplicationService: postApplicationService,
		},
		SuccessResponseCode: rest.Success,
	})
}

type putControllerHandler struct {
	PostApplicationService application.PostApplicationService
}

func (handler putControllerHandler) Execute(request events.APIGatewayProxyRequest, authUserId string) (openapi.PostResponse, error) {
	postIdParameter, ok := request.PathParameters["postId"]
	if !ok {
		return openapi.PostResponse{}, fmt.Errorf("not implemented yet")
	}

	postId, err := uuid.Parse(postIdParameter)
	if err != nil {
		return openapi.PostResponse{}, fmt.Errorf("could not parse postId: %w", err)
	}

	var createPutRequestObject openapi.CreateOrUpdatePostRequest
	err = json.Unmarshal([]byte(request.Body), &createPutRequestObject)
	if err != nil {
		return openapi.PostResponse{}, fmt.Errorf("could unmarshal body to create post request object: %w", err)
	}

	if err := openapi.AssertCreateOrUpdatePostRequestRequired(createPutRequestObject); err != nil {
		return openapi.PostResponse{}, fmt.Errorf("request object validation failed: %w", err)
	}

	createdPost, err := handler.PostApplicationService.UpdatePost(post.UpdateParameters{
		Id:        postId,
		Message:   createPutRequestObject.Message,
		UserId:    authUserId,
		PublishAt: createPutRequestObject.PublishAt,
	})
	if err != nil {
		return openapi.PostResponse{}, fmt.Errorf("finding posts by user id failed: %w", err)
	}

	var restResponse = mapper.EntityToResponseObject(createdPost)

	return restResponse, nil
}

func main() {
	controller := newPutController()
	lambda.Start(controller.CreateApiResponse)
}
