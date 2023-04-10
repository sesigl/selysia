package application

import (
	"fmt"
	"github.com/google/uuid"
	domainPost "selysia.com/post-store/src/internal/domain/post"
)

func NewPostApplicationService(postRepository domainPost.Repository) PostApplicationService {

	return PostApplicationService{
		postRepository: postRepository,
	}

}

type PostApplicationService struct {
	postRepository domainPost.Repository
}

func (as PostApplicationService) CreatePost(parameters domainPost.CreateParameters) (domainPost.Post, error) {
	newPost, err := domainPost.NewPost(parameters)
	if err != nil {
		return domainPost.Post{}, err
	}

	createdPost, err := as.postRepository.Create(newPost)

	return createdPost, err
}

func (as PostApplicationService) MustCreatePost(parameters domainPost.CreateParameters) domainPost.Post {
	createPost, err := as.CreatePost(parameters)
	if err != nil {
		panic(err)
	}
	return createPost
}

func (as PostApplicationService) UpdatePost(parameters domainPost.UpdateParameters) (domainPost.Post, error) {
	postToUpdate, err := domainPost.ExistingPost(parameters)
	if err != nil {
		return domainPost.Post{}, err
	}

	existingPost, err := as.postRepository.FindById(postToUpdate.Id())
	if err != nil {
		return domainPost.Post{}, err
	}

	if existingPost.UserId() != parameters.UserId {
		return domainPost.Post{}, fmt.Errorf("not allowed to update post: user %s is not the owner", parameters.UserId)
	}

	updatedPost, err := as.postRepository.Update(postToUpdate)

	return updatedPost, err
}

func (as PostApplicationService) MustUpdatePost(parameters domainPost.UpdateParameters) domainPost.Post {
	updatedPost, err := as.UpdatePost(parameters)
	if err != nil {
		panic(err)
	}
	return updatedPost
}

func (as PostApplicationService) DeletePost(postId uuid.UUID, ownerUserId string) error {
	post, err := as.postRepository.FindById(postId)
	if err != nil {
		return err
	}

	if post.UserId() != ownerUserId {
		return fmt.Errorf("not allowed to delete the domainPost: user %s is not the owner of this po", ownerUserId)
	}

	err = as.postRepository.DeleteById(postId)
	return err
}

func (as PostApplicationService) FindPostsByUserId(userId string) ([]domainPost.Post, error) {
	posts, err := as.postRepository.FindByUserId(userId)
	return posts, err
}
