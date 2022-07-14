import axios from "axios";
// import { store } from "../store/store";

// axios.interceptors.request.use((config) => {
//   const token = store.getState().account.account?.token;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
};

const Account = {
  currentUser: () => requests.get("account/currentUser"),
};
const agent = {
  Account,
};

export default agent;
