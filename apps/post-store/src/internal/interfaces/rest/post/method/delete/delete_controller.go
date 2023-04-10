package main

import (
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/google/uuid"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/interfaces/rest"
	openapi "selysia.com/post-store/src/server/go"
)

func newDeleteController() rest.Controller[openapi.PostResponse] {
	postApplicationService, err := internal.InitializePostApplicationService()
	if err != nil {
		panic(err)
	}

	return rest.NewController(rest.Controller[openapi.PostResponse]{
		DomainDataAccessor: deleteControllerHandler{
			PostApplicationService: postApplicationService,
		},
	})
}

type deleteControllerHandler struct {
	PostApplicationService application.PostApplicationService
}

func (handler deleteControllerHandler) Execute(request events.APIGatewayProxyRequest, authUserId string) (openapi.PostResponse, error) {
	postIdParameter, ok := request.PathParameters["postId"]
	if !ok {
		return openapi.PostResponse{}, fmt.Errorf("not implemented yet")
	}

	postId, err := uuid.Parse(postIdParameter)
	if err != nil {
		return openapi.PostResponse{}, fmt.Errorf("could not parse postId: %w", err)
	}

	err = handler.PostApplicationService.DeletePost(postId, authUserId)
	if err != nil {
		return openapi.PostResponse{}, fmt.Errorf("finding posts by user id failed: %w", err)
	}

	return openapi.PostResponse{}, nil
}

func main() {
	controller := newDeleteController()
	lambda.Start(controller.CreateApiResponse)
}
