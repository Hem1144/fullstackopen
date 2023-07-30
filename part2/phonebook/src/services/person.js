import axios from "axios";
const rootUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(rootUrl).then((res) => res.data);
};

const addPerson = (person) => {
  return axios.post(rootUrl, person).then((res) => res.data);
};
export default { getAll, addPerson };
