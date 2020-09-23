import axios from "axios";

const instance = axios.create({
  baseURL: "https://nodemcu-send-data.firebaseio.com/",
});

export default instance;
