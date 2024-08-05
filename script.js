document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekBar = document.getElementById('seekBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playlist = document.getElementById('playlist');
    const tracks = playlist.getElementsByTagName('li');

    let currentTrackIndex = 0;

    function loadTrack(index) {
        const track = tracks[index];
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].classList.remove('active');
        }
        track.classList.add('active');
        audio.src = track.getAttribute('data-src');
        audio.load();
        playPauseBtn.textContent = 'Play';
    }

    function playPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    }

    playPauseBtn.addEventListener('click', playPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        seekBar.value = (currentTime / duration) * 100;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);

        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
        durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    });

    seekBar.addEventListener('input', () => {
        const seekTo = (seekBar.value / 100) * audio.duration;
        audio.currentTime = seekTo;
    });

    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    });

    playlist.addEventListener('click', (e) => {
        if (e.target && e.target.nodeName === "LI") {
            currentTrackIndex = Array.prototype.indexOf.call(tracks, e.target);
            loadTrack(currentTrackIndex);
            playPause();
        }
    });

    audio.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playPause();
    });

    // Load the first track by default
    loadTrack(currentTrackIndex);
});