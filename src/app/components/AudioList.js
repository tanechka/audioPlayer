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

  render (audio) {
    const listAudio = audio.map((file, index) => {
      return `<li data-index="${index}">${file.name}</li>`;
    });

    this.element.innerHTML = this.innerListAudio(listAudio);
  }

  getIndex (element) {
    return element.dataset.index;
  }

  setActive (index) {
    const audioElement = this.element.childNodes[index];

    audioElement && audioElement.classList.add('js-playing');
  }

  setInactive (index) {
    const audioElement = this.element.childNodes[index];

    audioElement && audioElement.classList.remove('js-playing');
  }

  setDefault () {
     return `<li>Please select audio</li>`;
  }

  innerListAudio(listAudio) {
    return listAudio.length ? listAudio.join('') : this.setDefault();
  }
}
