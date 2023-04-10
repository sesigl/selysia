package main

import (
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/interfaces/rest"
	"selysia.com/post-store/src/internal/interfaces/rest/post/mapper"
	openapi "selysia.com/post-store/src/server/go"
)

func newGetController() rest.Controller[[]openapi.PostResponse] {
	postApplicationService, err := internal.InitializePostApplicationService()
	if err != nil {
		panic(err)
	}

	return rest.NewController(rest.Controller[[]openapi.PostResponse]{
		DomainDataAccessor: getControllerHandler{
			PostApplicationService: postApplicationService,
		},
	})
}

type getControllerHandler struct {
	PostApplicationService application.PostApplicationService
}

func (handler getControllerHandler) Execute(request events.APIGatewayProxyRequest, authUserId string) ([]openapi.PostResponse, error) {
	userIdQueryParameter, ok := request.QueryStringParameters["userId"]
	if !ok {
		return []openapi.PostResponse{}, fmt.Errorf("not implemented yet")
	}

	if authUserId != userIdQueryParameter {
		return []openapi.PostResponse{}, fmt.Errorf("not authorized: token user id and filter user id do not match")
	}

	posts, err := handler.PostApplicationService.FindPostsByUserId(authUserId)
	if err != nil {
		return []openapi.PostResponse{}, fmt.Errorf("finding posts by user id failed: %w", err)
	}

	var restResponses = make([]openapi.PostResponse, len(posts))
	for i, post := range posts {
		restResponses[i] = mapper.EntityToResponseObject(post)
	}

	return restResponses, nil
}

func main() {
	controller := newGetController()
	lambda.Start(controller.CreateApiResponse)
}
