async function obterTasks() {
  const response = await fetch("http://192.168.1.90:8080/task");
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const json = await response.json();
  return json;
}

async function incluirTask(data) {
  const response = await fetch("http://192.168.1.90:8080/task", {
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
  const response = await fetch(`http://192.168.1.90:8080/task/${id}`, {
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
  const response = await fetch(`http://192.168.1.90:8080/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}
