import _ from 'lodash';
import PromiseTester from '../app/promise_tester.js';

describe('Testing Promises', () => {
  it('chaining promises', (done) => {
    const promiseTester = new PromiseTester();

    promiseTester.chainTimeouts();

    _.defer(() => {
      expect(promiseTester.value).toEqual(1);
      done();
    });
  });
});
