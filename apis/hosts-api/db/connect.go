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

	if *drop {
		db.Exec(`DROP TABLE IF EXISTS hosts.hosts`)
		db.Exec(`DROP TABLE IF EXISTS hosts.languages`)
		db.Exec(`DROP TABLE IF EXISTS hosts.host_language_relationships`)
	}

	db.AutoMigrate(&Host{}, &Language{}, &HostLanguageRelationship{})
	MySqlDb = db

}
