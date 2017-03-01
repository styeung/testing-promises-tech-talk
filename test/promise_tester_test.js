import _ from 'lodash';
import Q from 'q';
import axios from 'axios';
import PromiseTester from '../app/promise_tester.js';

describe('Testing Promises', () => {
  it('can test chaining promises using Q', (done) => {
    const idDeferred = Q.defer();
    const itemDeferred = Q.defer();

    spyOn(axios, 'get').and.returnValues(idDeferred.promise, itemDeferred.promise);

    const promiseTester = new PromiseTester();

    promiseTester.fetchItem();

    expect(promiseTester.status).toEqual('unstarted');

    idDeferred.resolve({data: {id: '1'}});

    setTimeout(() => {
      expect(promiseTester.status).toEqual('pending');
      itemDeferred.resolve({data: {id: '1', content: 'boom'}});
      setTimeout(() => {
        expect(promiseTester.status).toEqual('finished');
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

    const promiseTester = new PromiseTester();

    promiseTester.fetchItem();

    expect(promiseTester.status).toEqual('unstarted');

    idPromiseHelper.resolve({data: {id: '1'}});

    setTimeout(() => {
      expect(promiseTester.status).toEqual('pending');
      itemPromiseHelper.resolve({data: {id: '1', content: 'boom'}});
      setTimeout(() => {
        expect(promiseTester.status).toEqual('finished');
        done();
      }, 0);
    }, 0);
  });
});
