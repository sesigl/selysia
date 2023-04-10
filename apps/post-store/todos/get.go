package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/golang-jwt/jwt/v5"
)

// Account is our model, which corresponds to the "accounts" table
type Account struct {
	ID      uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();json:"id,omitempty"`
	Balance int       `json:"title"`
}

type JWTToken struct {
	Name                     string `json:"name"`
	ExpireTimestampInSeconds int64  `json:"exp"`
}

type MyCustomClaims struct {
	Name string `json:"name"`
	jwt.RegisteredClaims
}

const successStatusCode = 200

var db *gorm.DB

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	cockroachDBUrl := os.Getenv("COCKROACHDB_URL")
	nextAuthSecret := os.Getenv("NEXTAUTH_SECRET")
	tokenString := request.Headers["next-auth.session-token"]

	fmt.Printf("token strign from header: %s\n", tokenString)

	// sample token string taken from the New example
	//tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2ViYXN0aWFuIFNpZ2wiLCJlbWFpbCI6ImFrcmlsbG84OUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzE1ODEwOTcyNjg0Mzc5ODMyMzIvaHB4WXhhQzQuanBnIiwic3ViIjoiY2xlbjVucGl3MDAwMnpsemdkb2V1Z2treiIsImlhdCI6MTY3NzkyNjQ3MSwiZXhwIjoxNjc4MDEyODcxfQ.oZKt_hIfDjYd_qwi72D5ctPWJ2EqueszKhuYkvomuts"
	//tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2ViYXN0aWFuIFNpZ2wiLCJlbWFpbCI6ImFrcmlsbG84OUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzE1ODEwOTcyNjg0Mzc5ODMyMzIvaHB4WXhhQzQuanBnIiwic3ViIjoiY2xlbjVucGl3MDAwMnpsemdkb2V1Z2treiIsImlhdCI6MTY3NzkyNjU1NCwiZXhwIjoxNjc3OTI2NjE0fQ.1c_NNeDI1cftTQ5UyFWwJ18rTouC7FfWRYZBT9kmE8A"

	start := time.Now()
	token, err := jwt.ParseWithClaims(tokenString, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(nextAuthSecret), nil
	})
	timeTrack(start, "v2 auth")

	if err != nil {
		fmt.Printf("failed to decrypt: %s", err)
	}

	fmt.Printf("token %v\n", token)

	start = time.Now()

	if db == nil {
		db, err = gorm.Open(postgres.Open(cockroachDBUrl+"&application_name=$ docs_simplecrud_gorm"), &gorm.Config{})
		if err != nil {
			log.Fatal(err)
		}
	} else {
		fmt.Printf("use existing db connection")
	}

	timeTrack(start, "open or use connection")

	newID := uuid.New()
	newBalance := rand.Intn(10000)

	start = time.Now()
	db.Create(&Account{ID: newID, Balance: newBalance})
	timeTrack(start, "create account")

	start = time.Now()
	var accounts []Account
	db.Find(&accounts)
	timeTrack(start, "find accounts")

	start = time.Now()
	// Marshal to type []uint8
	marshalledAccountResponse, _ := json.Marshal(accounts)
	timeTrack(start, "json marshalling")

	// Return marshalled item
	return events.APIGatewayProxyResponse{Body: string(marshalledAccountResponse), StatusCode: successStatusCode}, nil
}

func timeTrack(start time.Time, name string) {
	elapsed := time.Since(start)
	log.Printf("%s took %s", name, elapsed)
}

func sameValue(value string) string {
	return value
}

func main() {
	lambda.Start(Handler)
}
