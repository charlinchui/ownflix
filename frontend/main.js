import './style.css';
import { navbar } from './src/navbar/navbar';

const app = document.getElementById('app');
const shows = document.createElement('div');
const episodes = document.createElement('div');

document.addEventListener('scroll', () => {
  document.documentElement.dataset.scroll = window.scrollY;
});

fetch('http://localhost:8080/shows')
.then(res => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Failed to fetch category data');
  }
})
.then(data => {
  data.forEach(show => {
    const showDiv = document.createElement("div");
    const showImage = document.createElement("img");
    const titleDiv = document.createElement("div");
    const title = document.createElement("span");

    showImage.src = `http://localhost:8080/covers/${show.pathName}/${show.image}`;
    showImage.alt = show.name;
    title.textContent = show.name;
    title.className = "title-text";
    showImage.className="cover";
    titleDiv.className="show-title"
    showDiv.className = 'show';
    titleDiv.append(title);
    showDiv.append(showImage);
    showDiv.append(titleDiv);
    shows.append(showDiv);

    showDiv.addEventListener('click', (e)=>{
        localStorage.setItem('show', JSON.stringify(show));
        window.location.href = "episode-list.html";
    });
  });

});

episodes.id = 'episodes';
shows.id = 'shows';
app.appendChild(shows);
app.appendChild(navbar);

