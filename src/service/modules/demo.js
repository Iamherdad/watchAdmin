import axios from "../index";

export function getALLdemo() {
  return axios({
    url: "/preinstall",
  });
}

export function setDemo(data) {
  return axios({
    url: "/preinstall",
    method: "post",
    data: data,
  });
}

