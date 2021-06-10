package data

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"sync"

	cache "get-data-api/cache"

	"github.com/gin-gonic/gin"
)

var (
	ctx = context.Background()
)

func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "healthy!",
	})
}

func GetHostedByData(c *gin.Context) {
	roomNumber := c.Param("roomNumber")

	data := cache.GetHostedByData(ctx, roomNumber)

	if data != "" {
		fmt.Println("Retrieved data from Redis store!")
		var hostedByData HostedByData
		err := json.Unmarshal([]byte(data), &hostedByData)

		if err == nil {
			response := gin.H{
				"cohosts":        hostedByData.Cohosts,
				"duringYourStay": hostedByData.DuringYourStay,
				"host":           hostedByData.Host,
			}

			sendResponse(c, response, http.StatusOK)
			return
		}
	}

	propertiesHostedByResp, err := http.Get(os.Getenv("PROPERTIES_API") + "/properties/hosted-by/" + roomNumber)

	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	if propertiesHostedByResp.StatusCode == http.StatusNotFound {
		msg := "could not find data on the proprety for this room"
		sendResponse(c, msg, http.StatusNotFound)
		return
	}
	defer propertiesHostedByResp.Body.Close()

	var propertiesHostedByData PropertiesHostedByData
	propertiesHostedByBody, err := io.ReadAll(propertiesHostedByResp.Body)

	if err != nil {
		msg := "internal server error"
		sendResponse(c, msg, http.StatusInternalServerError)
		return
	}

	err = json.Unmarshal(propertiesHostedByBody, &propertiesHostedByData)
	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, os.Getenv("HOSTS_API")+"/hosts/host", nil)
	req.Header.Set("host_id", propertiesHostedByData.HostId.String())

	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	getHostResp, err := client.Do(req)

	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}
	defer getHostResp.Body.Close()

	if getHostResp.StatusCode == http.StatusNotFound {
		msg := "could not find data on the host for this room"
		sendResponse(c, msg, http.StatusNotFound)
		return
	}

	hostBody, err := io.ReadAll(getHostResp.Body)

	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	var host GetHostResp
	err = json.Unmarshal(hostBody, &host)

	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	var cohosts []Host
	var wg sync.WaitGroup
	cohostChannel := make(chan Host)

	go func() {
		wg.Wait()
		close(cohostChannel)
	}()

	for _, cohost := range propertiesHostedByData.Cohosts {
		wg.Add(1)
		go getCohost(cohost.HostId.String(), &wg, cohostChannel, client)
	}

	for cohost := range cohostChannel {
		cohosts = append(cohosts, cohost)
	}

	response := gin.H{
		"cohosts":        cohosts,
		"duringYourStay": propertiesHostedByData.DuringYourStay,
		"host":           host.Host,
	}

	body, err := json.Marshal(response)

	if err == nil {
		cache.WriteHostedByData(ctx, body, roomNumber)
	}

	sendResponse(c, response, http.StatusOK)
}

func GetPhotoHeaderData(c *gin.Context) {
	roomNumber := c.Param("roomNumber")

	data := cache.GetPhotoHeaderData(ctx, roomNumber)

	if data != "" {
		fmt.Println("Retrieved data from Redis store!")
		var photoHeaderData PhotoHeaderData
		err := json.Unmarshal([]byte(data), &photoHeaderData)

		if err == nil {
			response := gin.H{
				"location":    photoHeaderData.Location,
				"reviews":     photoHeaderData.Reviews,
				"photos":      photoHeaderData.Photos,
				"title":       photoHeaderData.Title,
				"isSuperhost": photoHeaderData.IsSuperhost,
			}

			sendResponse(c, response, http.StatusOK)
			return
		}

	}

	propertiesPhotoHeaderResp, err := http.Get(os.Getenv("PROPERTIES_API") + "/properties/" + roomNumber)
	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	propertiesPhotoHeaderBody, err := io.ReadAll(propertiesPhotoHeaderResp.Body)
	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	defer propertiesPhotoHeaderResp.Body.Close()

	var propertiesPhotoHeader GetPropertiesPhotoHeaderDataResp
	err = json.Unmarshal(propertiesPhotoHeaderBody, &propertiesPhotoHeader)
	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, os.Getenv("HOSTS_API")+"/hosts/host", nil)
	req.Header.Set("host_id", propertiesPhotoHeader.HostId.String())

	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	getHostResp, err := client.Do(req)

	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	defer getHostResp.Body.Close()

	if getHostResp.StatusCode == http.StatusNotFound {
		msg := "could not find data on the host for this room"
		sendResponse(c, msg, http.StatusNotFound)
		return
	}

	hostBody, err := io.ReadAll(getHostResp.Body)
	if err != nil {
		sendResponse(c, "internal server error", http.StatusInternalServerError)
		return
	}

	var host GetHostResp
	json.Unmarshal(hostBody, &host)

	response := gin.H{
		"location": Location{
			City:    propertiesPhotoHeader.City,
			State:   propertiesPhotoHeader.State,
			Country: propertiesPhotoHeader.Country,
		},
		"reviews": Reviews{
			NumberOfReviews: propertiesPhotoHeader.NumberOfReviews,
			Rating:          propertiesPhotoHeader.Rating,
		},
		"photos":      propertiesPhotoHeader.Photos,
		"title":       propertiesPhotoHeader.Title,
		"isSuperhost": host.IsSuperhost,
	}

	body, _ := json.Marshal(response)
	cache.WritePhotoHeaderData(ctx, body, roomNumber)

	sendResponse(c, response, http.StatusOK)
}

func sendResponse(c *gin.Context, response interface{}, statusCode int) {
	c.JSON(statusCode, response)
}

func getCohost(id string, wg *sync.WaitGroup, cohostChannel chan Host, client *http.Client) {
	defer wg.Done()

	req, _ := http.NewRequest(http.MethodGet, os.Getenv("HOSTS_API")+"/hosts/host", nil)
	req.Header.Set("host_id", id)
	resp, err := client.Do(req)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	var getHostResp GetHostResp
	body, _ := io.ReadAll(resp.Body)
	json.Unmarshal(body, &getHostResp)

	cohostChannel <- getHostResp.Host
}
