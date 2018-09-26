import 'normalize-stylus';
import './main.styl';

class AudioPlayer {
    constructor() {
        this.player = document.querySelector('.js-player');
        this.inputSelectFiles = document.querySelector('.js-files');
        this.listSection = document.querySelector('.js-list');
    };

    addEventChange() {
        const self = this;

        this.inputSelectFiles.addEventListener('change', function(input) {
            self.renderListAudio(input.currentTarget.files);
        });
    }

    renderListAudio(listFiles) {
        console.log(listFiles.name);
        console.log(listFiles);
        const self = this;
        let arr = [];

        for (let file of listFiles) {
            let template = `<li data-file="${window.URL.createObjectURL(file)}">${file.name}</li>`;
            arr.push(template);
        }

        this.listSection.innerHTML = arr.join('');

        this.listSection.addEventListener('click', function (event) {
            self.player.src = event.target.dataset.file;
            self.player.play();
        });
    }

    init() {
        this.addEventChange();
    }
}

const audioPlayer = new AudioPlayer();

audioPlayer.init();