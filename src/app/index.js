import 'normalize-stylus';
import './main.styl';

class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.inputSelectFiles = document.querySelector('.js-files');
        this.listSection = document.querySelector('.js-list');
        this.playButton = document.querySelector('.js-play');
        this.pauseButton = document.querySelector('.js-pause');
        this.nextButton = document.querySelector('.js-next');
        this.prevButton = document.querySelector('.js-prev');
        this.statusAudio = document.querySelector('.js-playing');;
    };

    addEventChange() {
        this.inputSelectFiles.addEventListener('change', (input) => {
            this.setActionPlayer(input.currentTarget.files);
        });
    }

    setActionPlayer(files) {
        this.renderListAudio(files);
        this.initPlayingItem();
    }

    renderListAudio(listFiles) {
        let listAudio = [];

        for (let file of listFiles) {
            let template = this.createTemplate(file);
            listAudio.push(template);
        }

        this.listSection.innerHTML = listAudio.join('');
      }

    initPlayingItem() {
      //console.log(this.listSection)
        this.setActiveItem(this.listSection.firstChild);
      //  this.listSection.firstChild
        // this.listSection.addEventListener('click', (event) => {
        //   this.setActiveItem(event.target);
        // });
    }

    setActiveItem(itemToPlay) {
        this.audio.src = itemToPlay.dataset.file;
        this.removeActiveClass();
        itemToPlay.classList.add('js-playing');
        this.audio.play();
    }

    removeActiveClass() {
        this.statusAudio && this.statusAudio.classList.remove('js-playing');
    }

    createTemplate(file) {
        return `<li data-file="${window.URL.createObjectURL(file)}">${file.name}</li>`;
    }

            // let audio = new Audio();
            //
            // this.listSection.addEventListener('click', function (event) {
            //     document.querySelector('.js-playing') !== null && document.querySelector('.js-playing').classList.remove('js-playing');
            //     audio.src = event.target.dataset.file;
            //     event.target.classList.add('js-playing');
            // });
            //
            // this.play.addEventListener('click', function (event) {
            //     audio.play();
            // });
            //
            // this.pause.addEventListener('click', function (event) {
            //     audio.pause();
            // });
            //
            // this.nextButton.addEventListener('click', function (event) {
            //     audio.src = document.querySelector('.js-playing').nextSibling.dataset.file;
            //     document.querySelector('.js-playing') !== null && document.querySelector('.js-playing').classList.remove('js-playing');
            //     audio.play();
            // });
            //
            // this.prevButton.addEventListener('click', function (event) {
            //     document.querySelector('.js-playing') !== null && document.querySelector('.js-playing').classList.remove('js-playing');
            //     audio.src = document.querySelector('.js-playing').prevSibling.dataset.file;
            //     audio.play();
            // });
    init() {
        this.addEventChange();
    }
}

const audioPlayer = new AudioPlayer();

audioPlayer.init();
