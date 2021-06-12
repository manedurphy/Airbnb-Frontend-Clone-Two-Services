package main

import (
	"hosts-api/db"
	host "hosts-api/routes"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	if os.Getenv("GO_ENV") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()
	db.Connect()

	router.GET("/hosts/healthz", healthCheck)
	router.GET("/hosts/host", host.GetHost)
	router.POST("/hosts/create-host", host.CreateHost)
	router.POST("/hosts/create-language", host.CreateLanguage)
	router.Run(":8080")
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "healthy!",
	})
}
