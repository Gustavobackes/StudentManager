const key = "?x-endpoint-key=4bae58abcccb48e2a048304b75192585";

const student = `https://api.restpoint.io/api/student${key}`;

const studentId = `https://api.restpoint.io/api/student/`;

const btn = document.querySelector("#send");

btn.addEventListener("click", function (e) {
  e.preventDefault();

  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const idade = document.querySelector("#idade");

  const aluno = {
    name: nome.value,
    course: curso.value,
    age: +idade.value,
  };
  addNewAluno(aluno);
});

const rem = document.querySelector("#rem");

rem.addEventListener("click", function (e) {
  e.preventDefault();

  const id = document.querySelector("#id");

  deleteAluno(id.value);
  console.log(id.value);
});

const put = document.querySelector("#put");

put.addEventListener("click", function (e) {
  e.preventDefault();
  const id = document.querySelector("#ide");
  const nome = document.querySelector("#name");
  const curso = document.querySelector("#course");
  const idade = document.querySelector("#age");

  const aluno = {
    name: nome.value,
    course: curso.value,
    age: +idade.value,
  };
  updateAluno(id, aluno);
});

function getAluno() {
  axios
    .get(student)
    .then((response) => {
      id = 3;
      const data = response.data;
      console.log(data.data);
    })
    .catch((error) => console.error(error));
}
getAluno();

function addNewAluno(newAluno) {
  axios
    .post(student, newAluno)
    .then((res) => {
      alert(`aluno(a): ${nome.value} adidionado(a)`);
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
