package db

import (
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var MySqlDb *gorm.DB

func Connect() {
	dsn := os.Getenv("MYSQL_USER") + ":" + os.Getenv("MYSQL_PASSWORD") + "@/" + os.Getenv("MYSQL_DB")

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	db.Exec(`DROP TABLE IF EXISTS hosts.hosts`)
	db.Exec(`DROP TABLE IF EXISTS hosts.languages`)
	db.Exec(`DROP TABLE IF EXISTS hosts.host_language_relationships`)
	db.AutoMigrate(&Host{}, &Language{}, &HostLanguageRelationship{})

	MySqlDb = db

}