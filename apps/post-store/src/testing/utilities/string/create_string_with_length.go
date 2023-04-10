package string

func CreateStringWithLength(length int) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = 'a'
	}
	return string(b)
}
