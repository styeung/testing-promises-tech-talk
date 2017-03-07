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

  describe('.fetchId', () => {
    xit('fails if you do not understand how JS works', () => {
      // stub out the api requests
      const idDeferred = Q.defer();

      spyOn(axios, 'get').and.returnValues(idDeferred.promise);

      // invoke fetch id
      const itemFetcher = new ItemFetcher(fakeStatusNode, fakeContentNode);

      itemFetcher.fetchId();

      // assert that status is still unstarted before promise has resolved
      expect(itemFetcher.status).toEqual('unstarted');

      // resolve the promise
      idDeferred.resolve({data: {id: '1'}});

      // assert that status is finished...
      // ...but this fails!
      expect(itemFetcher.status).toEqual('finished');
    });

    it('passes if you do understand how JS works', (done) => {
      // stub out the api requests
      const idDeferred = Q.defer();

      spyOn(axios, 'get').and.returnValues(idDeferred.promise);

      // invoke fetch id
      const itemFetcher = new ItemFetcher(fakeStatusNode, fakeContentNode);

      itemFetcher.fetchId();

      // assert that status is still unstarted before promise has resolved
      expect(itemFetcher.status).toEqual('unstarted');

      // resolve the promise
      idDeferred.resolve({data: {id: '1'}});

      _.defer(() => {
        // assert that status is finished...
        expect(itemFetcher.status).toEqual('finished');
        done();
      });
    });
  });

  describe('.fetchItem', () => {
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
});
