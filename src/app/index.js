import 'normalize-stylus';
import './main.styl';

class AudioPlayer {
    constructor() {
        this.audio = new Audio();

        this.listSection = document.querySelector('.js-list');
        this.pauseButton = document.querySelector('.js-pause');
        this.rangeInput = document.querySelector('.js-range');
        this.statusAudio = null;
    };

    addEventChange() {
        const $inputSelectFiles = document.querySelector('.js-files');

        $inputSelectFiles.addEventListener('change', (input) => {
            this.setActionPlayer(input.currentTarget.files);
        });
    }

    setActionPlayer(files) {
        this.renderListAudio(files);
        this.setPlayingAudio(this.listSection.firstChild);
        this.setClickAudio();
        this.setTimeAudio();
    }

    renderListAudio(listFiles) {
        let listAudio = [];

        for (let file of listFiles) {
            let template = this.createTemplate(file);
            listAudio.push(template);
        }

        this.listSection.innerHTML = listAudio.join('');
    }

    setClickAudio() {
        this.listSection.addEventListener('click', (event) => {
            this.setPlayingAudio(event.target);
        });
    }

    setPlayingAudio(itemToPlay) {
        this.actionAudioButton();
        this.audioCanPlay(itemToPlay);
        this.setRangeValue();
    }

    setTimeAudio() {
        const self = this;

        this.rangeInput.addEventListener('click', function(event) {
            self.audio.currentTime = parseInt(event.target.value);
        });
    }

    setNextAudioWhenEnd() {
        this.audio.addEventListener('ended', () => {
            this.setNextAudio();
        });
    }

    audioCanPlay(itemToPlay) {
        const src = itemToPlay.dataset.file;

        this.initPrevNextAction(itemToPlay, src);

        this.audio.addEventListener('canplay', () => {
            this.setRangeAudio();
        });
    }

    setRangeValue() {
        const self = this;

        setInterval(function () {
            self.rangeInput.value = self.audio.currentTime;
        }, 3000);
    }

    setRangeAudio() {
        this.rangeInput.max = this.audio.duration;
    }

    actionAudioButton() {
        this.pauseButton.classList.contains('hidden') && this.toggleClassHidden();
    }

    setAudioSrc(src) {
        this.audio.src = src;
    }

    addActiveClass(itemToPlay) {
        this.statusAudio && this.statusAudio.classList.remove('js-playing');
        this.statusAudio = itemToPlay;

        itemToPlay.classList.add('js-playing');
    }

    createTemplate(file) {
        return `<li data-file="${window.URL.createObjectURL(file)}">${file.name}</li>`;
    }

    toggleClassHidden() {
        const buttons = document.querySelectorAll('.js-toggle-hidden');

        buttons.forEach(button => {
            button.classList.toggle('hidden');
        });
    }

    setNextAudio() {
        const nextAudio = this.statusAudio.nextSibling;

        if (nextAudio) {
            const nextAudioSrc = nextAudio.dataset.file;

            this.initPrevNextAction(nextAudio, nextAudioSrc);
        }
    }

    playAudio() {
        const $playButton = document.querySelector('.js-play');

        $playButton.addEventListener('click', () => {
            this.toggleClassHidden();
            this.audio.play();
        });
    }

    pauseAudio() {
        this.pauseButton.addEventListener('click', () => {
            this.toggleClassHidden();
            this.audio.pause();
        });
    }

    nextAudio() {
        const $nextButton = document.querySelector('.js-next');

        $nextButton.addEventListener('click', () => {
            this.setNextAudio();
        });
    }

    prevAudio() {
        const $prevButton = document.querySelector('.js-prev');

        $prevButton.addEventListener('click', () => {
            const prevAudio = this.statusAudio.previousSibling;

            if (prevAudio) {
                const prevAudioSrc = prevAudio.dataset.file;

                this.initPrevNextAction(prevAudio, prevAudioSrc);
            }
        });
    }

    initPrevNextAction(audio, src) {
        this.addActiveClass(audio);
        this.setAudioSrc(src);
        this.audio.play();
    }

    init() {
        this.addEventChange();
        this.playAudio();
        this.pauseAudio();
        this.nextAudio();
        this.prevAudio();
        this.setNextAudioWhenEnd();
    }
}

const audioPlayer = new AudioPlayer();

audioPlayer.init();
