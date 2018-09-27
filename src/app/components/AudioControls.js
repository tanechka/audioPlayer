import Component from './Component';

export default class AudioControls extends Component {
  onCreate () {
    this.pauseButton = this.element.querySelector('.js-pause');
    this.rangeInput = this.element.querySelector('.js-range');
    this.addChangeListener();
    this.addPlayListener();
    this.addPauseListener();
    this.addPlayNextListener();
    this.addPlayPrevListener();
    this.addRangeChangeListener();
  }

  addChangeListener () {
    const $inputSelectFiles = this.element.querySelector('.js-files');
    $inputSelectFiles.addEventListener('change', input =>
      this.onChange(input.currentTarget.files)
    );
  }

  addPlayListener () {
    const $playButton = document.querySelector('.js-play');

    $playButton.addEventListener('click', () => {
      this.toggleClassHidden();
      this.onPlay();
    });
  }

  addPauseListener () {
    this.pauseButton.addEventListener('click', () => {
      this.toggleClassHidden();
      this.onPause();
    });
  }

  addPlayNextListener () {
    const $nextButton = this.element.querySelector('.js-next');

    $nextButton.addEventListener('click', this.onPlayNext);
  }

  addPlayPrevListener () {
    const $prevButton = this.element.querySelector('.js-prev');

    $prevButton.addEventListener('click', this.onPlayPrev);
  }

  addRangeChangeListener () {
    const self = this;

    this.rangeInput.addEventListener('click', event =>
      this.onRangeChange(parseInt(event.target.value))
    );
  }

  actionAudioButton () {
    this.pauseButton.classList.contains('hidden') && this.toggleClassHidden();
  }

  toggleClassHidden () {
    const buttons = this.element.querySelectorAll('.js-toggle-hidden');

    buttons.forEach(button => {
      button.classList.toggle('hidden');
    });
  }

  setRangeValue (value) {
    this.rangeInput.value = value;
  }

  setRangeMax (value) {
    this.rangeInput.max = value;
  }
}
