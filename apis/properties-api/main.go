package main

import (
	"properties-api/db"
	property "properties-api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	db.Connect()

	router.GET("/api/properties/healthz", healthCheck)
	router.POST("/api/properties/create-property", property.CreateProperty)
	router.POST("/api/properties/create-photos", property.CreatePhotos)
	router.Run(":8081")
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "healthy!",
	})
}
