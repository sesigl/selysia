package redis

import (
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/stretchr/testify/assert"
	"math/rand"
	"selysia.com/post-store/src/internal/infrastructure/golang"
	"testing"
	"time"
)

var opt = golang.Must(redis.ParseURL("rediss://default:530c2653464a407d8294a4aab0d3da4c@eu2-cheerful-unicorn-32404.upstash.io:32404"))
var redisClient = redis.NewClient(opt)

func TestRateLimiter(t *testing.T) {

	t.Run("when Limit reached - returns no errors", func(t *testing.T) {
		limiter := golang.Must(NewRedisRateLimiter(NewRedisRateLimiterParameters{
			Limit:       10,
			TimeWindow:  time.Second * 10,
			RedisClient: redisClient,
		}))

		userId := generateRandomUserId()
		for i := 1; i <= 10; i++ {
			rateLimit := golang.Must(limiter.Allow(userId))

			assert.Equal(t, i, rateLimit.Usage)
			assert.Equal(t, 10, rateLimit.Limit)
			assert.True(t, rateLimit.TimeUntilRefresh <= time.Second*10 && rateLimit.TimeUntilRefresh >= time.Second*8, fmt.Sprintf("time until refresh should be ge 8 and le 10 but is %v", rateLimit.TimeUntilRefresh))
		}

	})

	t.Run("when Limit violated - returns error", func(t *testing.T) {
		limiter := golang.Must(NewRedisRateLimiter(NewRedisRateLimiterParameters{
			Limit:       10,
			TimeWindow:  time.Second * 10,
			RedisClient: redisClient,
		}))

		userId := generateRandomUserId()
		for i := 1; i <= 10; i++ {
			golang.Must(limiter.Allow(userId))
		}

		rateLimit, err := limiter.Allow(userId)

		assert.Zero(t, rateLimit)
		assert.NotNil(t, err)
		assert.ErrorContains(t, err, "reached: 11/10")
	})

	t.Run("limits do not interfere", func(t *testing.T) {
		limiter := golang.Must(NewRedisRateLimiter(NewRedisRateLimiterParameters{
			Limit:       10,
			TimeWindow:  time.Second * 10,
			RedisClient: redisClient,
		}))

		userId := generateRandomUserId()
		for i := 1; i <= 10; i++ {
			golang.Must(limiter.Allow(userId))
		}

		_, err := limiter.Allow(generateRandomUserId())

		assert.Nil(t, err)
	})
}

func generateRandomUserId() string {
	return fmt.Sprintf("test-userId-%v", rand.Int())
}
