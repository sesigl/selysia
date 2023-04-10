package mapper

import (
	"selysia.com/post-store/src/internal/domain/post"
	openapi "selysia.com/post-store/src/server/go"
)

func EntityToResponseObject(post post.Post) openapi.PostResponse {
	return openapi.PostResponse{
		Id:        post.Id().String(),
		Message:   post.Message(),
		UserId:    post.UserId(),
		PublishAt: post.PublishAt(),
		CreatedAt: post.CreatedAt(),
	}
}
