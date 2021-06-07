package main

import (
	data "get-data-api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/api/healthz", data.HealthCheck)
	router.GET("/api/hosted-by/:roomNumber", data.GetHostedByData)
	router.GET("/api/photo-header/:roomNumber", data.GetPhotoHeaderData)
	router.Run(":8000")
}
