# A Simple Netflix Clone To Stream Videos Locally

### Just create a folder inside the backend called shows with the following structure:
```
/backend
└── /shows
    ├── /show-1
    │   ├── /episodes
    │   │    ├── episode-1.mp4
    ... │    ...
    │   │    └── episode-n.mp4
    │   ├── cover.jpg
    │   └── info.json
    │       ├── name
    │       ├── pathName
    │       ├── image
    │       └── type(movie/show)
    └── /show-n
        ├── /episodes
        │    ├── episode-1.mp4
        │    ...
        │    └── episode-n.mp4
        ├── cover.jpg
        └── info.json
            ├── name
            ├── pathName
            ├── image
            └── type(movie/show)
```
### Start the server by going into the backend folder and running ```go run .```
### Start the client by going into the frontend folder, installing all the dependencies (```npm install```) and running ```npm run dev```

(You need [go](https://go.dev/) installed to run the server and [node + npm](https://nodejs.org/en) to run the client)
