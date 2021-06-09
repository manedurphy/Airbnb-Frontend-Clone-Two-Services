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
		var hostedByData GetHostedByDataResp
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

	propertiesHostedByResp, _ := http.Get(os.Getenv("PROPERTIES_API") + "/properties/hosted-by/" + roomNumber)

	if propertiesHostedByResp.StatusCode == http.StatusNotFound {
		msg := "could not find data on the proprety for this room"
		sendResponse(c, msg, http.StatusNotFound)
		return
	}
	defer propertiesHostedByResp.Body.Close()

	var propertiesHostedByData GetPropertiesHostedByData
	propertiesHostedByBody, err := io.ReadAll(propertiesHostedByResp.Body)

	if err != nil {
		msg := "internal server error"
		sendResponse(c, msg, http.StatusInternalServerError)
		return
	}

	json.Unmarshal(propertiesHostedByBody, &propertiesHostedByData)

	client := &http.Client{}
	req, _ := http.NewRequest(http.MethodGet, os.Getenv("HOSTS_API")+"/hosts/host", nil)
	req.Header.Set("host_id", propertiesHostedByData.HostId.String())

	hostsHostedByResp, _ := client.Do(req)

	if hostsHostedByResp.StatusCode == http.StatusNotFound {
		msg := "could not find data on the host for this room"
		sendResponse(c, msg, http.StatusNotFound)
		return
	}
	defer hostsHostedByResp.Body.Close()

	hostsHostedByBody, err := io.ReadAll(hostsHostedByResp.Body)

	if err != nil {
		msg := "internal server error"
		sendResponse(c, msg, http.StatusInternalServerError)
		return
	}

	var host GetHostResp
	json.Unmarshal(hostsHostedByBody, &host)

	var cohosts []Host
	var wg sync.WaitGroup

	for _, cohost := range propertiesHostedByData.Cohosts {
		wg.Add(1)
		go func(cohost *Cohost, wg *sync.WaitGroup) {
			defer wg.Done()
			req, _ := http.NewRequest(http.MethodGet, os.Getenv("HOSTS_API")+"/hosts/host", nil)
			req.Header.Set("host_id", cohost.HostId.String())
			resp, err := client.Do(req)

			if err != nil {
				panic(err)
			}

			defer resp.Body.Close()

			var getHostResp GetHostResp
			body, _ := io.ReadAll(resp.Body)
			json.Unmarshal(body, &getHostResp)

			// cohosts = append(cohosts, getHostResp.Host)
		}(&cohost, &wg)
	}

	wg.Wait()

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

	data, _ := cache.GetPhotoHeaderData(ctx, roomNumber)

	if data != "" {
		fmt.Println("Retrieved data from Redis store!")
		c.JSON(http.StatusOK, gin.H{
			"photoheader": data,
		})
		return
	}

	resp, _ := http.Get(os.Getenv("PROPERTIES_API") + "/properties/" + roomNumber)

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	cache.WritePhotoHeaderData(ctx, body, roomNumber)
	c.JSON(http.StatusOK, gin.H{
		"photoheader": string(body),
	})
}

func sendResponse(c *gin.Context, response interface{}, statusCode int) {
	c.JSON(statusCode, response)
}
