package stubs

import (
	"fmt"
	"github.com/aws/aws-lambda-go/events"
)

type ValidatorMock struct {
	IsValid bool
	Subject string
}

func (mock ValidatorMock) ValidateAndGetUserId(_ events.APIGatewayProxyRequest, _ string) (string, error) {
	if !mock.IsValid {
		return "", fmt.Errorf("not valid")
	}

	return mock.Subject, nil
}
