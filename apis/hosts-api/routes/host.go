package host

import (
	"hosts-api/db"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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

	for _, name := range req.Languages {
		createHostLanguageRelationship(name, h.ID)
	}

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

	if result.Error != nil {
		c.JSON(404, gin.H{
			"message": "did not find host with that ID",
		})

		return
	}

	c.JSON(200, gin.H{
		"host": host,
	})
}

func createHostLanguageRelationship(name string, hostId uuid.UUID) {
	var language db.Language
	db.MySqlDb.First(&language, "name = ?", name)
	hlrId := uuid.New()

	hlr := db.HostLanguageRelationship{ID: hlrId, HostId: hostId, LanguageId: language.ID}
	db.MySqlDb.Create(&hlr)
}

func setProps(h *db.Host, req *CreateHostRequest) {
	id := uuid.New()

	h.ID = id
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
}

func checkForExistingHost(email string) bool {
	var existingHost db.Host
	result := db.MySqlDb.First(&existingHost, "email = ?", email)

	return result.Error == nil
}
