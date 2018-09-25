import 'normalize-stylus';
import './main.styl';

class AudioPlayer {
    constructor() {
        this.listFiles = [];
        this.player = document.querySelector('.js-player');
        this.inputSelectFiles = document.querySelector('.js-files');
    };

    addEventChange() {
        const self = this;

        this.inputSelectFiles.addEventListener('change', function(input) {
            self.renderListAudio(input.currentTarget.files);
        });
    }

    renderListAudio(listFiles) {
        this.player.src = window.URL.createObjectURL(listFiles[0]);
        this.player.play();
    }

    init() {
        this.addEventChange();
    }
};

const audioPlayer = new AudioPlayer();

audioPlayer.init();