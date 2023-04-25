let mood, audio, playbtn, nextbtn, prevbtn, mutebtn, seekslider, volumeslider, seeking = false, seekto,
    curtimetext, durtimetext, current_song, dir, playlist, ext, agent, repeat, setvolume, angry_playlist, angry_title,
    angry_poster, happy_playlist, happy_title, happy_poster, calm_playlist, calm_title, calm_poster, sad_playlist,
    sad_title, sad_poster, playlist_index;

dir = "static/songs/"

angry_playlist = ["Dhan Te Nan","Khalibali","Kaam 25", "Jee Karda", "Get Ready To Fight"];
angry_title = ["Dhan Te Nan", "Khalibali","Kaam 25","Jee Karda", "Get Ready To Fight"];
angry_poster = ["static/song_imgs/Dhan te nan.jpg","static/song_imgs/khalibali.jpg","static/song_imgs/kaam-25.jpg", "static/song_imgs/Jee Karda.jpg", "static/song_imgs/get ready to fight.jpg"];

happy_playlist = ["Aal Izz Well","Slow_Motion_Angreza","Senorita", "Maston_Ka_Jhund", "Matargashti"];
happy_title = ["Aal Izz Well","Slow Motion Angreza","Senorita", "Maston Ka Jhund", "Matargashti"];
happy_poster = ["static/song_imgs/all_is_well.jpg","static/song_imgs/slow_motion_angreza.jpg","static/song_imgs/Senorita.jpg", "static/song_imgs/maston_ka_jhund.jpg", "static/song_imgs/Matargashti.jpg"];

calm_playlist = ["Pani-Da-Rang","Phir Se Ud Chala","Main Rang Sharbaton Ka","Qaafirana", "Chand Aasmano Se Laapata"];
calm_title = ["Pani Da Rang","Phir Se Ud Chala","Main Rang Sharbaton Ka","Qaafirana", "Chand Aasmano Se Laapata"];
calm_poster = ["static/song_imgs/Pani da rang.jpg","static/song_imgs/phir se ud chala.jpg","static/song_imgs/Main-Rang-Sharbaton-Ka.jpg","static/song_imgs/Qafirana.jpg", "static/song_imgs/chand_aasmano.jpg"];

sad_playlist = ["Aayat","Bhula Dena","Tune Jo Na Kaha","Agar Tu Hota",];
sad_title = ["Aayat","Bhula Dena","Tune Jo Na Kaha","Agar Tu Hota",];
sad_poster = ["static/song_imgs/aayat.jpg","static/song_imgs/Bhula-Dena.jpg","static/song_imgs/tune jo na kaha.jpg","static/song_imgs/agar tu hota.jpg"];

ext = ".mp3";
agent = navigator.userAgent.toLowerCase()

playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
current_song = document.getElementById("current_song");
repeat = document.getElementById("repeat");

audio = new Audio();
audio.loop = false;

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#imageCapture');

playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", () => { nextSong(mood) });
prevbtn.addEventListener("click", () => { prevSong(mood) });
mutebtn.addEventListener("click", mute);

volumeslider.addEventListener("mousemove", function(setVolume){
        audio.volume = setVolume.currentTarget.value / 100;});


seekslider.addEventListener("mousedown", function (event) {
    seeking = false;
    seek(event);
});
seekslider.addEventListener("mousemove", function (event) {
    seek(event);
});
seekslider.addEventListener("mouseup", function () {
    seeking = false;
});

audio.addEventListener("timeupdate", function () {
    seektimeupdate();
});
audio.addEventListener("ended", function () {
    switchTrack(mood);
});
repeat.addEventListener("click", loop);


function fetchMusicDetails(mood) {
    $("#playpausebtn img").attr("src", "static/imgs/pause.png");
    switch (mood) {
        case "Angry":
            $("#circle-image img").attr("src", angry_poster[playlist_index]);
            current_song.innerHTML = angry_title[playlist_index];
            audio.src = dir + angry_playlist[playlist_index] + ext;
            break;

        case "Happy":
            $("#circle-image img").attr("src", happy_poster[playlist_index]);
            current_song.innerHTML = happy_title[playlist_index];
            audio.src = dir + happy_playlist[playlist_index] + ext;
            break;

        case "Calm":
            $("#circle-image img").attr("src", calm_poster[playlist_index]);
            current_song.innerHTML = calm_title[playlist_index];
            audio.src = dir + calm_playlist[playlist_index] + ext;
            break;

        case "Sad":
            $("#circle-image img").attr("src", sad_poster[playlist_index]);
            current_song.innerHTML = sad_title[playlist_index];
            audio.src = dir + sad_playlist[playlist_index] + ext;
            break;
    }
    audio.play();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        $("#playpausebtn img").attr("src", "static/imgs/pause.png");
    } else {
        audio.pause();
        $("#playpausebtn img").attr("src", "static/imgs/play.png");
    }
}

function nextSong(mood) {
    playlist_index++;
    switch (mood) {
        case "Angry":
            if (playlist_index > angry_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Happy":
            if (playlist_index > happy_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Calm":
            if (playlist_index > calm_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
        case "Sad":
            if (playlist_index > sad_playlist.length - 1) {
                playlist_index = 0;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function prevSong(mood) {
    playlist_index--;
    switch (mood) {
        case "Angry":
            if (playlist_index < 0) {
                playlist_index = angry_playlist.length - 1;
            }
            break;
        case "Happy":
            if (playlist_index < 0) {
                playlist_index = happy_playlist.length - 1;
            }
            break;
        case "Calm":
            if (playlist_index < 0) {
                playlist_index = calm_playlist.length - 1;
            }
            break;
        case "Sad":
            if (playlist_index < 0) {
                playlist_index = sad_playlist.length - 1;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function mute() {
    if (audio.muted) {
        audio.muted = false;
        $("#mutebtn img").attr("src", "static/imgs/speaker.png");
    } else {
        audio.muted = true;
        $("#mutebtn img").attr("src", "static/imgs/mute.png");
    }
}

function seek(event) {
    if (audio.duration == 0) {
        null
    } else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}



function seektimeupdate() {
    if (audio.duration) {
        let temp = (audio.currentTime  / audio.duration)*100;
        seekslider.value = temp;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if (cursecs < 10) {
            cursecs = "0" + cursecs
        }
        if (curmins < 10) {
            curmins = "0" + curmins
        }
        if (dursecs < 10) {
            dursecs = "0" + dursecs
        }
        if (durmins < 10) {
            durmins = "0" + durmins
        }
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
    } else {
        curtimetext.innerHTML = "00:00";
        durtimetext.innerHTML = "00:00";
    }
}

function switchTrack(mood) {
    switch (mood) {
        case "Angry":
            if (playlist_index == angry_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Happy":
            if (playlist_index == happy_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Calm":
            if (playlist_index == calm_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
        case "Sad":
            if (playlist_index == sad_playlist.length - 1) {
                playlist_index = 0;
            } else {
                playlist_index++;
            }
            break;
    }
    fetchMusicDetails(mood);
}

function loop() {
    if (audio.loop) {
        audio.loop = false;
        $("#repeat img").attr("src", "static/imgs/loop.png");
    } else {
        audio.loop = true;
        $("#repeat img").attr("src", "static/imgs/loop1.png");
    }
}

document.querySelector('#test').addEventListener('click', function () {
    getExpression();
});

const getExpression = () => {
    Webcam.snap(image_uri => {
        console.log(image_uri)
        fetch('/expression', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_uri: image_uri })
        }).then(response => {
            return response.json();
        }).then(res => {
            mood = res.mood;
            mood = mood.charAt(0).toUpperCase() + mood.slice(1);
            document.querySelector('#status').innerHTML = `Current Mood : ${mood}`;
            switch (mood) {
                case "Angry":
                    playlist_index = 0;
                    audio.src = dir + angry_playlist[0] + ext;
                    current_song.innerHTML = angry_title[playlist_index];
                    $("#circle-image img").attr("src", angry_poster[playlist_index]);
                    $("body").css("background-image", url("Musical-Purple.jpg"));
                    break;
                case "Happy":
                    playlist_index = 0;
                    audio.src = dir + happy_playlist[0] + ext;
                    current_song.innerHTML = happy_title[playlist_index];
                    $("#circle-image img").attr("src", happy_poster[playlist_index]);
                    $("body").css("background-image", url("Musical-Purple.jpg"));
                    break;
                case "Calm":
                    playlist_index = 0;
                    audio.src = dir + calm_playlist[0] + ext;
                    current_song.innerHTML = calm_title[playlist_index];
                    $("#circle-image img").attr("src", calm_poster[playlist_index]);
                    $("body").css("background-image", url("Musical-Purple.jpg"));
                    break;
                case "Sad":
                    playlist_index = 0;
                    audio.src = dir + sad_playlist[0] + ext;
                    current_song.innerHTML = sad_title[playlist_index];
                    $("#circle-image img").attr("src", sad_poster[playlist_index]);
                    $("body").css("background-image", url("Musical-Purple.jpg"));
                    break;
            }
        });
    });
}

setTimeout(() => { getExpression() }, 2000);
