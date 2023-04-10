package post

import (
	"time"

	"github.com/google/uuid"
)

type Post struct {
	id      uuid.UUID
	message string

	userId string

	publishAt time.Time
	createdAt time.Time
}

func (p Post) Id() uuid.UUID {
	return p.id
}

func (p Post) Message() string {
	return p.message
}

func (p Post) UserId() string {
	return p.userId
}

func (p Post) PublishAt() time.Time {
	return p.publishAt
}

func (p Post) CreatedAt() time.Time {
	return p.createdAt
}
