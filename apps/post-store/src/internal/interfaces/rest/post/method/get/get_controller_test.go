package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/domain/post"
	"selysia.com/post-store/src/internal/interfaces/rest"
	openapi "selysia.com/post-store/src/server/go"
	"selysia.com/post-store/src/testing/factory"
	"selysia.com/post-store/src/testing/stubs"
	"testing"
	"time"
)

func TestGet(t *testing.T) {

	t.Run("fails when no valid jwt token", func(t *testing.T) {
		controller, _ := createGetController(factory.CreateControllerParameters{ValidatorIsValid: false})
		_, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{})
		assert.ErrorContains(t, err, "invalidat jwt token")
	})

	t.Run("fails when no userId given", func(t *testing.T) {
		controller, _ := createGetController(factory.CreateControllerParameters{ValidatorIsValid: true})

		_, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{})
		assert.ErrorContains(t, err, "not implemented yet")
	})

	t.Run("fails when auth userId does not match query parameter user id", func(t *testing.T) {
		controller, _ := createGetController(factory.CreateControllerParameters{
			ValidatorIsValid: true,
			Subject:          "subject",
		})

		_, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{
			QueryStringParameters: map[string]string{"userId": "other-user-id"},
		})
		assert.ErrorContains(t, err, "token user id and filter user id do not match")
	})

	t.Run("returns posts", func(t *testing.T) {
		userId := uuid.New().String()
		controller, postApplicationService := createGetController(factory.CreateControllerParameters{
			ValidatorIsValid: true,
			Subject:          userId,
		})

		createdPost := postApplicationService.MustCreatePost(post.CreateParameters{
			Message:   "message",
			UserId:    userId,
			PublishAt: time.Now().Add(time.Second * 10),
		})

		response, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{
			QueryStringParameters: map[string]string{"userId": userId},
		})
		assert.Nil(t, err)

		var posts []openapi.PostResponse
		err = json.Unmarshal([]byte(response.Body), &posts)
		if err != nil {
			panic(err)
		}

		if assert.Len(t, posts, 1) {
			assert.Equal(t, createdPost.Message(), posts[0].Message)
			assert.Equal(t, createdPost.UserId(), posts[0].UserId)
			assert.Equal(t, createdPost.PublishAt().Unix(), posts[0].PublishAt.Unix())
		}
	})
}

func createGetController(parameters factory.CreateControllerParameters) (rest.Controller[[]openapi.PostResponse], application.PostApplicationService) {
	postApplicationService := internal.InitializePostApplicationServiceForTesting()

	return rest.NewController(rest.Controller[[]openapi.PostResponse]{
		Validator: stubs.ValidatorMock{IsValid: parameters.ValidatorIsValid, Subject: parameters.Subject},
		DomainDataAccessor: getControllerHandler{
			PostApplicationService: postApplicationService,
		},
	}), postApplicationService
}
