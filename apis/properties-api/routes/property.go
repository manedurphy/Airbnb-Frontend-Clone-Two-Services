package property

import (
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"properties-api/db"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/hashicorp/go-hclog"
)

var (
	test   = flag.Bool("test", false, "set to true when running unit tests")
	logger = hclog.New(&hclog.LoggerOptions{
		Name:       "properties	",
		Level:      hclog.Debug,
		Color:      hclog.ColorOff,
		TimeFormat: time.RFC3339Nano,
	})
)

func CreateProperty(c *gin.Context) {
	flag.Parse()
	req := CreatePropertyRequest{}

	logger := logger.With("func", "CreateProperty")

	if err := c.ShouldBind(&req); err != nil {
		sendResponse(c, gin.H{"message": "invalid payload"}, 400)
		return
	}

	logger.With("req", req).Debug("request received")

	p := db.Property{}
	setProps(&p, req)

	logger.With("property", p).Debug("constructed property from request info")

	if !*test {
		err := confirmHostExists(p.HostId)

		if err != nil {
			logger.With("err", err).Debug("failed to confirm if host exists")
			c.JSON(404, gin.H{
				"message": err.Error(),
			})

			return
		}
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

func GetPropertiesHostedByData(c *gin.Context) {
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

func GetPropertiesPhotoHeaderData(c *gin.Context) {
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

	response := gin.H{
		"title":           property.Title,
		"city":            property.City,
		"state":           property.State,
		"country":         property.Country,
		"photos":          photos,
		"numberOfReviews": property.NumberOfReviews,
		"rating":          property.Rating,
		"hostId":          property.HostId,
	}

	c.JSON(http.StatusOK, response)
}

func setProps(p *db.Property, req CreatePropertyRequest) {
	id := uuid.New()

	p.ID = id
	p.Title = req.Title
	p.NumberOfReviews = req.NumberOfReviews
	p.Rating = 4.12
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
	request, _ := http.NewRequest("GET", os.Getenv("HOSTS_API")+"/hosts/host", nil)
	request.Header.Set("host_id", hostId.String())

	resp, err := client.Do(request)
	if err != nil {
		return fmt.Errorf("failed to make request: %w", err)
	}

	if resp.StatusCode == 404 {
		return errors.New("could not find host with that ID, please try another")
	}

	return nil
}

func sendResponse(c *gin.Context, response interface{}, statusCode int) {
	c.JSON(statusCode, response)
}
