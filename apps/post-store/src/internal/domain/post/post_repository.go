package post

import "github.com/google/uuid"

type Repository interface {
	FindAll() ([]Post, error)
	FindById(id uuid.UUID) (Post, error)
	FindByUserId(userId string) ([]Post, error)
	Create(post Post) (Post, error)
	Update(post Post) (Post, error)
	DeleteAll() error
	DeleteById(id uuid.UUID) error
}
