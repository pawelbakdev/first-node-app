const p = new Promise((resolve, reject) => {
  // ...

  setTimeout(() => {
    reject(new Error("message"));
  }, 2000);
  // resolve(1);
});

p.then((result) => console.log("result", result)).catch((err) =>
  console.log("Err", err.message)
);
