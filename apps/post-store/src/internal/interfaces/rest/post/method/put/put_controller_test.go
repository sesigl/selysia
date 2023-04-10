package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"selysia.com/post-store/src/internal"
	"selysia.com/post-store/src/internal/application"
	domainPost "selysia.com/post-store/src/internal/domain/post"
	"selysia.com/post-store/src/internal/interfaces/rest"
	openapi "selysia.com/post-store/src/server/go"
	"selysia.com/post-store/src/testing/factory"
	"selysia.com/post-store/src/testing/stubs"
	"testing"
	"time"
)

func TestPut(t *testing.T) {

	t.Run("fails when no valid jwt token", func(t *testing.T) {
		controller, _ := createPutController(factory.CreateControllerParameters{
			ValidatorIsValid: false,
		})
		_, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{})
		assert.ErrorContains(t, err, "invalidat jwt token")
	})

	t.Run("can not update post for other users posts", func(t *testing.T) {
		userId := uuid.New().String()
		otherUserId := uuid.New().String()
		messageUpdate := "update-message"

		controller, postApplicationService := createPutController(factory.CreateControllerParameters{
			ValidatorIsValid: true,
			Subject:          userId,
		})

		otherUserPost := postApplicationService.MustCreatePost(domainPost.CreateParameters{
			Message:   "init message",
			UserId:    otherUserId,
			PublishAt: time.Now().Add(time.Second * 10),
		})

		post := openapi.PostResponse{
			Message:   messageUpdate,
			PublishAt: time.Now().Add(time.Second * 10),
		}

		body, err := json.Marshal(post)
		if err != nil {
			panic(err)
		}

		_, err = controller.CreateApiResponse(events.APIGatewayProxyRequest{
			Body:           string(body),
			PathParameters: map[string]string{"postId": otherUserPost.Id().String()},
		})
		assert.ErrorContains(t, err, "not allowed to update post")

		posts, err := postApplicationService.FindPostsByUserId(userId)
		if err != nil {
			panic(err)
		}

		assert.Len(t, posts, 0)

		otherUserPosts, err := postApplicationService.FindPostsByUserId(otherUserId)
		if err != nil {
			panic(err)
		}

		if assert.Len(t, otherUserPosts, 1) {
			assert.Equal(t, "init message", otherUserPosts[0].Message())
		}
	})

	t.Run("update post", func(t *testing.T) {
		userId := uuid.New().String()
		messageUpdate := "update-message"

		controller, postApplicationService := createPutController(factory.CreateControllerParameters{
			ValidatorIsValid: true,
			Subject:          userId,
		})

		createdPost := postApplicationService.MustCreatePost(domainPost.CreateParameters{
			Message:   "init message",
			UserId:    userId,
			PublishAt: time.Now().Add(time.Second * 10),
		})

		post := openapi.PostResponse{
			Message:   messageUpdate,
			PublishAt: time.Now().Add(time.Second * 10),
		}

		body, err := json.Marshal(post)
		if err != nil {
			panic(err)
		}

		response, err := controller.CreateApiResponse(events.APIGatewayProxyRequest{
			Body:           string(body),
			PathParameters: map[string]string{"postId": createdPost.Id().String()},
		})
		assert.Nil(t, err)
		assert.Equal(t, int(rest.Success), response.StatusCode)
		assert.Contains(t, response.Body, createdPost.Id().String())

		posts, err := postApplicationService.FindPostsByUserId(userId)
		if err != nil {
			panic(err)
		}

		if assert.Len(t, posts, 1) {
			assert.Equal(t, userId, posts[0].UserId())
			assert.Equal(t, messageUpdate, posts[0].Message())
		}
	})
}

func createPutController(parameters factory.CreateControllerParameters) (rest.Controller[openapi.PostResponse], application.PostApplicationService) {
	postApplicationService := internal.InitializePostApplicationServiceForTesting()

	return rest.NewController(rest.Controller[openapi.PostResponse]{
		Validator: stubs.ValidatorMock{IsValid: parameters.ValidatorIsValid, Subject: parameters.Subject},
		DomainDataAccessor: putControllerHandler{
			PostApplicationService: postApplicationService,
		},
		SuccessResponseCode: rest.Success,
	}), postApplicationService
}
