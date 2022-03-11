

var wavesurfer = WaveSurfer.create({
    container: '#waveform'
});

wavesurfer.on('ready', function () {
    wavesurfer.play();
});


duration = document.querySelector("#duration");
current = document.querySelector("#current");
playPause = document.getElementById("playPause");

var timeCalculator = function (value) {
    second = Math.floor(value % 60);
    minute = Math.floor((value / 60) % 60);

    if (second < 10) {
        second = "0" + second;
    }

    return minute + ":" + second;
};

//start wavesurfer object 
wavesurfer = WaveSurfer.create({
    container: "#wave",
    waveColor: "#cdedff",
    progressColor: "#1AAFFF",
    height: 148,
    scrollParent: false
});

//load audio file
wavesurfer.load(songlinkupdate);

//play and pause a player
playPause.addEventListener("click", function (e) {
    wavesurfer.playPause();
});

//load audio duration on load
wavesurfer.on("ready", function (e) {
    duration.textContent = timeCalculator(wavesurfer.getDuration());
});

//get updated current time on play
wavesurfer.on("audioprocess", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});

//change play button to pause on plying
wavesurfer.on("play", function (e) {
    playPause.src = 'http://localhost:3000/img/pause.png'
});

//change pause button to play on pause
wavesurfer.on("pause", function (e) {
    playPause.src = 'http://localhost:3000/img/play.png'
});

//update current time on seek
wavesurfer.on("seek", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});