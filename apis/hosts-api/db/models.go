package db

import (
	"github.com/google/uuid"
)

type Host struct {
	ID               uuid.UUID `gorm:"primaryKey;unique"`
	FirstName        string    `json:"firstName"`
	LastName         string    `json:"lastName"`
	Email            string    `json:"email" gorm:"unique"`
	About            string    `json:"about"`
	Avatar           string    `json:"avatar"`
	ResponseTime     int       `json:"responseTime"`
	ResponseRate     int       `json:"responseRate"`
	NumberOfReviews  int       `json:"numberOfReviews"`
	IdentityVerified bool      `json:"identityVerified"`
	IsSuperhost      bool      `json:"isSuperhost"`
}

type Language struct {
	ID   int    `gorm:"primaryKey"`
	Name string `json:"name" gorm:"unique"`
}

type HostLanguageRelationship struct {
	ID         uuid.UUID `gorm:"primaryKey;unique"`
	HostId     uuid.UUID
	LanguageId int
}
