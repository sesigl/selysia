package post

import (
	"fmt"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"selysia.com/post-store/src/testing/utilities/string"
)

func TestNewPost(t *testing.T) {
	t.Run("requires message", func(t *testing.T) {
		postParameters := CreateParameters{
			PublishAt: time.Now(),
			UserId:    uuid.New().String(),
		}
		_, err := NewPost(postParameters)

		if assert.Error(t, err) {
			assert.Contains(t, err.Error(), "Message: cannot be blank")
		}
	})

	t.Run("requires userId", func(t *testing.T) {
		postParameters := CreateParameters{
			Message:   "Message",
			PublishAt: time.Now().Add(time.Second * 1),
		}
		_, err := NewPost(postParameters)

		if assert.Error(t, err) {
			assert.Contains(t, err.Error(), "UserId: cannot be blank")
		}
	})

	t.Run("message cannot be huge", func(t *testing.T) {
		postParameters := CreateParameters{
			Message:   string.CreateStringWithLength(1_000_000),
			PublishAt: time.Now(),
			UserId:    uuid.New().String(),
		}
		_, err := NewPost(postParameters)

		if assert.Error(t, err) {
			assert.Contains(t, err.Error(), "Message: the length must be between 1 and")
		}
	})

	t.Run("requires publishAt time", func(t *testing.T) {
		postParameters := CreateParameters{
			Message: "message",
			UserId:  uuid.New().String(),
		}
		_, err := NewPost(postParameters)

		if assert.Error(t, err) {
			assert.Contains(t, err.Error(), "PublishAt: cannot be blank")
		}
	})

	t.Run("requires publish in the future", func(t *testing.T) {
		postParameters := CreateParameters{
			Message:   "message",
			UserId:    uuid.New().String(),
			PublishAt: time.Now(),
		}
		_, err := NewPost(postParameters)

		if assert.Error(t, err) {
			assert.Contains(t, err.Error(), "PublishAt: must be no less than ")
		}
	})

	t.Run("creates valid post", func(t *testing.T) {
		fmt.Printf("uuid.New(): %s\n", uuid.New())
		postParameters := CreateParameters{
			Message:   "message",
			UserId:    uuid.New().String(),
			PublishAt: time.Now().Add(time.Second * 1),
		}
		_, err := NewPost(postParameters)

		assert.NoError(t, err)
	})
}
