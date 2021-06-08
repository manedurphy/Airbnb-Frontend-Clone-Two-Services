package db

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Host struct {
	ID               uuid.UUID  `gorm:"primaryKey;unique" json:"id"`
	FirstName        string     `json:"firstName"`
	LastName         string     `json:"lastName"`
	Email            string     `json:"email" gorm:"unique"`
	About            string     `json:"about"`
	Avatar           string     `json:"avatar"`
	ResponseTime     int        `json:"responseTime"`
	ResponseRate     int        `json:"responseRate"`
	NumberOfReviews  int        `json:"numberOfReviews"`
	IdentityVerified bool       `json:"identityVerified"`
	IsSuperhost      bool       `json:"isSuperhost"`
	JoinedOn         string     `json:"joinedOn"`
	Languages        []Language `gorm:"many2many:host_languages" json:"languages"`
}

type Language struct {
	ID   int    `gorm:"primaryKey" json:"id"`
	Name string `json:"name" gorm:"unique"`
}

func (h *Host) BeforeCreate(tx *gorm.DB) (err error) {
	tx.Statement.SetColumn("ID", uuid.New())
	return nil
}
