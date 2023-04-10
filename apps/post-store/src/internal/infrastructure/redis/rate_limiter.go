package redis

import (
	"context"
	"fmt"
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-redis/redis/v8"
	"log"
	"selysia.com/post-store/src/internal/domain/ai"
	"time"
)

type RateLimiter struct {
	NewRedisRateLimiterParameters
}

type RateLimit = int
type RateTimeWindow = time.Duration

type NewRedisRateLimiterParameters struct {
	Limit       RateLimit
	TimeWindow  RateTimeWindow
	RedisClient *redis.Client
}

func NewRedisRateLimiter(parameters NewRedisRateLimiterParameters) (RateLimiter, error) {

	err := validation.ValidateStruct(&parameters,
		validation.Field(&parameters.Limit, validation.Required, validation.Min(1), validation.Max(time.Hour*24*90)),
		validation.Field(&parameters.TimeWindow, validation.Required, validation.Min(1), validation.Max(time.Hour*24*90)),
		validation.Field(&parameters.RedisClient, validation.Required),
	)

	if err != nil {
		return RateLimiter{}, err
	}

	return RateLimiter{
		NewRedisRateLimiterParameters: parameters,
	}, nil
}

func (r RateLimiter) Allow(key string) (ai.RateLimit, error) {
	var ctx = context.Background()

	getCmd := r.RedisClient.Get(ctx, key)
	if getCmd.Err() == redis.Nil {
		setCmd := r.RedisClient.Set(ctx, key, "0", r.TimeWindow)
		if setCmd.Err() != nil {
			return ai.RateLimit{}, setCmd.Err()
		}
	}

	incCmd := r.RedisClient.Incr(ctx, key)
	if incCmd.Err() != nil {
		log.Println(incCmd.Err())
		return ai.RateLimit{}, incCmd.Err()
	}
	requestsNum := int(incCmd.Val())

	if requestsNum > r.Limit {
		return ai.RateLimit{}, fmt.Errorf("rate Limit for key %s reached: %v/%v", key, requestsNum, r.Limit)
	}

	ttlCmd := r.RedisClient.TTL(ctx, key)

	return ai.RateLimit{
		TimeUntilRefresh: ttlCmd.Val(),
		Usage:            requestsNum,
		Limit:            r.Limit,
	}, nil

}
