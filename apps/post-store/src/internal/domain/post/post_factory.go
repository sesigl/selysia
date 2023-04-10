package post

import (
	"fmt"
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/google/uuid"
)

type CreateParameters struct {
	Message string
	UserId  string

	PublishAt time.Time
}

type UpdateParameters struct {
	Id      uuid.UUID
	Message string

	UserId string

	PublishAt time.Time
	CreatedAt time.Time
}

func NewPost(createParameters CreateParameters) (Post, error) {

	validationError := validateCreateParameters(createParameters)
	if validationError != nil {
		return Post{}, validationError
	}

	post := Post{
		id:        uuid.New(),
		message:   createParameters.Message,
		userId:    createParameters.UserId,
		publishAt: createParameters.PublishAt,
		createdAt: time.Now(),
	}

	return post, nil
}

func MustNewPost(createParameters CreateParameters) Post {
	post, err := NewPost(createParameters)
	if err != nil {
		panic(err)
	}

	return post
}

func ExistingPost(editParameters UpdateParameters) (Post, error) {

	validationError := validateEditParameters(editParameters)
	if validationError != nil {
		return Post{}, validationError
	}

	post := Post{
		id:        editParameters.Id,
		message:   editParameters.Message,
		userId:    editParameters.UserId,
		publishAt: editParameters.PublishAt,
		createdAt: editParameters.CreatedAt,
	}

	return post, nil
}

func MustExistingPost(editParameters UpdateParameters) Post {

	post, err := ExistingPost(editParameters)
	if err != nil {
		panic(err)
	}

	return post
}

func validateCreateParameters(postParameters CreateParameters) error {

	return validation.ValidateStruct(&postParameters,
		validation.Field(&postParameters.Message, validation.Required, validation.Length(1, 10000)),
		validation.Field(&postParameters.PublishAt, validation.Required, validation.Min(time.Now())),
		validation.Field(&postParameters.UserId, validation.Required),
	)
}

func validateEditParameters(postParameters UpdateParameters) error {

	if (postParameters.Id == uuid.UUID{}) {
		return fmt.Errorf("'Id': must not be nil")
	}

	return validation.ValidateStruct(&postParameters,
		validation.Field(&postParameters.Message, validation.Required, validation.Length(1, 10000)),
		validation.Field(&postParameters.PublishAt, validation.Required, validation.Min(time.Now())),
		validation.Field(&postParameters.UserId, validation.Required),
	)
}
