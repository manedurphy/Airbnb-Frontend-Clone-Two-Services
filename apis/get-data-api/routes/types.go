package data

import "github.com/google/uuid"

type Cohost struct {
	ID         uuid.UUID `json:"id"`
	HostId     uuid.UUID `json:"hostId"`
	PropertyId uuid.UUID `json:"propertyId"`
}

type GetPropertiesHostedByData struct {
	Cohosts        []Cohost  `json:"cohosts"`
	DuringYourStay string    `json:"duringYourStay"`
	HostId         uuid.UUID `json:"hostId"`
}

type GetHostResp struct {
	Host `json:"host"`
}

type Host struct {
	ID               uuid.UUID  `json:"id"`
	FirstName        string     `json:"firstName"`
	LastName         string     `json:"lastName"`
	Email            string     `json:"email"`
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

type GetHostedByDataResp struct {
	Cohosts        []Host `json:"cohosts"`
	Host           `json:"host"`
	DuringYourStay string `json:"duringYourStay"`
}
