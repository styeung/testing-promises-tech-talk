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
