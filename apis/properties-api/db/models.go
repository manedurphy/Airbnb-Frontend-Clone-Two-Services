package db

import (
	"github.com/google/uuid"
)

type Property struct {
	ID              uuid.UUID `gorm:"primaryKey" json:"id"`
	Title           string    `json:"title"`
	Rating          float64   `json:"rating"` // can be calculated instead
	NumberOfReviews int       `json:"numberOfReviews"`
	DuringYourStay  string    `json:"duringYourStay"`
	City            string    `json:"city"`
	State           string    `json:"state"`
	Country         string    `json:"country"`
	HostId          uuid.UUID `json:"hostId"`
}

type Cohost struct {
	ID         uuid.UUID `gorm:"primaryKey"`
	HostId     uuid.UUID `json:"hostId"`
	PropertyId uuid.UUID `json:"propertyId"`
}

type Photo struct {
	ID          uuid.UUID `gorm:"primaryKey"`
	Link        string    `json:"link"`
	IsMain      bool      `json:"isMain"`
	Description string    `json:"description"`
	PropertyId  uuid.UUID `json:"propertyId"`
}
