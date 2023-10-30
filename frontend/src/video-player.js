import "../style.css";
import { navbar } from './navbar/navbar';
import { createSVGElement } from "./svg/svghandler";

const app = document.getElementById('app');
const episodeInfo = JSON.parse(localStorage.getItem("episode"));
const show = JSON.parse(localStorage.getItem('show'));

const videoDiv = document.createElement('div');
videoDiv.id = "video";

console.log(episodeInfo);
fetch(`http://localhost:8080/videos/${show.pathName}/${episodeInfo.name}`)
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
        video.autoplay = "true";
        videoDiv.appendChild(video);
        app.append(videoDiv);
        app.append(backArrow);
        backArrow.addEventListener('click', (e) => {
            localStorage.clear();
            localStorage.setItem('show', JSON.stringify(show));
            window.location.href = 'episode-list.html';
        });
    }).catch(error => {
        console.error("error fetching episode ->", error);
    });


app.append(navbar);