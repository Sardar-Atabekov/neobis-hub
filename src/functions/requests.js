import axios from "axios";

// dev API
import { devAPI as API } from "./../constants/API";

let token;
if (localStorage.getItem("neobisHUBDate")) {
  token = JSON.parse(localStorage.getItem("neobisHUBDate")).token;
}

const headers = {
  Accept: "application/json",
  Authorization: "Token " + token,
  "Content-Type": "application/json",
};

const headersFiles = {
  "Content-Type":
    "multipart/form-data; boundary=----WebKitFormBoundaryAnh7fEGNrsvVU7yB",
  Authorization: "Token " + token,
};
const tokenHeader = {
  Authorization: "Token " + token,
};
async function getData(url) {
  let response = await fetch(`${API}/${url}`, {
    method: "GET",
    headers,
  });
  let body = await response.json();
  return body;
}

async function postData(url, data) {
  let req = await fetch(`${API}/${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  const res = await req.json();
  return res;
}

async function postFilesData(url, data) {
  let req = await fetch(`${API}/${url}`, {
    method: "POST",
    headers: tokenHeader,
    body: data,
  });
  const res = await req.json();
  return res;

  // let req = await axios
  //   .post(`${API}/${url}`, data, {
  //     headers: {
  //       "Content-Type":
  //         "multipart/form-data; boundary=<calculated when request is sent>",
  //       Authorization: `Token ${token}`,
  //     },
  //   })
  // const res = await req.data;
  // console.log('res', res);
  // return res;
}

async function putData(url, data) {
  console.log(JSON.stringify(data));
  let req = await fetch(`${API}/${url}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  const res = await req.json();
  return res;
}

async function patchData(url, data) {
  console.log(JSON.stringify(data));
  let req = await fetch(`${API}/${url}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  const res = await req.json();
  return res;
}

async function patchFilesData(url, data) {
  // let req = await fetch(`${API}/${url}`, {
  //   method: "PATCH",
  //   headers: tokenHeader,
  //   body: data,
  // });
  // const res = await req.json();
  // return res;
  let req = await axios.patch(`${API}/${url}`, data, {
    headers: headersFiles,
  });
  const res = await req.data;
  return res;
}

async function putFilesData(url, data) {
  let req = await axios.put(`${API}/${url}`, data, {
    headers: headersFiles,
  });
  const res = await req.data;
  return res;
}

async function deleteData(url, data = "") {
  let result = await fetch(`${API}/${url}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify(data),
  });
  console.log(result);
  return result;
}

async function postDataNoToken(url, data) {
  let req = await fetch(`${API}/${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await req.json();
  return res;
}

async function getDataNoToken(url) {
  let response = await fetch(`${API}/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  let body = await response.json();
  return body;
}

export {
  getData,
  postData,
  postFilesData,
  putData,
  patchData,
  deleteData,
  putFilesData,
  getDataNoToken,
  patchFilesData,
  postDataNoToken,
};
