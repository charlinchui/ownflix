package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Show struct {
	Name  string `json:"name"`
	Image string `json:"image"`
	Path  string `json:"pathName"`
	Type  string `json:"type"`
}

type Video struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

var baseDirectory string = "./shows"

func main() {
	r := gin.Default()

	r.ForwardedByClientIP = true
	r.SetTrustedProxies([]string{"127.0.0.1", "192.168.1.2", "10.0.0.0/8"})

	//CORS Handler :
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET"},
		AllowHeaders: []string{"Origin"},
	}))

	r.OPTIONS("/", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	r.GET("/shows", func(c *gin.Context) {
		getShows(c, "")
	})

	r.GET("/movies", func(c *gin.Context) {
		getShows(c, "movie")
	})

	r.GET("/tv", func(c *gin.Context) {
		getShows(c, "show")
	})

	r.GET("/shows/:showName/videos", func(c *gin.Context) {
		getShowVideos(c)
	})

	r.GET("/videos/:showName/:videoName", func(c *gin.Context) {
		serveVideo(c)
	})

	r.StaticFS("/covers", http.Dir(path.Join(baseDirectory)))
	r.Run(":8080")
}

func getShows(c *gin.Context, showType string) {

	shows, err := os.ReadDir(baseDirectory)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var showList []Show

	for _, show := range shows {
		if show.IsDir() {
			showPath := path.Join(baseDirectory, show.Name())
			showJSONPath := path.Join(showPath, "info.json")

			_, err := os.ReadFile(showJSONPath)
			if err == nil {
				showData, err := os.ReadFile(showJSONPath)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}

				var show Show
				if err := json.Unmarshal(showData, &show); err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}

				if showType == "" || show.Type == showType {
					showList = append(showList, show)
				}
			}
		}
	}

	c.JSON(http.StatusOK, showList)
}

func getShowVideos(c *gin.Context) {
	showName := c.Param("showName")

	showPath := path.Join(baseDirectory, showName)
	episodesPath := path.Join(showPath, "episodes")

	videos, err := os.ReadDir(episodesPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var videoList []Video

	for _, video := range videos {
		if !video.IsDir() {
			videoPath := path.Join(episodesPath, video.Name())
			videoList = append(videoList, Video{Name: video.Name(), Path: videoPath})
		}
	}

	c.JSON(http.StatusOK, videoList)
}

func serveVideo(c *gin.Context) {
	showName := c.Param("showName")
	videoName := c.Param("videoName")

	videoPath := path.Join(baseDirectory, showName, "episodes", videoName)

	c.File(videoPath)
}
