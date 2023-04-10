package post

import (
	"github.com/google/uuid"
	. "selysia.com/post-store/src/internal/domain/post"
	"time"
)

type postPO struct {
	Id      string `gorm:"primaryKey;column:id"`
	Message string `gorm:"column:message"`

	UserId string `gorm:"column:user_id"`

	PublishAt time.Time `gorm:"column:publish_at"`
	CreatedAt time.Time `gorm:"column:created_at"`
}

func (postPO) TableName() string {
	return "posts"
}

func (po postPO) toEntity() Post {
	return MustExistingPost(UpdateParameters{
		Id:        uuid.MustParse(po.Id),
		Message:   po.Message,
		UserId:    po.UserId,
		PublishAt: po.PublishAt,
		CreatedAt: po.CreatedAt,
	})
}
