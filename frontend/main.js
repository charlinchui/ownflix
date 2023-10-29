import './style.css';
import { navbar } from './src/navbar/navbar';
import { createSVGElement } from './src/svg/svghandler';

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
      fetch(`http://localhost:8080/shows/${show.pathName}/videos`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch series data');
        }
      }).then(data=>{
        let i = 1;
        data.forEach(ep=>{
          const epDiv = document.createElement('div');
          const epTitle = document.createElement('span');
          epDiv.className = 'episode';
          epTitle.className = 'episode-title';
          if(show.type === 'show'){
            epTitle.innerHTML = `${show.name} ${i}`;
            i++;
          }
          epDiv.append(epTitle);
          episodes.append(epDiv);
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
        });
        if(episodes){
          app.removeChild(shows);
          app.appendChild(episodes);
        }
      }
      )
    });
  });

});

episodes.id = 'episodes';
shows.id = 'shows';
app.appendChild(shows);
app.appendChild(navbar);

