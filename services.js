const url = "http://192.168.1.89:8080/task";

async function obterTasks() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const json = await response.json();
  return json;
}

async function incluirTask(data) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

async function editTask(data, id) {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

async function excluirTask(id) {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}
