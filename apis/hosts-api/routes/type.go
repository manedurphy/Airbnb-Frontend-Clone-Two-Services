package host

import "hosts-api/db"

type CreateHostRequest struct {
	db.Host
	Languages []string `json:"languages"`
}
