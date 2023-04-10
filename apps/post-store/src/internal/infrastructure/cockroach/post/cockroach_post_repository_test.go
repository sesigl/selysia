package post

import (
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"selysia.com/post-store/src/internal/domain/post"
	"selysia.com/post-store/src/testing/utilities/cockroach"
	"testing"
	"time"
)

var cockroachDbContainer *cockroach.DBContainer

func init() {
	cockroachDbContainer = cockroach.StartContainer()
}

func TestCockRoachPostRepository(t *testing.T) {

	t.Run("when empty - find returns empty list", func(t *testing.T) {
		repository := given()
		posts, _ := repository.FindAll()

		assert.Len(t, posts, 0)
	})

	t.Run("stores a new post", func(t *testing.T) {
		repository := given()

		newPost := post.MustNewPost(post.CreateParameters{
			Message:   "message",
			UserId:    uuid.New().String(),
			PublishAt: time.Now().Add(time.Second),
		})
		_, err := repository.Create(newPost)
		if err != nil {
			panic(err)
		}

		posts, _ := repository.FindAll()
		if assert.Len(t, posts, 1) {
			existingPostAfterSave := posts[0]

			assert.Equal(t, newPost.Id(), existingPostAfterSave.Id())
			assert.Equal(t, newPost.UserId(), existingPostAfterSave.UserId())
			assert.Equal(t, newPost.Message(), existingPostAfterSave.Message())
			assert.Equal(t, newPost.PublishAt().Unix(), existingPostAfterSave.PublishAt().Unix())
			assert.Equal(t, newPost.CreatedAt().Unix(), existingPostAfterSave.CreatedAt().Unix())
		}
	})

	t.Run("updates a new post", func(t *testing.T) {
		repository := given()

		newPost := post.MustNewPost(post.CreateParameters{
			Message:   "message",
			UserId:    uuid.New().String(),
			PublishAt: time.Now().Add(time.Second),
		})
		_, err := repository.Create(newPost)
		if err != nil {
			panic(err)
		}

		updatedPost := post.MustExistingPost(post.UpdateParameters{
			Id:        newPost.Id(),
			Message:   "message-updated",
			UserId:    newPost.UserId(),
			PublishAt: time.Now().Add(time.Second * 10),
		})

		_, err = repository.Update(updatedPost)
		if err != nil {
			panic(err)
		}

		posts, _ := repository.FindAll()
		if assert.Len(t, posts, 1) {
			existingPostAfterSave := posts[0]

			assert.Equal(t, updatedPost.Id(), existingPostAfterSave.Id())
			assert.Equal(t, updatedPost.UserId(), existingPostAfterSave.UserId())
			assert.Equal(t, updatedPost.Message(), existingPostAfterSave.Message())
			assert.Equal(t, updatedPost.PublishAt().Unix(), existingPostAfterSave.PublishAt().Unix())
			assert.Equal(t, newPost.CreatedAt().Unix(), existingPostAfterSave.CreatedAt().Unix())
		}
	})

	t.Run("find posts by user", func(t *testing.T) {
		repository := given()

		user1 := uuid.New().String()
		newPost1 := post.MustNewPost(post.CreateParameters{
			Message:   "message-1",
			UserId:    user1,
			PublishAt: time.Now().Add(time.Second),
		})
		_, err := repository.Create(newPost1)
		if err != nil {
			panic(err)
		}

		user2 := uuid.New().String()
		newPost2 := post.MustNewPost(post.CreateParameters{
			Message:   "message-2",
			UserId:    user2,
			PublishAt: time.Now().Add(time.Second),
		})

		_, err = repository.Create(newPost2)
		if err != nil {
			panic(err)
		}

		posts, _ := repository.FindByUserId(user1)
		if assert.Len(t, posts, 1) {
			existingPostAfterSave := posts[0]

			assert.Equal(t, newPost1.UserId(), existingPostAfterSave.UserId())
			assert.Equal(t, newPost1.Message(), existingPostAfterSave.Message())
		}
	})

	t.Run("find posts by user", func(t *testing.T) {
		repository := given()

		user1 := uuid.New().String()
		newPost1 := post.MustNewPost(post.CreateParameters{
			Message:   "message-1",
			UserId:    user1,
			PublishAt: time.Now().Add(time.Second * 2),
		})
		_, err := repository.Create(newPost1)
		if err != nil {
			panic(err)
		}

		newPost2 := post.MustNewPost(post.CreateParameters{
			Message:   "message-2",
			UserId:    user1,
			PublishAt: time.Now().Add(time.Second * 1),
		})

		_, err = repository.Create(newPost2)
		if err != nil {
			panic(err)
		}

		posts, _ := repository.FindByUserId(user1)
		if assert.Len(t, posts, 2) {
			assert.Equal(t, newPost2.Id(), posts[0].Id())
			assert.Equal(t, newPost1.Id(), posts[1].Id())
		}
	})

	t.Run("removes post", func(t *testing.T) {
		repository := given()

		newPost := post.MustNewPost(post.CreateParameters{
			Message:   "message",
			UserId:    uuid.New().String(),
			PublishAt: time.Now().Add(time.Second),
		})
		_, err := repository.Create(newPost)
		if err != nil {
			panic(err)
		}

		err = repository.DeleteById(newPost.Id())
		if err != nil {
			panic(err)
		}

		posts, _ := repository.FindAll()
		assert.Len(t, posts, 0)
	})

}

func given() post.Repository {
	var repository post.Repository = NewCockroachPostRepository(cockroachDbContainer.Db)
	err := repository.DeleteAll()
	if err != nil {
		panic(err)
	}

	return repository
}
