import axios from "axios";
const baseUrl = "api/login";

const login = async (identity) => {
  const response = await axios.post(baseUrl, identity);
  return response.data;
};

export default { login };
