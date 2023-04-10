package jwt

import (
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/golang-jwt/jwt/v5"
)

type CustomClaims struct {
	Name string `json:"name"`
	jwt.RegisteredClaims
}

type Validator interface {
	ValidateAndGetUserId(request events.APIGatewayProxyRequest, secret string) (string, error)
}

type ValidatorImpl struct {
}

func NewValidator() Validator {
	return ValidatorImpl{}
}

func (validator ValidatorImpl) ValidateAndGetUserId(request events.APIGatewayProxyRequest, secret string) (string, error) {

	nextAuthSecret := secret
	if nextAuthSecret == "" {
		panic("No next auth secret")
	}

	nextAuthSessionToken, err := validator.getJwtToken(request)
	if err != nil {
		panic("No next auth session token")
	}

	token, err := jwt.ParseWithClaims(nextAuthSessionToken, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(nextAuthSecret), nil
	})

	if err != nil {
		return "", err
	}

	subject, err := token.Claims.GetSubject()

	return subject, err
}

func (validator ValidatorImpl) getJwtToken(request events.APIGatewayProxyRequest) (string, error) {
	jwtToken, ok := request.Headers["next-auth.session-token"]
	if !ok {
		return "", fmt.Errorf("no session token in header")
	}
	return jwtToken, nil
}
