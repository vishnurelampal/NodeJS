function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    if (promises.length === 0) {
      resolve(result);
    }
    promises.forEach((item, index) => {
      item
        .then((res) => {
          result[index] = res;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("hmm after a while");
  }, 2000);
});
const p2 = Promise.resolve("Oops");

const p3 = Promise.resolve("ComeOn ma Boy");
console.log(PromiseAll([p1, p2, p3]));
