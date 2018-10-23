import handleError from "../../utils/handleError";

export const login = (username, password) => {
  const data = { username, password };

  return fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(response => response.json());
};

export const getCurrentUser = () => {
  return fetch("/api/user/info", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(response => response.json());
};

export const logout = () => {
  return fetch("/api/user/logout", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};
