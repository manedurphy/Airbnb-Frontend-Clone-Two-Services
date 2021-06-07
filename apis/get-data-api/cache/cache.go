package cache

import (
	"context"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
)

var (
	rdbWrite *redis.Client = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_WRITE_URL"),
		Password: "",
		DB:       0,
	})
	rdbRead *redis.Client = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_READ_URL"),
		Password: "",
		DB:       0,
	})
)

func WriteHostedByData(ctx context.Context, data []byte, roomNumber string) error {
	err := rdbWrite.Set(ctx, "hostedby"+roomNumber, data, 5*time.Minute).Err()

	if err != nil {
		return err
	}

	return nil
}

func GetHostedByData(ctx context.Context, roomNumber string) (string, error) {
	data, err := rdbRead.Get(ctx, "hostedby"+roomNumber).Result()

	if err != redis.Nil {
		return data, nil
	}

	return "", err
}

func WritePhotoHeaderData(ctx context.Context, data []byte, roomNumber string) error {
	err := rdbWrite.Set(ctx, "photoheader"+roomNumber, data, 5*time.Minute).Err()

	if err != nil {
		return err
	}

	return nil
}

func GetPhotoHeaderData(ctx context.Context, roomNumber string) (string, error) {
	data, err := rdbRead.Get(ctx, "photoheader"+roomNumber).Result()

	if err != redis.Nil {
		return data, nil
	}

	return "", err
}
