package host

import (
	"errors"
	"fmt"
	"hosts-api/db"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/hashicorp/go-hclog"
	"gorm.io/gorm"
)

var (
	logger = hclog.New(&hclog.LoggerOptions{
		Name:       "hosts",
		Level:      hclog.Debug,
		Color:      hclog.ColorOff,
		TimeFormat: time.RFC3339Nano,
	})
)

func CreateHost(c *gin.Context) {
	req := CreateHostRequest{}

	logger := logger.With("func", "CreateHost")

	if err := c.ShouldBind(&req); err != nil {
		logger.Error("failed bind request body: %s\n", err)
		return
	}

	logger.With("req", req).Debug("request received")

	h := db.Host{}
	setProps(&h, &req)

	logger.With("host", h).Debug("constructed host from request info")

	hostExists := checkForExistingHost(h.Email)

	if hostExists {
		c.JSON(400, gin.H{
			"message": "Host with that email already exists, please choose another.",
		})

		return
	}

	db.MySqlDb.Create(&h)

	c.JSON(201, gin.H{
		"host": h,
	})
}

func CreateLanguage(c *gin.Context) {
	var language db.Language

	if err := c.ShouldBind(&language); err != nil {
		panic(err)
	}

	result := db.MySqlDb.Create(&language)

	if result.Error != nil {
		c.JSON(400, gin.H{
			"message": "Language already exists",
		})

		return
	}

	c.JSON(201, gin.H{
		"message": "Successfully saved language",
	})
}

func GetHost(c *gin.Context) {
	id := c.Request.Header.Get("host_id")

	if id == "" {
		c.JSON(400, gin.H{
			"message": "must include host_id in header",
		})

		return
	}

	var host db.Host
	result := db.MySqlDb.First(&host, "id = ?", id)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		fmt.Printf("error getting host: %v\n", result.Error.Error())
		c.JSON(404, gin.H{
			"message": "could not find host",
		})

		return
	}

	setLanguages(id, &host)

	c.JSON(200, gin.H{
		"host": host,
	})
}

func setProps(h *db.Host, req *CreateHostRequest) {
	h.FirstName = req.FirstName
	h.LastName = req.LastName
	h.Email = req.Email
	h.About = req.About
	h.Avatar = req.Avatar
	h.ResponseTime = req.ResponseTime
	h.ResponseRate = req.ResponseRate
	h.NumberOfReviews = req.NumberOfReviews
	h.IdentityVerified = req.IdentityVerified
	h.IsSuperhost = req.IsSuperhost
	h.JoinedOn = req.JoinedOn

	var languages []db.Language
	db.MySqlDb.Where("name IN ?", req.Languages).Find(&languages)

	h.Languages = languages
}

func setLanguages(id string, host *db.Host) {
	var languages []db.Language
	db.MySqlDb.Raw("SELECT * FROM languages WHERE id IN (SELECT language_id from host_languages WHERE host_id = ?)", host.ID.String()).Scan(&languages)
	host.Languages = languages
}

func checkForExistingHost(email string) bool {
	var existingHost db.Host
	result := db.MySqlDb.First(&existingHost, "email = ?", email)

	return result.Error == nil
}
