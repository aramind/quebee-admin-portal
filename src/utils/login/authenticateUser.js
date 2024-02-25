// mock list of allowed user
const allowedUsers = [
  {
    username: "mon",
    password: "123456",
    role: 5,
  },
  {
    username: "robin",
    password: "123123",
    role: 2,
  },
  {
    username: "anne",
    password: "123",
    role: 1,
  },
];

const findUser = ({ username, password }) => {
  console.log(username);
  console.log(password);
  const foundUser = allowedUsers.find(
    (user) => user.username === username && user.password === password
  );
  console.log("FOUND:", foundUser);
  return foundUser;
};

export default findUser;
