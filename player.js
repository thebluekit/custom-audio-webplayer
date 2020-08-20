class AudioPlayer {
    playerUptime = 1000;
    constructor(player, audioInfo, timelineElement, buttonPlay) {
        this.player = player;
        this.audioInfo = audioInfo;
        this.timelineElement = timelineElement;
        this.buttonPlay = buttonPlay;

        this.getElements();
        this.setAudioInfo();
        this.setTimeline();
        this.play = false;
    }

    getElements() {
        this.buttonPlay.addEventListener("click", this.playAudio.bind(this));

        this.timelineElement.addEventListener("input", this.setNewTime.bind(this));
        this.timelineElement.addEventListener("change", this.setNewTime.bind(this));
    }

    getTotalTime() {
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function () {
                resolve(this.player.duration);
            }.bind(this), 100);
          }.bind(this)
        );
        
        return promise;
    }

    getCurrentTime() {
        return this.player.currentTime;
    }

    setAudioInfo() {
        this.getTotalTime().then(
            function (totalTime) {
                let currentTime = this.getCurrentTime();
                this.audioInfo.innerHTML = currentTime + " / " + totalTime;
            }.bind(this)
        );
    }

    setTimeline() {
        this.getTotalTime().then(
            function (totalTime) {
                let currentTime = this.getCurrentTime();
                this.timelineElement.value = currentTime * 100 / totalTime;
            }.bind(this)
        );
    }

    playAudio() {
        this.play = !this.play;
        if (this.play) {
            this.player.play();
            this.playing();
        }
        else {
            this.player.pause();
        }
    }

    setNewTime() {
        this.getTotalTime().then(
            function (totalTime) {
                this.player.currentTime = totalTime * this.timelineElement.value / 100;
                this.setAudioInfo();
            }.bind(this)
        );
    }

    async playing() {
        while (this.play) {
            await new Promise(resolve => setTimeout(resolve, this.playerUptime));
            this.setAudioInfo();
            this.setTimeline();
        }
    }
}

window.onload = function() {
    let player = document.getElementById("real-player");
    let audioInfo = document.getElementById("audio-info");
    let timelineElement = document.getElementById("timeline");
    let buttonPlay = document.getElementById("play-pause");


    customPlayer = new AudioPlayer(player, audioInfo, timelineElement, buttonPlay);
}