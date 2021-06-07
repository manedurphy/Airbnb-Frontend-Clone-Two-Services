package db

import (
	"flag"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	MySqlDb *gorm.DB
	drop    = flag.Bool("drop", false, "Drops the tables on server start if true")
)

func Connect() {
	flag.Parse()
	dsn := os.Getenv("MYSQL_USER") + ":" + os.Getenv("MYSQL_PASSWORD") + "@tcp(" + os.Getenv("HOST") + ")/" + os.Getenv("MYSQL_DB")

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	// if os.Getenv("DROP_TABLES") == "true" {
	if *drop {
		db.Exec(`DROP TABLE IF EXISTS properties.properties;`)
		db.Exec(`DROP TABLE IF EXISTS properties.cohosts;`)
		db.Exec(`DROP TABLE IF EXISTS properties.photos;`)
	}

	db.AutoMigrate(&Property{}, &Cohost{}, &Photo{})
	MySqlDb = db
}
