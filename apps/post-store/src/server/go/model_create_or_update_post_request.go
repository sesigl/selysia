/*
 * Post Store API
 *
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * API version: 1
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"time"
)

type CreateOrUpdatePostRequest struct {
	Message string `json:"message"`

	PublishAt time.Time `json:"publishAt"`
}

// AssertCreateOrUpdatePostRequestRequired checks if the required fields are not zero-ed
func AssertCreateOrUpdatePostRequestRequired(obj CreateOrUpdatePostRequest) error {
	elements := map[string]interface{}{
		"message":   obj.Message,
		"publishAt": obj.PublishAt,
	}
	for name, el := range elements {
		if isZero := IsZeroValue(el); isZero {
			return &RequiredError{Field: name}
		}
	}

	return nil
}

// AssertRecurseCreateOrUpdatePostRequestRequired recursively checks if required fields are not zero-ed in a nested slice.
// Accepts only nested slice of CreateOrUpdatePostRequest (e.g. [][]CreateOrUpdatePostRequest), otherwise ErrTypeAssertionError is thrown.
func AssertRecurseCreateOrUpdatePostRequestRequired(objSlice interface{}) error {
	return AssertRecurseInterfaceRequired(objSlice, func(obj interface{}) error {
		aCreateOrUpdatePostRequest, ok := obj.(CreateOrUpdatePostRequest)
		if !ok {
			return ErrTypeAssertionError
		}
		return AssertCreateOrUpdatePostRequestRequired(aCreateOrUpdatePostRequest)
	})
}
