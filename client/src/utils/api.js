const handleError = res => {
  if (!res.ok) {
    throw res;
  }

  return res;
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
  }).then(res => res.arrayBuffer());
};

const deleteDatabase = id => {
  return fetch(`/database/delete/${id}`, {
    method: "GET",
    credentials: "same-origin"
  });
};

const listDatabases = () => {
  return fetch("/database/list", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(res => res.json());
};

const api = {
  saveDatabase,
  loadDatabase,
  listDatabases,
  deleteDatabase
};

export default api;
