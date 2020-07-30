// import { API } from "./../constants/API";

// dev API
import { devAPI as API } from "./../constants/API";

let token;
if (localStorage.getItem("neobisHUBDate")) {
  token = JSON.parse(localStorage.getItem("neobisHUBDate")).token;
}

async function getData(url) {
  let response = await fetch(`${API}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    },
  });
  let body = await response.json();
  return body;
}

async function postData(url, data) {
  let req = await fetch(`${API}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data));
  const res = await req.json();
  return res;
}

async function putData(url, data) {
  console.log(JSON.stringify(data));
  let req = await fetch(`${API}${url}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await req.json();
  return res;
}

async function patchData(url, data) {
  console.log(JSON.stringify(data));
  let req = await fetch(`${API}${url}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await req.json();
  return res;
}

async function deleteData(url, data = "") {
  let result = await fetch(`${API}${url}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(result);
  return result;
}

async function postDataNoToken(url, data) {
  let req = await fetch(`${API}${url}`, {
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
  let response = await fetch(`${API}${url}`, {
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
  putData,
  deleteData,
  postDataNoToken,
  patchData,
  getDataNoToken,
};
