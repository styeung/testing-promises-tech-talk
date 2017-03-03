import axios from 'axios';

class ItemFetcher {
  constructor() {
    this.status = 'unstarted';
  }

  fetchItem() {
    console.log('current status: ' + this.status);

    return axios.get('http://localhost:4567/id')
      .then((response) => {
        this.status = 'pending';
        console.log('current status: ' + this.status);

        const id = response.data.id;
        return axios.get('http://localhost:4567/items/' + id);
      })
      .then((response) => {
        this.status = 'finished';
        console.log('current status: ' + this.status);

        return response;
      });
  }
}

export default ItemFetcher;
