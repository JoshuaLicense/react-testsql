const handleError = res => {
  if (!res.ok) {
    console.log("I'm throwing");
    throw res;
  }
  console.log("I'm happy");

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

const createGroup = (title, databaseID) => {
  const data = { title, databaseID };

  return fetch("/group/create", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const deleteGroup = id => {
  return fetch(`/group/delete/${id}`)
    .then(handleError)
    .then(res => res.json());
};

const listActiveGroups = () => {
  return fetch("/group/list/active", {
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
  return fetch("/group/list/all", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const joinGroup = id => {
  return fetch(`/group/join/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const leaveGroup = id => {
  return fetch(`/group/leave/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};

const api = {
  login,
  getCurrentUser,
  logout,
  saveDatabase,
  loadDatabase,
  listDatabases,
  deleteDatabase,
  createGroup,
  deleteGroup,
  listGroups,
  listActiveGroups,
  joinGroup,
  leaveGroup
};

export default api;
