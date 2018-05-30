const handleError = res => {
  if (!res.ok) {
    throw res;
  }

  return res;
};

const saveProgress = allQuestions => {
  return fetch("/api/group/save-progress", {
    method: "POST",
    body: JSON.stringify({ questions: allQuestions }),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(response => response.json());
};

const login = (username, password) => {
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

const getCurrentUser = () => {
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

const logout = () => {
  return fetch("/api/user/logout", {
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

  return fetch(`/api/database/save/${title}`, {
    method: "POST",
    body: data,
    credentials: "same-origin"
  })
    .then(handleError)
    .then(res => res.json());
};

const loadDatabase = id => {
  return fetch(`/api/database/load/${id}`, {
    method: "GET",
    credentials: "same-origin"
  })
    .then(handleError)
    .then(res => res.arrayBuffer());
};

const deleteDatabase = id => {
  return fetch(`/api/database/delete/${id}`, {
    method: "GET",
    credentials: "same-origin"
  }).then(handleError);
};

const listDatabases = () => {
  return fetch("/api/database/list", {
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

  return fetch("/api/group/create", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};

const deleteGroup = id => {
  return fetch(`/api/group/delete/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const getGroup = id => {
  return fetch(`/api/group/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const listActiveGroups = () => {
  return fetch("/api/group/list/active", {
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
  return fetch("/api/group/list/all", {
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
  return fetch(`/api/group/join/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(handleError)
    .then(res => res.json());
};

const leaveCurrentGroup = () => {
  return fetch(`/api/group/leave/current`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};

const leaveGroup = id => {
  return fetch(`/api/group/leave/${id}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};

const api = {
  saveProgress,
  login,
  getCurrentUser,
  logout,
  saveDatabase,
  loadDatabase,
  listDatabases,
  deleteDatabase,
  getGroup,
  createGroup,
  deleteGroup,
  listGroups,
  listActiveGroups,
  joinGroup,
  leaveCurrentGroup,
  leaveGroup
};

export default api;
