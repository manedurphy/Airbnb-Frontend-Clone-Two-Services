package property

import (
	"errors"
	"log"
	"net/http"
	"os"
	"properties-api/db"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreatePropertyRequest struct {
	db.Property
	Cohosts []uuid.UUID `json:"cohosts"`
}

type CreatePhotoRequest struct {
	Photos []db.Photo
}

type Location struct {
	City    string `json:"city"`
	State   string `json:"state"`
	Country string `json:"country"`
}

type Reviews struct {
	NumberOfReviews int     `json:"numberOfReviews"`
	Rating          float64 `json:"rating"`
}

type GetPhotoHeaderDataResponse struct {
	IsSuperhost bool `json:"isSuperhost"`
	Location    `json:"location"`
	Photos      []db.Photo `json:"photos"`
	Reviews     `json:"reviews"`
	Title       string `json:"title"`
}

func CreateProperty(c *gin.Context) {
	req := CreatePropertyRequest{}

	if err := c.ShouldBind(&req); err != nil {
		panic(err)
	}

	p := db.Property{}
	setProps(&p, req)

	err := confirmHostExists(p.HostId)

	if err != nil {
		c.JSON(404, gin.H{
			"message": err.Error(),
		})

		return
	}

	db.MySqlDb.Create(&p)

	for _, cohost := range req.Cohosts {
		createCohost(cohost, p.ID)
	}

	c.JSON(201, gin.H{
		"property": p,
	})
}

func CreatePhotos(c *gin.Context) {
	req := CreatePhotoRequest{}

	if err := c.ShouldBind(&req); err != nil {
		panic(err)
	}

	for i, photo := range req.Photos {
		photo.ID = uuid.New()

		if i == 0 {
			photo.IsMain = true
		}

		db.MySqlDb.Create(&photo)
	}

	c.JSON(201, gin.H{
		"photos": "Your photos have been saved!",
	})
}

func GetCohosts(c *gin.Context) {
	roomNumber := c.Param("roomNumber")

	var property db.Property
	result := db.MySqlDb.First(&property, "room_number = ?", roomNumber)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Could not find property",
		})

		return
	}

	var cohosts []db.Cohost
	result = db.MySqlDb.Where("property_id = ?", property.ID).Find(&cohosts)

	if result.Error != nil {
		log.Fatal(result.Error)
	}

	c.JSON(http.StatusOK, gin.H{
		"duringYourStay": property.DuringYourStay,
		"cohosts":        cohosts,
		"hostId":         property.HostId,
	})
}

func GetPhotoHeaderData(c *gin.Context) {
	roomNumber := c.Param("roomNumber")

	var property db.Property
	result := db.MySqlDb.First(&property, "room_number = ?", roomNumber).Joins("left join photos on properties.id = photos.property_id")

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Could not find property",
		})

		return
	}

	var photos []db.Photo
	db.MySqlDb.Find(&photos, "property_id = ?", property.ID)

	reviews := Reviews{
		NumberOfReviews: 50,
		Rating:          4.28,
	}

	resp := GetPhotoHeaderDataResponse{}

	resp.Location.City = property.City
	resp.Location.State = property.State
	resp.Location.Country = property.Country
	resp.IsSuperhost = true
	resp.Photos = photos
	resp.Reviews = reviews
	resp.Title = property.Title

	c.JSON(http.StatusOK, gin.H{
		"property": resp,
	})
}

func setProps(p *db.Property, req CreatePropertyRequest) {
	id := uuid.New()

	p.ID = id
	p.Title = req.Title
	p.NumberOfReviews = req.NumberOfReviews
	p.DuringYourStay = req.DuringYourStay
	p.DuringYourStay = req.DuringYourStay
	p.City = req.City
	p.State = req.State
	p.Country = req.Country
	p.HostId = req.HostId
}

func createCohost(cohostId uuid.UUID, propertyId uuid.UUID) {
	id := uuid.New()
	cohost := db.Cohost{
		ID:         id,
		HostId:     cohostId,
		PropertyId: propertyId,
	}

	db.MySqlDb.Create(&cohost)
}

func confirmHostExists(hostId uuid.UUID) error {
	client := &http.Client{}
	request, _ := http.NewRequest("GET", os.Getenv("HOSTS_API")+"/api/hosts", nil)
	request.Header.Set("host_id", hostId.String())

	resp, _ := client.Do(request)

	if resp.StatusCode == 404 {
		return errors.New("could not find host with that ID, please try another")
	}

	return nil
}
