package service

import (
	"regexp"
	"strings"
)

type textFn = func(in string) string

func RemoveHashTagsFn() textFn {
	return removeHashTags
}

var hashtagRegex = regexp.MustCompile("#(\\w+)")
var whiteSpaceRegex = regexp.MustCompile("( +)")
var quoteRegex = regexp.MustCompile("([\"'`]+)")

func removeHashTags(text string) string {
	return removeNotNecessaryWhitespacesAndQuotes(
		hashtagRegex.ReplaceAllString(text, ""),
	)
}

func removeNotNecessaryWhitespacesAndQuotes(text string) string {
	withoutQuotes := quoteRegex.ReplaceAllString(text, " ")
	withoutSpaces := strings.TrimSpace(whiteSpaceRegex.ReplaceAllString(withoutQuotes, " "))
	return withoutSpaces
}
