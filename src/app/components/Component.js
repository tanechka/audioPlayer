export default class Component {
  constructor (props) {
    this.element = undefined;
    Object.assign(this, props);
    this.onCreate(props);
  }

  onCreate () {}

  render () {
    this.element.innerHTML = '';
  }
}
