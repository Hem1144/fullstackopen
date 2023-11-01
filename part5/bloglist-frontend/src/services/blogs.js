import axios from "axios";
const baseUrl = "api/blogs";

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, blogToUpdate) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { getAll, create, update, deleteBlog, setToken };
