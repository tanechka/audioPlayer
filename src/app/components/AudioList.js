import Component from './Component';

export default class AudioList extends Component {
  onCreate () {
    this.addSelectListener();
  }

  addSelectListener () {
    this.element.addEventListener('click',
      event => this.onSelect(this.getIndex(event.target))
    );
  }

  render (tracks) {
    const listAudio = tracks.map((file, index) => {
      return `<li data-index="${index}">${file.name}</li>`;
    });

    this.element.innerHTML = listAudio.join('');
  }

  getIndex (element) {
    return element.dataset.index;
  }

  setActive (index) {
    const audioElement = this.element.childNodes[index];
    audioElement.classList.add('js-playing');
  }

  setInactive (index) {
    const audioElement = this.element.childNodes[index];
    audioElement.classList.remove('js-playing');
  }
}
