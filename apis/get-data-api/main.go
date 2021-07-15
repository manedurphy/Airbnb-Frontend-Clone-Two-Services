package main

import (
	data "get-data-api/routes"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	commonPath := "/apps/airbnb-clone"

	router.GET("/healthz", healthCheck)
	router.GET(commonPath+"/api/hosted-by/:roomNumber", data.GetHostedByData)
	router.GET(commonPath+"/api/photo-header/:roomNumber", data.GetPhotoHeaderData)
	router.Run(":8000")
}

func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "healthy!",
	})
}
