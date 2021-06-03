package main

import (
	"hosts-api/db"
	host "hosts-api/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	db.Connect()

	router.GET("/api/hosts/healthz", healthCheck)
	router.GET("/api/hosts", host.GetHost)
	router.POST("/api/hosts/create-host", host.CreateHost)
	router.POST("/api/hosts/create-language", host.CreateLanguage)
	router.Run()
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "healthy!",
	})
}
