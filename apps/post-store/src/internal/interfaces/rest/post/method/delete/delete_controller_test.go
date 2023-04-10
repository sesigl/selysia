package main

import (
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

func TestDelete(t *testing.T) {

	t.Run("fails when no valid jwt token", func(t *testing.T) {
		controller, _ := createDeleteController(factory.CreateControllerParameters{
			ValidatorIsValid: false,
		})
		_, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{})
		assert.ErrorContains(t, err, "invalidat jwt token")
	})

	t.Run("can not delete posts from other users", func(t *testing.T) {
		currentUser := uuid.New().String()
		otherUserId := uuid.New().String()

		controller, postApplicationService := createDeleteController(factory.CreateControllerParameters{
			ValidatorIsValid: true,
			Subject:          currentUser,
		})

		postApplicationService.MustCreatePost(post.CreateParameters{
			Message:   "message",
			UserId:    currentUser,
			PublishAt: time.Now().Add(time.Second * 10),
		})
		otherUserPost := postApplicationService.MustCreatePost(post.CreateParameters{
			Message:   "message2",
			UserId:    otherUserId,
			PublishAt: time.Now().Add(time.Second * 10),
		})

		_, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{
			PathParameters: map[string]string{"postId": otherUserPost.Id().String()},
		})
		assert.ErrorContains(t, err, "not allowed to delete the domainPost")
	})

	t.Run("deletes posts", func(t *testing.T) {
		userId := uuid.New().String()

		controller, postApplicationService := createDeleteController(factory.CreateControllerParameters{
			ValidatorIsValid: true,
			Subject:          userId,
		})

		createdPost := postApplicationService.MustCreatePost(post.CreateParameters{
			Message:   "message",
			UserId:    userId,
			PublishAt: time.Now().Add(time.Second * 10),
		})

		response, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{
			PathParameters: map[string]string{"postId": createdPost.Id().String()},
		})
		assert.Nil(t, err)
		assert.Equal(t, int(rest.Success), response.StatusCode)
	})
}

func createDeleteController(parameters factory.CreateControllerParameters) (rest.Controller[openapi.PostResponse], application.PostApplicationService) {
	postApplicationService := internal.InitializePostApplicationServiceForTesting()

	return rest.NewController(rest.Controller[openapi.PostResponse]{
		Validator: stubs.ValidatorMock{IsValid: parameters.ValidatorIsValid, Subject: parameters.Subject},
		DomainDataAccessor: deleteControllerHandler{
			PostApplicationService: postApplicationService,
		},
	}), postApplicationService
}
