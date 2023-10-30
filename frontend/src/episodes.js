import "../style.css";
import { navbar } from './navbar/navbar';

const app = document.getElementById('app');
const episodes = document.createElement('div');
episodes.id = 'episodes';

const show = JSON.parse(localStorage.getItem("show"));

fetch(`http://localhost:8080/shows/${show.pathName}/videos`)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch series data');
        }
    }).then(data => {
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
            epDiv.append(epTitle);
            episodes.append(epDiv);
            epDiv.addEventListener('click',(e)=>{
                localStorage.setItem('episode', JSON.stringify(ep));
                window.location.href = 'video-player.html';
            });
        });
    });

app.append(episodes);
app.append(navbar);