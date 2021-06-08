package host

import (
	"encoding/json"
	"fmt"
	"hosts-api/db"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type CreateHostRequest struct {
	db.Host
	Languages []string `json:"languages"`
}

func CreateHost(c *gin.Context) {
	req := CreateHostRequest{}

	if err := c.ShouldBind(&req); err != nil {
		panic(err)
	}

	h := db.Host{}
	setProps(&h, &req)

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
	result := db.MySqlDb.Find(&host, "id = ?", id)

	if result.Error != nil {
		fmt.Printf("error getting host: %v\n", result.Error.Error())
		c.JSON(404, gin.H{
			"message": "could not find host",
		})

		return
	}

	var languages []db.Language
	db.MySqlDb.Raw("SELECT * FROM languages WHERE id in (SELECT language_id from host_languages WHERE host_id = ?)", id).Scan(&languages)
	host.Languages = languages

	c.JSON(200, gin.H{
		"host": host,
	})
}

func GetSuperhostStatus(c *gin.Context) {
	hostId := c.Param("hostId")

	var host db.Host
	result := db.MySqlDb.Where("id = ?", hostId).First(&host)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "could not find host",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"isSuperhost": host.IsSuperhost,
	})
}

type Cohost struct {
	ID         string `json:"id"`
	HostId     string `json:"hostId"`
	PropertyId string `json:"propertyId"`
}

type GetCohostsResponse struct {
	DuringYourStay string   `json:"duringYourStay"`
	Cohosts        []Cohost `json:"cohosts"`
	HostId         string   `json:"hostId"`
}

func GetHostedByData(c *gin.Context) {
	roomNumber := c.Param("roomNumber")
	resp, err := http.Get(os.Getenv("PROPERTIES_API") + "/properties/cohosts/" + roomNumber)

	if err != nil {
		panic(err)
	}

	if resp.StatusCode == 404 {
		c.JSON(resp.StatusCode, gin.H{
			"message": "property could not be found",
		})
		return
	}

	hostedByReponse := GetCohostsResponse{}
	body, err := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	if err != nil {
		panic(err)
	}

	json.Unmarshal(body, &hostedByReponse)

	var cohosts []db.Host
	for _, cohost := range hostedByReponse.Cohosts {
		var ch db.Host
		db.MySqlDb.Where("id = ?", cohost.HostId).First(&ch)
		cohosts = append(cohosts, ch)
	}

	var host db.Host
	db.MySqlDb.Where("id = ?", hostedByReponse.HostId).First(&host)

	// var hostLanguageRelationship db.HostLanguageRelationship
	// db.MySqlDb.Where("host_id = ?", host.ID).First(&hostLanguageRelationship)

	// var languages []db.Language
	// db.MySqlDb.Where("id = ?", hostLanguageRelationship.LanguageId).Find(&languages)

	c.JSON(resp.StatusCode, gin.H{
		"cohosts":        cohosts,
		"host":           host,
		"duringYourStay": hostedByReponse.DuringYourStay,
		// "languages":      languages,
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

func checkForExistingHost(email string) bool {
	var existingHost db.Host
	result := db.MySqlDb.First(&existingHost, "email = ?", email)

	return result.Error == nil
}
