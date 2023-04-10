package cockroach

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var db *gorm.DB

func NewOrGetCockroachConnection() (*gorm.DB, error) {
	cockroachDBUrl := os.Getenv("COCKROACHDB_URL")

	var err error

	if db == nil {
		db, err = gorm.Open(postgres.Open(cockroachDBUrl + "&application_name=$ docs_simplecrud_gorm"))
		if err != nil {
			return nil, err
		}
	}

	return db, nil
}
