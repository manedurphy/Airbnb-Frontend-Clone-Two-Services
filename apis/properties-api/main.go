package main

import (
	"properties-api/db"
	property "properties-api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	db.Connect()

	router.GET("/properties/healthz", healthCheck)
	router.GET("/properties/:roomNumber", property.GetPhotoHeaderData)
	router.GET(("/properties/hosted-by/:roomNumber"), property.GetPropertiesHostedByData)
	router.POST("/properties/create-property", property.CreateProperty)
	router.POST("/properties/create-photos", property.CreatePhotos)
	router.Run(":8081")
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "healthy!",
	})
}
