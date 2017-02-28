class PromiseTester {
  constructor() {
    this.value = 0;
  }

  chainTimeouts() {
    const firstPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.value++;
      }, 0);

    });
  }
}

