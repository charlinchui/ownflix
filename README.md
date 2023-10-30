# A Simple Netflix Clone To Stream Videos Locally

## Just create a folder inside the backend called shows with the following structure:
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