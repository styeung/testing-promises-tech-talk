import axios from 'axios';

class PromiseTester {
  constructor(global) {
    this.value = 0;
    this.global = global;
  }

  fetchItem() {
    axios.get('http://localhost:4567/id').then((response) => {
      const id = response.data.id;
      return axios.get('http://localhost:4567/items/' + id); 
    }).then((response) => {
      const itemNode = this.global.document.getElementById('item-content');
      itemNode.innerHTML = response.data.content;
    });
  }
}

export default PromiseTester;
