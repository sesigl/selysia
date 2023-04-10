package ai

import "time"

type RateLimitConfiguration struct {
	Key      string
	Duration time.Duration
	Limit    int
}

type RateLimit struct {
	TimeUntilRefresh time.Duration
	Usage            int
	Limit            int
}

type RateLimiter interface {
	Allow(key string) (RateLimit, error)
}
