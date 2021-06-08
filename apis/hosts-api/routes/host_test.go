package host

import (
	"bytes"
	"encoding/json"
	"hosts-api/db"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestCreateLanguageMethod(t *testing.T) {
	gin.SetMode(gin.TestMode)
	db.Connect()

	t.Run("Success", func(t *testing.T) {
		router := gin.Default()
		router.POST("/hosts/create-language", CreateLanguage)

		payload := db.Language{Name: "English"}
		body, err := json.Marshal(payload)

		if err != nil {
			t.Fatalf("could not marshal payload: %v\n", err)
		}

		req, err := http.NewRequest(http.MethodPost, "/hosts/create-language", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)
		resp, err := io.ReadAll(w.Body)

		expectedResp, _ := json.Marshal(gin.H{
			"message": "Successfully saved language",
		})

		if err != nil {
			t.Errorf("could not read response body: %v\n", err)
		}

		assert.Equal(t, 201, w.Code, "status code should be 201")
		assert.Equal(t, resp, expectedResp)
	})

	t.Run("LanguageExists", func(t *testing.T) {
		router := gin.Default()
		router.POST("/hosts/create-language", CreateLanguage)

		payload := db.Language{Name: "English"}
		body, err := json.Marshal(payload)

		if err != nil {
			t.Fatalf("could not marshal payload: %v\n", err)
		}

		req, err := http.NewRequest(http.MethodPost, "/hosts/create-language", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)
		resp, err := io.ReadAll(w.Body)

		expectedResp, _ := json.Marshal(gin.H{
			"message": "Language already exists",
		})

		if err != nil {
			t.Errorf("could not read response body: %v\n", err)
		}

		assert.Equal(t, 400, w.Code, "status code should be 400")
		assert.Equal(t, resp, expectedResp)
	})

}

func TestCreateHost(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("Success", func(t *testing.T) {
		router := gin.Default()
		router.POST("/hosts/create-host", CreateHost)

		host := db.Host{
			FirstName:        "Test",
			LastName:         "Host",
			Email:            "test@host.com",
			About:            "About the test host",
			Avatar:           "http://my.avatar/1.jpg",
			ResponseTime:     50,
			ResponseRate:     85,
			NumberOfReviews:  163,
			IdentityVerified: true,
			IsSuperhost:      false,
			JoinedOn:         "2021/06/01",
		}

		languages := []string{"English"}

		payload := CreateHostRequest{
			host,
			languages,
		}
		body, err := json.Marshal(payload)

		if err != nil {
			t.Fatalf("could not marshal payload: %v\n", err)
		}

		req, err := http.NewRequest(http.MethodPost, "/hosts/create-host", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")

		if err != nil {
			t.Errorf("could not send request: %v\n", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, 201, w.Code, "status code should be 201")
	})

	t.Run("Failure", func(t *testing.T) {
		router := gin.Default()
		router.POST("/hosts/create-host", CreateHost)

		host := db.Host{
			FirstName:        "Test",
			LastName:         "Host",
			Email:            "test@host.com",
			About:            "About the test host",
			Avatar:           "http://my.avatar/1.jpg",
			ResponseTime:     50,
			ResponseRate:     85,
			NumberOfReviews:  163,
			IdentityVerified: true,
			IsSuperhost:      false,
			JoinedOn:         "2021/06/01",
		}

		languages := []string{"English"}

		payload := CreateHostRequest{
			host,
			languages,
		}
		body, err := json.Marshal(payload)

		if err != nil {
			t.Fatalf("could not marshal payload: %v\n", err)
		}

		req, err := http.NewRequest(http.MethodPost, "/hosts/create-host", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")

		if err != nil {
			t.Errorf("could not send request: %v\n", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		resp, err := io.ReadAll(w.Body)

		expectedResp, _ := json.Marshal(gin.H{
			"message": "Host with that email already exists, please choose another.",
		})

		if err != nil {
			t.Errorf("could not read response body: %v\n", err)
		}

		assert.Equal(t, 400, w.Code, "status code should be 400")
		assert.Equal(t, resp, expectedResp)
	})
}
