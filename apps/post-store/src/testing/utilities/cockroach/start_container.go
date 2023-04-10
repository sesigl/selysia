package cockroach

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/cockroachdb"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"
)

type DBContainer struct {
	testcontainers.Container
	URI string
	Db  *gorm.DB
}

var ctx = context.Background()

func StartContainer() *DBContainer {
	container, uri := startCockroachDbDockerContainer()
	db := initializeDatabaseAndGetGormConnection(uri)

	return &DBContainer{Container: container, URI: uri, Db: db}
}

func initializeDatabaseAndGetGormConnection(uri string) *gorm.DB {
	plainDb, err := sql.Open("pgx", uri+"/projectmanagement")
	if err != nil {
		panic(err)
	}

	const query = `CREATE DATABASE projectmanagement;`
	_, err = plainDb.ExecContext(ctx, query)
	if err != nil {
		panic(err)
	}

	initCockroachDB(plainDb)

	db, err := gorm.Open(postgres.New(postgres.Config{Conn: plainDb}), &gorm.Config{
		AllowGlobalUpdate: true,
	})
	if err != nil {
		panic(err)
	}

	return db
}

func startCockroachDbDockerContainer() (testcontainers.Container, string) {
	req := testcontainers.ContainerRequest{
		Image:        "cockroachdb/cockroach:latest-v21.1",
		ExposedPorts: []string{"26257/tcp", "8080/tcp"},
		WaitingFor:   wait.ForHTTP("/health").WithPort("8080"),
		Cmd:          []string{"start-single-node", "--insecure"},
	}

	container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	if err != nil {
		panic(err)
	}

	mappedPort, err := container.MappedPort(ctx, "26257")
	if err != nil {
		panic(err)
	}

	hostIP, err := container.Host(ctx)
	if err != nil {
		panic(err)
	}

	uri := fmt.Sprintf("postgres://root@%s:%s", hostIP, mappedPort.Port())
	return container, uri
}

func cleanUpContainer(cdbContainer *DBContainer) {
	err := cdbContainer.Terminate(ctx)
	if err != nil {
		panic(err)
	}

	db, err := cdbContainer.Db.DB()
	if err != nil {
		panic(err)
	}

	err = db.Close()
	if err != nil {
		panic(err)
	}
}

func initCockroachDB(db *sql.DB) {
	driver, err := cockroachdb.WithInstance(db, &cockroachdb.Config{})

	srcDirectory := getSrcDirectory(err)

	m, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%s/../db/migrations", srcDirectory),
		"migrations", driver)

	if err != nil {
		panic(err)
	}

	err = m.Up()
	if err != nil {

	}
}

func getSrcDirectory(err error) string {
	srcDirectory, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	for filepath.Base(srcDirectory) != "src" {
		srcDirectory = filepath.Dir(srcDirectory)
	}
	return srcDirectory
}
