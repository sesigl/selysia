package repositories

import (
	"fmt"
	"github.com/google/uuid"
	domain "selysia.com/post-store/src/internal/domain/post"
	"time"
)

type InMemoryPostRepository struct {
	posts []domain.Post
}

func NewInMemoryPostRepository() *InMemoryPostRepository {
	return &InMemoryPostRepository{
		posts: make([]domain.Post, 0),
	}
}

func (repository *InMemoryPostRepository) FindByUserId(userId string) ([]domain.Post, error) {
	var userIdPosts []domain.Post

	for _, post := range repository.posts {
		if post.UserId() == userId {
			userIdPosts = append(userIdPosts, post)
		}
	}

	return userIdPosts, nil
}

func (repository *InMemoryPostRepository) FindById(id uuid.UUID) (domain.Post, error) {
	for _, post := range repository.posts {
		if post.Id() == id {
			return post, nil
		}
	}

	return domain.Post{}, fmt.Errorf("no post found for id %s", id)
}

func (repository *InMemoryPostRepository) FindAll() ([]domain.Post, error) {
	return repository.posts, nil
}

func (repository *InMemoryPostRepository) Create(post domain.Post) (domain.Post, error) {
	repository.posts = append(repository.posts, post)
	return post, nil
}

func (repository *InMemoryPostRepository) Update(post domain.Post) (domain.Post, error) {
	for i, existingPost := range repository.posts {
		if post.Id() == existingPost.Id() {

			updatedMessage, publishAt := updateEditableFields(post, existingPost)

			repository.posts[i] = domain.MustExistingPost(domain.UpdateParameters{
				Id:        post.Id(),
				Message:   updatedMessage,
				UserId:    existingPost.UserId(),
				PublishAt: publishAt,
				CreatedAt: existingPost.CreatedAt(),
			})

			return repository.posts[i], nil
		}
	}

	panic(fmt.Errorf("update post failed: no post with id %s exists", post.Id()))
}

func updateEditableFields(post domain.Post, existingPost domain.Post) (string, time.Time) {
	updatedMessage := existingPost.Message()
	if post.Message() != "" {
		updatedMessage = post.Message()
	}

	publishAt := existingPost.PublishAt()
	if (post.PublishAt() != time.Time{}) {
		publishAt = post.PublishAt()
	}
	return updatedMessage, publishAt
}

func (repository *InMemoryPostRepository) DeleteAll() error {
	repository.posts = []domain.Post{}
	return nil
}

func (repository *InMemoryPostRepository) DeleteById(id uuid.UUID) error {
	for i, existingPost := range repository.posts {
		if existingPost.Id() == id {
			repository.posts = append(repository.posts[:i], repository.posts[i+1:]...)
		}
	}

	return nil
}
