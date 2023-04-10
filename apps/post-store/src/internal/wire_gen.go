// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package internal

import (
	"github.com/go-redis/redis/v8"
	"github.com/google/wire"
	"gorm.io/gorm"
	"selysia.com/post-store/src/internal/application"
	"selysia.com/post-store/src/internal/domain/ai"
	"selysia.com/post-store/src/internal/domain/ai/service"
	"selysia.com/post-store/src/internal/domain/post"
	"selysia.com/post-store/src/internal/infrastructure/cockroach"
	post2 "selysia.com/post-store/src/internal/infrastructure/cockroach/post"
	"selysia.com/post-store/src/internal/infrastructure/openai"
	redis2 "selysia.com/post-store/src/internal/infrastructure/redis"
	"selysia.com/post-store/src/testing/fakes/repositories"
	"time"
)

// Injectors from wire.go:

func InitializeCockroachConnection() (*gorm.DB, error) {
	db, err := cockroach.NewOrGetCockroachConnection()
	if err != nil {
		return nil, err
	}
	return db, nil
}

func InitializePostRepository() (post.Repository, error) {
	db, err := cockroach.NewOrGetCockroachConnection()
	if err != nil {
		return nil, err
	}
	cockroachPostRepository := post2.NewCockroachPostRepository(db)
	return cockroachPostRepository, nil
}

func InitializePostApplicationService() (application.PostApplicationService, error) {
	db, err := cockroach.NewOrGetCockroachConnection()
	if err != nil {
		return application.PostApplicationService{}, err
	}
	cockroachPostRepository := post2.NewCockroachPostRepository(db)
	postApplicationService := application.NewPostApplicationService(cockroachPostRepository)
	return postApplicationService, nil
}

func InitializeRedisClient() *redis.Client {
	client := redis2.NewRedisClient()
	return client
}

func InitializeRateLimiter() (ai.RateLimiter, error) {
	int2 := ProvideRateLimit()
	duration := ProvideRateTimeWindow()
	client := redis2.NewRedisClient()
	newRedisRateLimiterParameters := redis2.NewRedisRateLimiterParameters{
		Limit:       int2,
		TimeWindow:  duration,
		RedisClient: client,
	}
	rateLimiter, err := redis2.NewRedisRateLimiter(newRedisRateLimiterParameters)
	if err != nil {
		return nil, err
	}
	return rateLimiter, nil
}

func InitializeAiApplicationService() (application.AiApplicationService, error) {
	accessor := service.NewAiAccessor()
	int2 := ProvideRateLimit()
	duration := ProvideRateTimeWindow()
	client := redis2.NewRedisClient()
	newRedisRateLimiterParameters := redis2.NewRedisRateLimiterParameters{
		Limit:       int2,
		TimeWindow:  duration,
		RedisClient: client,
	}
	rateLimiter, err := redis2.NewRedisRateLimiter(newRedisRateLimiterParameters)
	if err != nil {
		return application.AiApplicationService{}, err
	}
	aiApplicationService := application.NewAiApplicationService(accessor, rateLimiter)
	return aiApplicationService, nil
}

func InitializePostRepositoryForTesting() post.Repository {
	inMemoryPostRepository := repositories.NewInMemoryPostRepository()
	return inMemoryPostRepository
}

func InitializePostApplicationServiceForTesting() application.PostApplicationService {
	inMemoryPostRepository := repositories.NewInMemoryPostRepository()
	postApplicationService := application.NewPostApplicationService(inMemoryPostRepository)
	return postApplicationService
}

// wire.go:

var providerSet wire.ProviderSet = wire.NewSet(cockroach.NewOrGetCockroachConnection, post2.NewCockroachPostRepository, application.NewPostApplicationService, application.NewAiApplicationService, service.NewAiAccessor, redis2.NewRedisClient, redis2.NewRedisRateLimiter, openai.NewOpenAiClient, ProvideRateLimit,
	ProvideRateTimeWindow, wire.Struct(new(redis2.NewRedisRateLimiterParameters), "Limit", "TimeWindow", "RedisClient"), wire.Bind(new(post.Repository), new(post2.CockroachPostRepository)), wire.Bind(new(ai.RateLimiter), new(redis2.RateLimiter)),
)

func ProvideRateLimit() redis2.RateLimit {
	return redis2.RateLimit(10)
}

func ProvideRateTimeWindow() redis2.RateTimeWindow {
	return redis2.RateTimeWindow(time.Hour * 24)
}

var providerInMemoryOnlySet wire.ProviderSet = wire.NewSet(cockroach.NewOrGetCockroachConnection, repositories.NewInMemoryPostRepository, application.NewPostApplicationService, wire.Bind(new(post.Repository), new(*repositories.InMemoryPostRepository)))
