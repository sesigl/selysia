//go:build wireinject
// +build wireinject

package internal

import (
	"github.com/go-redis/redis/v8"
	"github.com/google/wire"
	"gorm.io/gorm"
	"selysia.com/post-store/src/internal/application"
	domainAi "selysia.com/post-store/src/internal/domain/ai"
	"selysia.com/post-store/src/internal/domain/ai/service"
	domainPost "selysia.com/post-store/src/internal/domain/post"
	"selysia.com/post-store/src/internal/infrastructure/cockroach"
	cockroachPost "selysia.com/post-store/src/internal/infrastructure/cockroach/post"
	"selysia.com/post-store/src/internal/infrastructure/openai"
	infraRedis "selysia.com/post-store/src/internal/infrastructure/redis"
	"selysia.com/post-store/src/testing/fakes/repositories"
	"time"
)

var providerSet wire.ProviderSet = wire.NewSet(
	cockroach.NewOrGetCockroachConnection,
	cockroachPost.NewCockroachPostRepository,
	application.NewPostApplicationService,
	application.NewAiApplicationService,
	service.NewAiAccessor,
	infraRedis.NewRedisClient,
	infraRedis.NewRedisRateLimiter,
	openai.NewOpenAiClient,
	ProvideRateLimit,
	ProvideRateTimeWindow,

	wire.Struct(new(infraRedis.NewRedisRateLimiterParameters), "Limit", "TimeWindow", "RedisClient"),

	wire.Bind(new(domainPost.Repository), new(cockroachPost.CockroachPostRepository)),
	wire.Bind(new(domainAi.RateLimiter), new(infraRedis.RateLimiter)),
)

func InitializeCockroachConnection() (*gorm.DB, error) {
	wire.Build(providerSet)
	return &gorm.DB{}, nil
}

func InitializePostRepository() (domainPost.Repository, error) {
	wire.Build(providerSet)
	return cockroachPost.CockroachPostRepository{}, nil
}

func InitializePostApplicationService() (application.PostApplicationService, error) {
	wire.Build(providerSet)
	return application.PostApplicationService{}, nil
}

func InitializeRedisClient() *redis.Client {
	wire.Build(providerSet)
	return &redis.Client{}
}

func ProvideRateLimit() infraRedis.RateLimit {
	return infraRedis.RateLimit(10)
}

func ProvideRateTimeWindow() infraRedis.RateTimeWindow {
	return infraRedis.RateTimeWindow(time.Hour * 24)
}

func InitializeRateLimiter() (domainAi.RateLimiter, error) {
	wire.Build(providerSet)
	return infraRedis.RateLimiter{}, nil
}

func InitializeAiApplicationService() (application.AiApplicationService, error) {
	wire.Build(providerSet)
	return application.AiApplicationService{}, nil
}

var providerInMemoryOnlySet wire.ProviderSet = wire.NewSet(
	cockroach.NewOrGetCockroachConnection,
	repositories.NewInMemoryPostRepository,
	application.NewPostApplicationService,

	wire.Bind(new(domainPost.Repository), new(*repositories.InMemoryPostRepository)),
)

func InitializePostRepositoryForTesting() domainPost.Repository {
	wire.Build(providerInMemoryOnlySet)
	return cockroachPost.CockroachPostRepository{}
}

func InitializePostApplicationServiceForTesting() application.PostApplicationService {
	wire.Build(providerInMemoryOnlySet)
	return application.PostApplicationService{}
}
