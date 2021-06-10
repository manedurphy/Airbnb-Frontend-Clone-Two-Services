package main

import (
	data "get-data-api/routes"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/api/healthz", healthCheck)
	router.GET("/api/hosted-by/:roomNumber", data.GetHostedByData)
	router.GET("/api/photo-header/:roomNumber", data.GetPhotoHeaderData)
	router.Run(":8000")
}

func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "healthy!",
	})
}
