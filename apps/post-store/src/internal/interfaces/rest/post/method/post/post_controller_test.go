package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/interfaces/rest"
	openapi "selysia.com/post-store/src/server/go"
	"selysia.com/post-store/src/testing/factory"
	"selysia.com/post-store/src/testing/stubs"
	"testing"
	"time"
)

func TestPost(t *testing.T) {

	t.Run("fails when no valid jwt token", func(t *testing.T) {
		controller, _ := createPostController(factory.CreateControllerParameters{
			ValidatorIsValid: false,
		})
		_, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{})
		assert.ErrorContains(t, err, "invalidat jwt token")
	})

	t.Run("create post", func(t *testing.T) {
		userId := uuid.New().String()
		message := "message"

		controller, postApplicationService := createPostController(factory.CreateControllerParameters{
			ValidatorIsValid: true,
			Subject:          userId,
		})

		createdPost := openapi.CreateOrUpdatePostRequest{
			Message:   message,
			PublishAt: time.Now().Add(time.Second * 10),
		}

		body, err := json.Marshal(createdPost)
		if err != nil {
			panic(err)
		}

		response, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{
			Body: string(body),
		})
		assert.Nil(t, err)
		assert.Equal(t, int(rest.Created), response.StatusCode)

		posts, err := postApplicationService.FindPostsByUserId(userId)
		if err != nil {
			panic(err)
		}

		if assert.Len(t, posts, 1) {
			assert.Equal(t, userId, posts[0].UserId())
			assert.Equal(t, message, posts[0].Message())
		}
	})
}

func createPostController(parameters factory.CreateControllerParameters) (rest.Controller[openapi.PostResponse], application.PostApplicationService) {
	postApplicationService := internal.InitializePostApplicationServiceForTesting()

	return rest.NewController(rest.Controller[openapi.PostResponse]{
		Validator: stubs.ValidatorMock{IsValid: parameters.ValidatorIsValid, Subject: parameters.Subject},
		DomainDataAccessor: postControllerHandler{
			PostApplicationService: postApplicationService,
		},
		SuccessResponseCode: rest.Created,
	}), postApplicationService
}
