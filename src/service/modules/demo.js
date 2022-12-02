import axios from "../index";

export function getALLdemo() {
  return axios({
    url: "/preinstall",
  });
}

export function addDemo(data) {
  return axios({
    url: "/preinstall",
    method: "post",
    data: data,
  });
}
