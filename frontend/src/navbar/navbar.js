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
        if(window.location.href.includes(".html")){
            window.location.href = '/';
        }
        const shows = document.getElementById('shows') || document.createElement('div');
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

                    showDiv.addEventListener('click', ()=>{
                        localStorage.setItem('show', JSON.stringify(show));
                        window.location.href = 'episode-list.html';
                    });
                });
            })
    });
};

navbar.append(leftPack);
navbar.append(rightPack);

searchButton.addEventListener('click', () => {
    searchBar.style.width = '200px';
    searchBar.style.visibility = 'visible';
    setTimeout(() => { searchBar.focus() }, 50);
});

searchBar.addEventListener('focusout', () => {
    searchBar.style.width = '0px';
    searchBar.style.visibility = 'hidden';
    searchBar.value = '';
});

searchBar.addEventListener('input', ()=>{
    const searchTerm = searchBar.value.toLowerCase();
    const shows = document.getElementById('shows');
    const showElements = shows.getElementsByClassName('show');
    for (const show of showElements) {
        const showText = show.textContent.toLowerCase();
        if (showText.includes(searchTerm)) {
            show.style.display = "block";
        } else {
            show.style.display = "none";
        }
    }
});