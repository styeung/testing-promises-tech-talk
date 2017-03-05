import _ from 'lodash';
import Q from 'q';
import axios from 'axios';
import ItemFetcher from '../app/item_fetcher';

describe('Testing Promises', () => {
  let fakeStatusNode,
      fakeContentNode;

  beforeEach(() => {
    fakeStatusNode = {};
    fakeContentNode = {};
  });

  xit('fails if you do not understand how JS works', () => {
    const idDeferred = Q.defer();
    const itemDeferred = Q.defer();

    spyOn(axios, 'get').and.returnValues(idDeferred.promise, itemDeferred.promise);

    const itemFetcher = new ItemFetcher(fakeStatusNode, fakeContentNode);

    itemFetcher.fetchItem();

    expect(itemFetcher.status).toEqual('unstarted');

    idDeferred.resolve({data: {id: '1'}});

    expect(itemFetcher.status).toEqual('pending');

    itemDeferred.resolve({data: {id: '1', content: 'boom'}});

    expect(itemFetcher.status).toEqual('finished');
  });

  it('can test chaining promises using Q', (done) => {
    const idDeferred = Q.defer();
    const itemDeferred = Q.defer();

    spyOn(axios, 'get').and.returnValues(idDeferred.promise, itemDeferred.promise);

    const itemFetcher = new ItemFetcher(fakeStatusNode, fakeContentNode);

    itemFetcher.fetchItem();

    expect(itemFetcher.status).toEqual('unstarted');

    idDeferred.resolve({data: {id: '1'}});

    setTimeout(() => {
      expect(itemFetcher.status).toEqual('pending');
      itemDeferred.resolve({data: {id: '1', content: 'boom'}});
      setTimeout(() => {
        expect(itemFetcher.status).toEqual('finished');
        done();
      }, 0);
    }, 0);
  });

  it('can test chaining promises using a promise Helper', (done) => {
    const idPromiseHelper = {};
    const itemPromiseHelper = {};

    const idDeferred = new Promise((resolve, reject) => { idPromiseHelper.resolve = resolve; });
    const itemDeferred = new Promise((resolve, reject) => { itemPromiseHelper.resolve = resolve; });

    spyOn(axios, 'get').and.returnValues(idDeferred, itemDeferred);

    const itemFetcher = new ItemFetcher(fakeStatusNode, fakeContentNode);

    itemFetcher.fetchItem();

    expect(itemFetcher.status).toEqual('unstarted');

    idPromiseHelper.resolve({data: {id: '1'}});

    setTimeout(() => {
      expect(itemFetcher.status).toEqual('pending');
      itemPromiseHelper.resolve({data: {id: '1', content: 'boom'}});
      setTimeout(() => {
        expect(itemFetcher.status).toEqual('finished');
        done();
      }, 0);
    }, 0);
  });
});
