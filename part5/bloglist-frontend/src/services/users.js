import axios from "axios";
const baseUrl = "api/users";

const getUserBlogs = async ({ username }) => {
  const response = await axios.get(baseUrl);
  const users = response.data;
  const filteredUser = users.filter((user) => user.username === username);
  return filteredUser[0];
};

export default { getUserBlogs };
