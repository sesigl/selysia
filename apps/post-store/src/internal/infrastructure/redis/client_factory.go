package redis

import (
	"github.com/go-redis/redis/v8"
	"os"
	"selysia.com/post-store/src/internal/infrastructure/golang"
)

func NewRedisClient() *redis.Client {
	var opt = golang.Must(redis.ParseURL(os.Getenv("POST_STORE_REDIS_URL")))
	return redis.NewClient(opt)
}
