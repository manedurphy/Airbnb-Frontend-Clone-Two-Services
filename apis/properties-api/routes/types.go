package property

import (
	"properties-api/db"

	"github.com/google/uuid"
)

type CreatePropertyRequest struct {
	db.Property
	Cohosts []uuid.UUID `json:"cohosts"`
}

type CreatePhotoRequest struct {
	Photos []db.Photo
}
