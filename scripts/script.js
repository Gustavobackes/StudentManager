const key = "?x-endpoint-key=4bae58abcccb48e2a048304b75192585";

const student = `https://api.restpoint.io/api/student${key}`;

const studentId = `https://api.restpoint.io/api/student/`;

const btn = document.querySelector("#send");

btn.addEventListener("click", function (e) {
  e.preventDefault();

  const id = document.querySelector("#id");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const idade = document.querySelector("#idade");

  const aluno = {
    name: nome.value,
    course: curso.value,
    age: +idade.value,
  };

  if (id.value && nome.value && (curso.value || idade.value)) {
    updateAluno(id.value, aluno);
  } else if (id.value && !(nome.value || curso.value || idade.value)) {
    deleteAluno(id.value);
  } else if (nome.value && curso.value && idade.value) {
    addNewAluno(aluno);
  } else {
    alert("preencha todos os campos!");
  }
});

function getAluno() {
  axios
    .get(student)
    .then((response) => {
      const data = response.data;
      console.log(data.data);
      data.data.forEach((aluno) => {
        lerDados(aluno);
      });
    })
    .catch((error) => console.error(error));
}

function lerDados(aluno) {
  let tbody = document.querySelector("tbody");

  let tr = tbody.insertRow();

  let td_id = tr.insertCell();
  let td_aluno = tr.insertCell();
  let td_curso = tr.insertCell();
  let td_idade = tr.insertCell();

  td_id.innerHTML = aluno.id;
  td_aluno.innerHTML = aluno.name;
  td_curso.innerHTML = aluno.course;
  td_idade.innerHTML = aluno.age;

  let btnCopy = document.createElement("button");
  btnCopy.textContent = "copy";
  btnCopy.id = "copy";
  td_id.appendChild(btnCopy);
  btnCopy.addEventListener("click", function (e) {
    e.preventDefault();
    navigator.clipboard.writeText(aluno.id).then(() => {
      alert("Id Copiado");
    });
  });
}

getAluno();

function addNewAluno(newAluno) {
  axios
    .post(student, newAluno)
    .then((res) => {
      alert(`aluno(a) adidionado(a)`);
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function updateAluno(id, alunoUpdate) {
  axios
    .put(`${studentId}${id}${key}`, alunoUpdate)
    .then((res) => {
      console.log(res);
      alert(`ID ${id} atualizado`);
    })
    .catch((err) => {
      console.error(err);
      alert("ID não encontrado");
    });
}

function deleteAluno(id) {
  axios
    .delete(`${studentId}${id}${key}`)
    .then((res) => {
      console.log(res.data);
      alert(`ID ${id} deletado`);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getTutorial() {
  let result = prompt(`Tutorial
  Salvar: Preencher todos os campos menos o ID
  Atualizar: Preencher todos os campos
  Remover: Apenas o ID
  Para confirmar que leu digite: eu li`);

  while (result !== "eu li") {
    alert("favor, ler e confirmar");
    result = getResposta();
  }
}
function getResposta() {
  result = prompt(`Tutorial
Salvar: Preencher todos os campos menos o ID
Atualizar: Preencher todos os campos
Remover: Apenas o ID
Para confirmar que leu digite: eu li`);
  return result;
}
