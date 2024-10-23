window.onload = async () => {
  var json;
  json = await obterTasks();
  renderTasks(json);
};

const taskList = document.getElementById("task-list");

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task", "col", "p-2");

    if (task.status === 1) {
      div.classList.add("completed");
    }

    div.innerHTML = `
      <div class="card h-100 text-bg-primary">
        <div class="card-header">${task.limitDate.replace(
          /(\d{4})-(\d{2})-(\d{2})/,
          "$3/$2/$1"
        )}</div>
        <div class="card-body">
          <h5 class="card-title">${task.name}</h5>
          <p class="card-text">${task.description}</p>
          <input type="hidden" id="idTask" class="idTask" value="${task.id}"/>
          <div class="status"><span class="badge ${
            task.status == 1 ? "text-bg-success" : "text-bg-danger"
          } mb-2">${task.status == 1 ? "Completo" : "Em andamento"}</span></div>
          <button type="button" class="btn btn-warning btnEditar" style="margin-right:5px;" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</a>
          <button type="button" class="btn btn-danger btnExcluir">Excluir</button>
        </div>
      </div>`;

    taskList.appendChild(div);
  });

  const btnExcluirList = document.querySelectorAll(".btnExcluir");
  btnExcluirList.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = btn.parentNode.querySelector(".idTask").value;
      try {
        loading(true);
        const response = await excluirTask(id);
        renderTasks(response);
        loading(false);
      } catch (e) {
        alert(e);
      }
    });
  });

  const btnEditar = document.querySelectorAll(".btnEditar");
  btnEditar.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const taskDiv = btn.parentNode;
      const id = taskDiv.querySelector(".idTask").value;
      const name = taskDiv.querySelector(".card-title").textContent;
      const description = taskDiv.querySelector(".card-text").textContent;
      const taskLimitDate =
        taskDiv.parentNode.querySelector(".card-header").textContent;
      const status = taskDiv.querySelector(".status").textContent;

      document.getElementById("btnEdit").hidden = false;
      document.getElementById("btnInclude").hidden = true;
      document.getElementById("id").value = id;
      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("dtLimite").value = taskLimitDate.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3-$2-$1"
      );
      document.getElementById("status").checked = status === "Completo";
    });
  });
}

async function salvarEdicao(form) {
  const task = {
    name: form.name.value,
    description: form.description.value,
    limitDate: form.dtLimite.value,
    status: form.status.checked ? 1 : 2,
  };
  try {
    loading(true);
    const response = await editTask(task, form.id.value);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modal.hide();
    renderTasks(response);
    loading(false);
  } catch (e) {
    alert(e);
  }
}

async function salvarInclusao(form) {
  const task = {
    name: form.name.value,
    description: form.description.value,
    limitDate: form.dtLimite.value,
    status: form.status.checked ? 1 : 2,
  };
  try {
    loading(true);
    const response = await incluirTask(task);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modal.hide();
    renderTasks(response);
    loading(false);
  } catch (e) {
    alert(e);
  }
}

function openInsert() {
  document.getElementById("task-form").reset();
  document.getElementById("btnInclude").hidden = false;
  document.getElementById("btnEdit").hidden = true;
}

function loading(value) {
  if (value) document.getElementById("spinnerOverlay").classList.add("active");
  else document.getElementById("spinnerOverlay").classList.remove("active");
}
