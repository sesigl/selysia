package application

import (
	"fmt"
	"selysia.com/post-store/src/internal/domain/ai"
	domainAi "selysia.com/post-store/src/internal/domain/ai/service"
)

func NewAiApplicationService(aiAccessor domainAi.Accessor, limiter ai.RateLimiter) AiApplicationService {

	return AiApplicationService{
		aiAccessor:  aiAccessor,
		rateLimiter: limiter,
	}

}

type AiApplicationService struct {
	aiAccessor  domainAi.Accessor
	rateLimiter ai.RateLimiter
}

type CreateContentReply struct {
	Content string
	ai.RateLimit
}

func (as AiApplicationService) CreateContentAbout(text string, actor string, userId string) (CreateContentReply, error) {

	rateLimit, err := as.rateLimiter.Allow(userId)
	if err != nil {
		return CreateContentReply{}, fmt.Errorf("rate limit reached: %w", err)
	}

	generatedText, err := as.aiAccessor.GenerateTweetAboutText(text, actor)

	return CreateContentReply{
		Content:   generatedText,
		RateLimit: rateLimit,
	}, err
}
