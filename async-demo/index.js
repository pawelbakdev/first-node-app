console.log("Before");

const user = getUser(1, (user) => {
  console.log("user", user);
  getRepositories(user.githubUserName, (repos) => console.log(repos));
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, githubUserName: "mosh" });
  }, 2000);

  return 1;
}

function getRepositories(username, callback) {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  }, 1000);
}
