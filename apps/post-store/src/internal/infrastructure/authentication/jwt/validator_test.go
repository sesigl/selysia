package jwt_test

import (
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
	authJwt "selysia.com/post-store/src/internal/infrastructure/authentication/jwt"
	"testing"
	"time"
)

var sampleSecret = "SecretYouShouldHide"
var sampleSecretKey = []byte(sampleSecret)

func TestValidator_Validate(t *testing.T) {

	t.Run("returns error for invalid secret", func(t *testing.T) {
		validator := authJwt.NewValidator()
		futureTime := time.Now().Add(10 * time.Minute)

		_, err := validator.ValidateAndGetUserId(createRequestWithGeneratedJWT(futureTime), "wrong secret")
		assert.ErrorContains(t, err, "signature is invalid")
	})

	t.Run("returns no error for for valid secret and not expired token", func(t *testing.T) {
		validator := authJwt.NewValidator()
		futureTime := time.Now().Add(10 * time.Minute)

		userId, err := validator.ValidateAndGetUserId(createRequestWithGeneratedJWT(futureTime), sampleSecret)
		assert.Nil(t, err)
		assert.Equal(t, "user", userId)
	})

	t.Run("returns error if expired", func(t *testing.T) {
		validator := authJwt.NewValidator()
		pastTime := time.Now().Add(-10 * time.Minute)

		_, err := validator.ValidateAndGetUserId(createRequestWithGeneratedJWT(pastTime), sampleSecret)
		assert.ErrorContains(t, err, "token is expired")
	})
}

func createRequestWithGeneratedJWT(expiresAt time.Time) events.APIGatewayProxyRequest {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, authJwt.CustomClaims{
		Name: "name",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: &jwt.NumericDate{
				Time: expiresAt,
			},
			Subject: "user",
		},
	})
	tokenString, err := token.SignedString(sampleSecretKey)
	if err != nil {
		panic(fmt.Sprintf("Signing Error: %s", err))
	}

	return events.APIGatewayProxyRequest{
		Headers: map[string]string{"next-auth.session-token": tokenString},
	}
}
