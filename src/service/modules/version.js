import axios from "../index";

export function getVersion() {
  return axios({
    url: "/versionInfo",
    params: {
      type: "newVersion",
    },
  });
}

export function uploadVersion(file) {
  return axios({
    method: "post",
    url: "/versionInfo",

    data: file,
  });
}

export function versionRollback(id) {
  return axios({
    url: "/versionInfo",
    method: "post",
    data: id,
  });
}
