package data

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"

	cache "get-data-api/cache"

	"github.com/gin-gonic/gin"
)

var (
	ctx = context.Background()
)

func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "healthy!",
	})
}

func GetHostedByData(c *gin.Context) {
	roomNumber := c.Param("roomNumber")

	data, _ := cache.GetHostedByData(ctx, roomNumber)

	if data != "" {
		fmt.Println("Retrieved data from Redis store!")
		c.JSON(http.StatusOK, gin.H{
			"hostedby": data,
		})
		return
	}

	resp, _ := http.Get(os.Getenv("HOSTS_API") + "/hosts/hosted-by/" + roomNumber)

	if resp.StatusCode == 404 {
		c.JSON(resp.StatusCode, gin.H{
			"message": "could not find data for this room",
		})
		return
	}

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	cache.WriteHostedByData(ctx, body, roomNumber)
	c.JSON(http.StatusOK, gin.H{
		"hostedby": string(body),
	})
}

func GetPhotoHeaderData(c *gin.Context) {
	roomNumber := c.Param("roomNumber")

	data, _ := cache.GetPhotoHeaderData(ctx, roomNumber)

	if data != "" {
		fmt.Println("Retrieved data from Redis store!")
		c.JSON(http.StatusOK, gin.H{
			"photoheader": data,
		})
		return
	}

	resp, _ := http.Get(os.Getenv("PROPERTIES_API") + "/properties/" + roomNumber)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	cache.WritePhotoHeaderData(ctx, body, roomNumber)
	c.JSON(http.StatusOK, gin.H{
		"photoheader": string(body),
	})
}
