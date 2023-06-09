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

type PostResponse struct {
	Id string `json:"id"`

	Message string `json:"message"`

	UserId string `json:"userId"`

	PublishAt time.Time `json:"publishAt"`

	CreatedAt time.Time `json:"createdAt"`
}

// AssertPostResponseRequired checks if the required fields are not zero-ed
func AssertPostResponseRequired(obj PostResponse) error {
	elements := map[string]interface{}{
		"id":        obj.Id,
		"message":   obj.Message,
		"userId":    obj.UserId,
		"publishAt": obj.PublishAt,
		"createdAt": obj.CreatedAt,
	}
	for name, el := range elements {
		if isZero := IsZeroValue(el); isZero {
			return &RequiredError{Field: name}
		}
	}

	return nil
}

// AssertRecursePostResponseRequired recursively checks if required fields are not zero-ed in a nested slice.
// Accepts only nested slice of PostResponse (e.g. [][]PostResponse), otherwise ErrTypeAssertionError is thrown.
func AssertRecursePostResponseRequired(objSlice interface{}) error {
	return AssertRecurseInterfaceRequired(objSlice, func(obj interface{}) error {
		aPostResponse, ok := obj.(PostResponse)
		if !ok {
			return ErrTypeAssertionError
		}
		return AssertPostResponseRequired(aPostResponse)
	})
}
