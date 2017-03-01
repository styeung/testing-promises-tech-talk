import _ from 'lodash';
import Q from 'q';
import axios from 'axios';
import PromiseTester from '../app/promise_tester.js';

describe('Testing Promises', () => {
  it('chaining promises using Q', (done) => {
    const idDeferred = Q.defer();
    const itemDeferred = Q.defer();

    spyOn(axios, 'get').and.returnValues(idDeferred.promise, itemDeferred.promise);

    const promiseTester = new PromiseTester();

    promiseTester.fetchItem();

    expect(promiseTester.status).toEqual('unstarted');

    idDeferred.resolve({id: '1'});

    _.defer(() => {
      expect(promiseTester.status).toEqual('pending');
      itemDeferred.resolve({id: '1', content: 'boom'});
      _.defer(() => {
        expect(promiseTester.status).toEqual('finished');
        done();
      });
    });
  });
});
