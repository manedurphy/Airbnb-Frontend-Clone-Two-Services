package property

import (
	"errors"
	"net/http"
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

func setProps(p *db.Property, req CreatePropertyRequest) {
	id := uuid.New()

	p.ID = id
	p.Title = req.Title
	p.Rating = req.Rating
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
	request, _ := http.NewRequest("GET", "http://localhost:8080/api/hosts", nil)
	request.Header.Set("host_id", hostId.String())

	resp, _ := client.Do(request)

	if resp.StatusCode == 404 {
		return errors.New("could not find host with that ID, please try another")
	}

	return nil
}
