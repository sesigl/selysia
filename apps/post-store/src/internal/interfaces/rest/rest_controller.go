package rest

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"os"
	"selysia.com/post-store/src/internal/infrastructure/authentication/jwt"
)

type elementOrList interface {
	any | []any
}

type domainDataAccessor[T elementOrList] interface {
	Execute(request events.APIGatewayProxyRequest, authUserId string) (T, error)
}

type Controller[T elementOrList] struct {
	Validator           jwt.Validator
	DomainDataAccessor  domainDataAccessor[T]
	SuccessResponseCode statusCode
}

func NewController[T elementOrList](controllerBase Controller[T]) Controller[T] {
	if controllerBase.DomainDataAccessor == nil {
		panic("can not instantiate Controller: domain data accessor is required")
	}

	var successResponseCode = Success
	if controllerBase.SuccessResponseCode != 0 {
		successResponseCode = controllerBase.SuccessResponseCode
	}

	var validator jwt.Validator
	if controllerBase.Validator != nil {
		validator = controllerBase.Validator
	} else {
		validator = jwt.NewValidator()
	}

	return Controller[T]{
		Validator:           validator,
		DomainDataAccessor:  controllerBase.DomainDataAccessor,
		SuccessResponseCode: successResponseCode,
	}

}

func (controller Controller[T]) CreateApiResponse(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	authUserId, err := controller.Validator.ValidateAndGetUserId(request, os.Getenv("NEXTAUTH_SECRET"))
	if err != nil {
		return events.APIGatewayProxyResponse{}, fmt.Errorf("invalidat jwt token: %w", err)
	}

	responseObjectData, err := controller.DomainDataAccessor.Execute(request, authUserId)
	if err != nil {
		return events.APIGatewayProxyResponse{}, fmt.Errorf("error during domain code execution: %w", err)
	}

	marshalledResponse, err := json.Marshal(responseObjectData)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	return events.APIGatewayProxyResponse{Body: string(marshalledResponse), StatusCode: int(controller.SuccessResponseCode), Headers: map[string]string{
		"access-control-allow-headers": "next-auth.session-token",
		"access-control-allow-methods": "*",
		"access-control-allow-origin":  os.Getenv("API_ALLOW_ORIGIN"),
	}}, nil

}
