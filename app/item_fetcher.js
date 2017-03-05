import axios from 'axios';

class ItemFetcher {
  constructor(statusNode, contentNode) {
    this.statusNode = statusNode;
    this.contentNode = contentNode;
    this.status = 'unstarted';
  }

  fetchId() {
    this.statusNode.innerHTML = this.status;

    return axios.get('http://localhost:4567/id')
      .then((response) => {
        this.status = 'finished';
        this.statusNode.innerHTML = this.status;

        this.contentNode.innerHTML = JSON.stringify(response.data);
      });
  }

  fetchItem() {
    this.statusNode.innerHTML = this.status;

    return axios.get('http://localhost:4567/id')
      .then((response) => {
        this.status = 'pending';
        this.statusNode.innerHTML = this.status;

        const id = response.data.id;
        return axios.get('http://localhost:4567/items/' + id);
      })
      .then((response) => {
        this.status = 'finished';
        this.statusNode.innerHTML = this.status;

        this.contentNode.innerHTML = JSON.stringify(response.data);
      });
  }
}

export default ItemFetcher;
