package property

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"properties-api/db"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

var propertyId uuid.UUID = uuid.New()

func TestCreateProperty(t *testing.T) {
	gin.SetMode(gin.TestMode)
	db.Connect()

	router := gin.Default()
	t.Run("Success", func(t *testing.T) {
		router.POST("/properties/create-property", CreateProperty)

		payload := CreatePropertyRequest{
			Property: db.Property{
				ID:              propertyId,
				Title:           "Test property",
				NumberOfReviews: 50,
				City:            "Test city",
				State:           "CA",
				Country:         "United States",
				HostId:          uuid.New(),
				DuringYourStay:  "Test during your stay",
				RoomNumber:      1,
			},
			Cohosts: []uuid.UUID{
				uuid.New(),
				uuid.New(),
				uuid.New(),
			},
		}

		body, err := json.Marshal(payload)
		if err != nil {
			t.Fatalf("could not marshal payload: %v\n", err)
		}

		req, err := http.NewRequest(http.MethodPost, "/properties/create-property", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)

		if err != nil {
			t.Errorf("could not read response body: %v\n", err)
		}

		assert.Equal(t, http.StatusCreated, w.Code, "status code should be 201")
	})

	t.Run("Failure", func(t *testing.T) {
		req, err := http.NewRequest(http.MethodPost, "/properties/create-property", nil)
		req.Header.Set("Content-Type", "application/json")

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		resp, err := io.ReadAll(w.Body)

		if err != nil {
			t.Errorf("could not read response body: %v\n", err)
		}

		expectedResp, _ := json.Marshal(gin.H{
			"message": "invalid payload",
		})

		assert.Equal(t, http.StatusBadRequest, w.Code, "status code should be 400")
		assert.Equal(t, expectedResp, resp, "should tell user the data sent is invalid")
	})
}

func TestCreatePhotos(t *testing.T) {
	router := gin.Default()
	router.POST("/properties/create-photos", CreatePhotos)

	t.Run("Success", func(t *testing.T) {
		payload := CreatePhotoRequest{
			Photos: []db.Photo{
				{
					ID:          uuid.New(),
					Link:        "https://my.test/image/jpg",
					Description: "Test description for test photo",
					PropertyId:  propertyId,
				},
			},
		}

		body, err := json.Marshal(payload)
		if err != nil {
			t.Fatalf("could not marshal payload: %v\n", err)
		}

		req, err := http.NewRequest(http.MethodPost, "/properties/create-photos", bytes.NewBuffer(body))
		req.Header.Set("Content-Type", "application/json")

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)

		resp, err := io.ReadAll(w.Body)
		if err != nil {
			t.Errorf("could not read response body: %v\n", err)
		}

		expectedResp, _ := json.Marshal(gin.H{
			"photos": "Your photos have been saved!",
		})

		assert.Equal(t, http.StatusCreated, w.Code, "status code should be 201")
		assert.Equal(t, expectedResp, resp, "should tell user that the photos were created")
	})
}

func TestGetPropertiesHostedByData(t *testing.T) {
	router := gin.Default()
	router.GET("/properties/hosted-by/:roomNumber", GetPropertiesHostedByData)

	t.Run("Success", func(t *testing.T) {
		req, err := http.NewRequest(http.MethodGet, "/properties/hosted-by/1", nil)

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code, "status code should be 200")
	})

	t.Run("Failure", func(t *testing.T) {
		req, err := http.NewRequest(http.MethodGet, "/properties/hosted-by/2", nil)

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		body, err := io.ReadAll(w.Body)

		if err != nil {
			t.Fatalf("could not read response body: %v", err)
		}

		expectedResp, _ := json.Marshal(gin.H{
			"message": "Could not find property",
		})

		assert.Equal(t, http.StatusNotFound, w.Code, "status code should be 200")
		assert.Equal(t, expectedResp, body)
	})
}

func TestGetPropertiesPhotoHeaderData(t *testing.T) {
	router := gin.Default()
	router.GET("/properties/:roomNumber", GetPropertiesPhotoHeaderData)

	t.Run("Success", func(t *testing.T) {
		req, err := http.NewRequest(http.MethodGet, "/properties/1", nil)

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code, "status code should be 200")
	})

	t.Run("Failure", func(t *testing.T) {
		req, err := http.NewRequest(http.MethodGet, "/properties/2", nil)

		if err != nil {
			t.Fatalf("could not create a request: %v\n", err)
		}

		w := httptest.NewRecorder()
		router.ServeHTTP(w, req)

		body, err := io.ReadAll(w.Body)

		if err != nil {
			t.Fatalf("could not read response body: %v", err)
		}

		expectedResp, _ := json.Marshal(gin.H{
			"message": "Could not find property",
		})

		assert.Equal(t, http.StatusNotFound, w.Code, "status code should be 200")
		assert.Equal(t, expectedResp, body)
	})
}
