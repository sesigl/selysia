package post

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	. "selysia.com/post-store/src/internal/domain/post"
)

type CockroachPostRepository struct {
	db *gorm.DB
}

func NewCockroachPostRepository(db *gorm.DB) CockroachPostRepository {
	return CockroachPostRepository{
		db: db,
	}
}

func (repository CockroachPostRepository) FindAll() ([]Post, error) {
	var postPOs []postPO
	tx := repository.db.Find(&postPOs)

	posts := make([]Post, len(postPOs))

	for i, po := range postPOs {
		posts[i] = po.toEntity()
	}

	return posts, tx.Error
}

func (repository CockroachPostRepository) FindByUserId(userId string) ([]Post, error) {
	var postPOs []postPO
	tx := repository.db.Where(&postPO{
		UserId: userId,
	}).Order(clause.OrderByColumn{Column: clause.Column{Name: "publish_at"}, Desc: false}).Find(&postPOs)

	posts := make([]Post, len(postPOs))

	for i, po := range postPOs {
		posts[i] = po.toEntity()
	}

	return posts, tx.Error
}

func (repository CockroachPostRepository) FindById(id uuid.UUID) (Post, error) {
	var foundPostPO postPO
	tx := repository.db.Where(&postPO{
		Id: id.String(),
	}).Take(&foundPostPO)

	return foundPostPO.toEntity(), tx.Error
}

func (repository CockroachPostRepository) Create(post Post) (Post, error) {

	postPO := postPO{
		Id:        post.Id().String(),
		Message:   post.Message(),
		UserId:    post.UserId(),
		PublishAt: post.PublishAt().UTC(),
		CreatedAt: post.CreatedAt().UTC(),
	}

	tx := repository.db.Create(&postPO)

	return post, tx.Error
}

func (repository CockroachPostRepository) Update(post Post) (Post, error) {

	postPO := postPO{
		Id:        post.Id().String(),
		Message:   post.Message(),
		UserId:    post.UserId(),
		PublishAt: post.PublishAt().UTC(),
	}

	tx := repository.db.Updates(&postPO)

	return post, tx.Error
}

func (repository CockroachPostRepository) DeleteAll() error {
	tx := repository.db.Delete(&postPO{})
	return tx.Error
}

func (repository CockroachPostRepository) DeleteById(id uuid.UUID) error {
	tx := repository.db.Delete(&postPO{}, id)
	return tx.Error
}
