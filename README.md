# A Simple Netflix Clone To Stream Videos Locally

### Just create a folder inside the backend called shows with the following structure:
```
.
└── shows
    ├── show-1
    │   ├── episodes
    │   │    ├── episode-1
    ... │    ...
    │   │    └── episode-n
    │   ├── cover.jpg
    │   └── info.json
    │       ├── name
    │       ├── pathName
    │       ├── image
    │       └── type(movie/show)
    └── show-n
        ├── episodes
        │    ├── episode-1
        │    ...
        │    └── episode-n
        ├── cover.jpg
        └── info.json
            ├── name
            ├── pathName
            ├── image
            └── type(movie/show)
```
### Start the backend by going into the backend folder and running ```go run .```
### Start the frontend by going into the frontend folder and running ```npm run dev```
