console.log("Welcome to Rhythm");
let songIndex = 0;
let audioElement = new Audio('./music/Tum Hi Ho Song.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));
// let volumeBar = document.getElementById("volumeBar");

let songs = [
    { songName: "Tum Hi Ho", filePath: "./music/Tum Hi Ho Song.mp3", coverPath: "./images/tum hi ho cover.jpg" },
    { songName: "Waka Waka", filePath: "./music/Waka Waka.mp3", coverPath: "./images/Tera Pyar Cover.jpg" },
    { songName: "Tera Pyar", filePath: "./music/terapyar.mp3", coverPath: "./images/wakka wakka cover.jpg" },
    { songName: "New Frontier", filePath: "./music/newfrontier.mp3", coverPath: "./images/New Frontier Cover.jpg" },
    { songName: "Floating Garden", filePath: "./music/floatinggarden.mp3", coverPath: "./images/floating garden cover.jpg" },
    { songName: "Original Song", filePath: "./music/original-song.mp3", coverPath: "./images/original-song cover.jpg" },
    { songName: "SandBreaker", filePath: "./music/sandbreaker.mp3", coverPath: "./images/sandbreaker cover.jpg" },
    { songName: "Chori kiya Re Jiya", filePath: "./music/Chori Kiya Re Jiya.mp3", coverPath: "./images/chori kiya re jiya cover.jpg" },
    { songName: "Tum Se Hi", filePath: "./music/Tum Se Hi.mp3", coverPath: "./images/tum se hi cover.jpg" },
];

songItems.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

// audioElement.play();

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
});

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Update Seekbar 
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 8) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})

// volumeBar.addEventListener("input", () => {
//     audioElement.volume = volumeBar.value;
// });
