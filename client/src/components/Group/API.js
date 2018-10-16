import handleError from "../../utils/handleError";

export const saveProgress = allQuestions => {
  return fetch("/api/group/save-progress", {
    method: "POST",
    body: JSON.stringify({ questions: allQuestions }),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};

export const createGroup = (title, databaseID) => {
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

export const updateGroup = (groupId, title) => {
  return fetch(`/api/group/update/${groupId}`, {
    method: "POST",
    body: JSON.stringify({ title }),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};

export const deleteGroup = id => {
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

export const getGroup = id => {
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

export const removeUserFromGroup = (groupId, userId) => {
  return fetch(`/api/group/${groupId}/remove/${userId}`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};

export const listGroups = () => {
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

export const joinGroup = id => {
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

export const leaveCurrentGroup = () => {
  return fetch(`/api/group/leave/current`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(handleError);
};
