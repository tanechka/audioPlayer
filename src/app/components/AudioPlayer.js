import AudioList from './AudioList';
import AudioControls from './AudioControls';

export default class AudioPlayer {
  constructor () {
    this.activeAudio = null;
    this.audios = [];
    this.audio = new Audio();

    this.audioList = new AudioList({
      element: document.querySelector('.js-list'),
      onSelect: this.setPlayingAudio.bind(this)
    });

    this.audioControls = new AudioControls({
      element: document.querySelector('.js-controls'),
      onChange: this.onAudioChange.bind(this),
      onPlay: () => this.playAudio(),
      onPause: () => this.pauseAudio(),
      onPlayNext: this.playNextAudio.bind(this),
      onPlayPrev: this.playPrevAudio.bind(this),
      onRangeChange: this.setTimeAudio.bind(this)
    });

    this.addPlayNextListener();
  };

  onAudioChange (files) {
    this.setAudio(files);
    this.setActionPlayer();
  }

  playAudio () {
    if (this.audios.length) {
      this.audio.play();
    }
  }

  pauseAudio () {
    if (this.audios.length) {
      this.audio.pause();
    }
  }

  setAudio (files) {
    this.audios = [];

    for (let file of files) {
      this.audios.push({
        name: file.name,
        src: window.URL.createObjectURL(file)
      });
    }
  }

  setActionPlayer () {
    this.audioList.render(this.audios);
    this.setPlayingAudio(0);
  }

  setPlayingAudio (index) {
    this.audioControls.actionAudioButton();
    this.audioCanPlay(index);
    this.setRangeValue();
  }

  setTimeAudio (value) {
    this.audio.currentTime = value;
  }

  addPlayNextListener () {
    this.audio.addEventListener('ended', () => {
      this.playNextAudio();
    });
  }

  audioCanPlay (index) {
    this.initPrevNextAction(index);

    this.audio.addEventListener('canplay', this.setRangeAudio.bind(this));
  }

  setRangeValue () {
    setInterval(() => {
      this.audio && this.audioControls.setRangeValue(this.audio.currentTime);
    }, 3000);
  }

  setRangeAudio () {
    this.audioControls.setRangeMax(this.audio.duration);
  }

  setAudioSrc (src) {
    this.audio.src = src;
  }

  addActiveClass (index) {
    if (this.activeAudio !== null) {
      this.audioList.setInactive(this.activeAudio);
    }

    this.activeAudio = index;
    this.audioList.setActive(index);
  }

  playNextAudio () {
    let nextIndex = this.activeAudio + 1;

    if (!this.audios[nextIndex]) {
      nextIndex = 0;
    }

    this.initPrevNextAction(nextIndex);
  }

  playPrevAudio () {
    let nextIndex = this.activeAudio - 1;

    if (!this.audios[nextIndex]) {
      nextIndex = this.audios.length - 1;
    }

    this.initPrevNextAction(nextIndex);
  }

  initPrevNextAction (index) {
    if (this.audios.length) {
      this.hasAdiosInit(index);
    } else {
      this.setAudioSrc('');
    }
  }

  hasAdiosInit(index) {
    this.addActiveClass(index);
    this.setAudioSrc(this.audios[index].src);
    this.audio.play();
  }
}
