
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-btn');
const pauseButton = document.getElementById('pause-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume-control');
const songTitle = document.getElementById('song-title');
const playlist = document.getElementById('playlist');
const searchBox = document.getElementById('search-box');

const songs = [
    { title: 'song 1', src: 'song1.mp3'},
  {  title: 'song 2', src: 'song2.mp3'},
    { title: 'Song 3', src: 'song3.mp3' },
    // Add more songs as needed
];

let currentIndex = 0;

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
}

function playSong() {
    audioPlayer.play();
}

function pauseSong() {
    audioPlayer.pause();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function updateVolume() {
    audioPlayer.volume = volumeControl.value;
}

function searchSongs() {
    const query = searchBox.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));
    displayPlaylist(filteredSongs);
}

function displayPlaylist(songList) {
    playlist.innerHTML = '';
    songList.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.onclick = () => {
            currentIndex = songs.indexOf(song);
            loadSong(currentIndex);
            playSong();
        };
        playlist.appendChild(li);
    });
}

playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
volumeControl.addEventListener('input', updateVolume);
searchBox.addEventListener('input', searchSongs);


displayPlaylist(songs);
loadSong(currentIndex);
