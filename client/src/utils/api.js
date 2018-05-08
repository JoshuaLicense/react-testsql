const handleError = res => {
  if (!res.ok) {
    throw res;
  }

  return res;
};

const login = (username, password) => {
  const data = { username, password };

  return fetch("/user/login", {
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

const getCurrentUser = () => {
  return fetch("/user/info", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(response => response.json());
};

const logout = () => {
  return fetch("/user/logout", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(response => response.json());
};

const saveDatabase = (title, database) => {
  const blob = new Blob([database], {
    type: `application/x-sqlite-3`
  });

  const data = new FormData();

  data.set("database", blob);

  return fetch(`/database/save/${title}`, {
    method: "POST",
    body: data,
    credentials: "same-origin"
  })
    .then(handleError)
    .then(res => res.json());
};

const loadDatabase = id => {
  return fetch(`/database/load/${id}`, {
    method: "GET",
    credentials: "same-origin"
  })
    .then(handleError)
    .then(res => res.arrayBuffer());
};

const deleteDatabase = id => {
  return fetch(`/database/delete/${id}`, {
    method: "GET",
    credentials: "same-origin"
  }).then(handleError);
};

const listDatabases = () => {
  return fetch("/database/list", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const listGroups = () => {
  return fetch("/group/list", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const api = {
  login,
  getCurrentUser,
  logout,
  saveDatabase,
  loadDatabase,
  listDatabases,
  deleteDatabase,
  listGroups
};

export default api;
