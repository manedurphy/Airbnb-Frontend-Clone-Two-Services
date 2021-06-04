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

	// db.Exec(`DROP TABLE IF EXISTS properties.properties;`)
	// db.Exec(`DROP TABLE IF EXISTS properties.cohosts;`)
	// db.Exec(`DROP TABLE IF EXISTS properties.photos;`)
	db.AutoMigrate(&Property{}, &Cohost{}, &Photo{})
	MySqlDb = db
}
