package data

import "github.com/google/uuid"

type Cohost struct {
	ID         uuid.UUID `json:"id"`
	HostId     uuid.UUID `json:"hostId"`
	PropertyId uuid.UUID `json:"propertyId"`
}

type PropertiesHostedByData struct {
	Cohosts        []Cohost  `json:"cohosts"`
	DuringYourStay string    `json:"duringYourStay"`
	HostId         uuid.UUID `json:"hostId"`
}

type GetHostResp struct {
	Host `json:"host"`
}

type Host struct {
	FirstName        string     `json:"firstName"`
	About            string     `json:"about"`
	Avatar           string     `json:"avatar"`
	ResponseTime     int        `json:"responseTime"`
	ResponseRate     int        `json:"responseRate"`
	NumberOfReviews  int        `json:"numberOfReviews"`
	IdentityVerified bool       `json:"identityVerified"`
	IsSuperhost      bool       `json:"isSuperhost"`
	JoinedOn         string     `json:"joinedOn"`
	Languages        []Language `json:"languages"`
}

type Language struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Photo struct {
	ID          uuid.UUID `json:"id"`
	Link        string    `json:"link"`
	IsMain      bool      `json:"isMain"`
	Description string    `json:"description"`
	PropertyId  uuid.UUID `json:"propertyId"`
}

type GetPropertiesPhotoHeaderDataResp struct {
	Title           string    `json:"title"`
	City            string    `json:"city"`
	State           string    `json:"state"`
	Country         string    `json:"country"`
	Photos          []Photo   `json:"photos"`
	NumberOfReviews int       `json:"numberOfReviews"`
	Rating          float64   `json:"rating"`
	HostId          uuid.UUID `json:"hostId"`
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

type HostedByData struct {
	Cohosts        []Host `json:"cohosts"`
	Host           `json:"host"`
	DuringYourStay string `json:"duringYourStay"`
}

type PhotoHeaderData struct {
	Location    `json:"location"`
	Reviews     `json:"reviews"`
	IsSuperhost bool    `json:"isSuperhost"`
	Title       string  `json:"title"`
	Photos      []Photo `json:"photos"`
}
