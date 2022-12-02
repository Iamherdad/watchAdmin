import axios from "../index";

export function getStarWorkList() {
  return axios({
    url: "/star",
  });
}

export function delStarWork(id) {
  return axios({
    method: "post",
    url: "/star",
    data: id,
  });
}
