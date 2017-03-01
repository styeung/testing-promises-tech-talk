import axios from 'axios';

class PromiseTester {
  constructor() {
    this.status = 'unstarted';
  }

  fetchItem() {
    return axios.get('http://localhost:4567/id')
      .then((response) => {
        this.status = 'pending';
        const id = response.id;
        return axios.get('http://localhost:4567/items/' + id); })
      .then((response) => { 
        this.status = 'finished';

        return response;
      });
  }
}

export default PromiseTester;
