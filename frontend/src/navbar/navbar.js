import { createSVGElement } from "../svg/svghandler";

const elements = { 'Home': 'shows', 'TV Shows': 'tv', 'Movies': 'movies' };

//Actual navbar
export const navbar = document.createElement('div');
navbar.id = "navbar";

//search thingy
const rightPack = document.createElement('div');
rightPack.id = 'navbar-right';
const searchButton = document.createElement('button');
const searchBar = document.createElement('input');
searchBar.placeholder = 'Search for title';
searchBar.type = 'text';
searchButton.id = 'search';
searchBar.id = 'searchbar';
rightPack.append(searchButton);
rightPack.append(searchBar);
createSVGElement('../src/navbar/search.svg', searchButton, 'search-icon');

const leftPack = document.createElement('div');
leftPack.id = "navbar-left";
const logo = document.createElement('span');
logo.textContent = "</ownflix?>"
logo.id = "logo";
leftPack.append(logo);
for (const [key, value] of Object.entries(elements)) {
    const navItem = document.createElement('span');
    navItem.className = "nav-item";
    navItem.textContent = key;
    leftPack.append(navItem);
    navItem.addEventListener('click', (e) => {
        const app = document.getElementById('app');
        const shows = document.getElementById('shows') || document.createElement('div');
        const episodes = document.getElementById('episodes') || document.createElement('div');
        episodes.id = 'episodes';
        while (shows.firstChild) {
            shows.removeChild(shows.firstChild);
        }
        fetch(`http://localhost:8080/${value}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch category data');
                }
            })
            .then(data => {
                data.forEach(show => {
                    const showDiv = document.createElement("show");
                    const showImage = document.createElement("img");
                    const titleDiv = document.createElement("div");
                    const title = document.createElement("span");

                    showImage.src = `http://localhost:8080/covers/${show.pathName}/${show.image}`;
                    showImage.alt = show.name;
                    title.textContent = show.name;
                    title.className = "title-text";
                    showImage.className = "cover";
                    titleDiv.className = "show-title"
                    showDiv.className = 'show';
                    titleDiv.append(title);
                    showDiv.append(showImage);
                    showDiv.append(titleDiv);
                    shows.append(showDiv);

                    showDiv.addEventListener('click', (e) => {
                        fetch(`http://localhost:8080/shows/${show.pathName}/videos`)
                            .then(res => {
                                if (res.ok) {
                                    return res.json();
                                } else {
                                    throw new Error('Failed to fetch series data');
                                }
                            }).then(data => {
                                while (episodes.firstChild) {
                                    episodes.removeChild(episodes.firstChild);
                                }
                                let i = 1;
                                data.forEach(ep => {
                                    const epDiv = document.createElement('div');
                                    const epTitle = document.createElement('span');
                                    epDiv.className = 'episode';
                                    epTitle.className = 'episode-title';
                                    if (show.type === 'show') {
                                        epTitle.innerHTML = `${show.name} ${i}`;
                                        i++;
                                    }
                                    epDiv.addEventListener('click', (e) =>{
                                        fetch(`http://localhost:8080/videos/${show.pathName}/${ep.name}`)
                                        .then(res => {
                                          if (res.ok) {
                                            return res.url;
                                          } else {
                                            throw new Error('Failed to fetch video data');
                                          }
                                        }).then(videoURL => {
                                            const backArrow = document.createElement('button');
                                            createSVGElement('../src/navbar/arrow-left.svg', backArrow, 'search-icon');
                                            backArrow.id = 'back';
                                            app.innerHTML = '';
                                            const video = document.createElement('video');
                                            video.controls = true;
                                            video.id = 'video-player';
                                            video.src = videoURL;
                                            video.autoplay = true;
                                            app.appendChild(video);
                                            app.append(backArrow);
                                            backArrow.addEventListener(e =>{
                                              console.log("Clicked")
                                            });
                                          }).catch(error => {
                                          console.error("error fetching episode ->", error);
                                        });
                                    });
                                    epDiv.append(epTitle);
                                    episodes.append(epDiv);
                                    if(episodes){
                                        app.removeChild(shows);
                                        app.appendChild(episodes);
                                      }
                                });
                            }
                            )
                    });
                });
                if(episodes.firstChild) {
                    shows.id = 'shows';
                    app.removeChild(episodes);
                    app.appendChild(shows);
                }
            })
    });
};

navbar.append(leftPack);
navbar.append(rightPack);

searchButton.addEventListener('click', (e) => {
    searchBar.style.width = '200px';
    searchBar.style.visibility = 'visible';
    setTimeout(() => { searchBar.focus() }, 50);
});

searchBar.addEventListener('focusout', (e) => {
    searchBar.style.width = '0px';
    searchBar.style.visibility = 'hidden';
    searchBar.value = '';
});
