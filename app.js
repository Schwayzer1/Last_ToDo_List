const addBtn = document.getElementById("addBtn");
console.log(addBtn);
const input = document.getElementById("task-input");
console.log(input);
const list = document.querySelector(".list");
console.log(list);
const listUl = document.querySelector(".listUl");
console.log(listUl);

let todos = JSON.parse(localStorage.getItem("LIST")) || [];
console.log(todos);

const renderSavedTodos = () => {
  todos.forEach((todo) => {
    createListElement(todo);
  });
};

renderSavedTodos();

addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    alert("Please enter new todo");
  } else {
    const newTodo = {
      id: new Date().getTime(),
      completed: false,
      text: input.value,
    };
    createListElement(newTodo);

    todos.push(newTodo);
    localStorage.setItem("LIST", JSON.stringify(todos));
    console.log(todos);
    input.value = "";
  }
});

function createListElement(newTodo) {
  const { id, completed, text } = newTodo;

  const li = document.createElement("li");
  listUl.appendChild(li);
  li.id = id;
  completed && li.classList.add("checked");

  const okIkon = document.createElement("i");
  okIkon.setAttribute("class", "fas fa-check");
  li.appendChild(okIkon);

  const p = document.createElement("p");
  const pTextNode = document.createTextNode(text);
  p.appendChild(pTextNode);
  li.appendChild(p);

  const deleteIkon = document.createElement("i");
  deleteIkon.setAttribute("class", "fas fa-trash");
  li.appendChild(deleteIkon);

  listUl.appendChild(li);
}

listUl.addEventListener("click", (e) => {
  console.log(e.target);

  const id = e.target.parentElement.getAttribute("id");

  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todos = todos.filter((todo) => todo.id !== Number(id));
    localStorage.setItem("LIST", JSON.stringify(todos));
  } else if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
    for (let todo of todos) {
      console.log(typeof todo.id);
      if (todo.id === +id) {
        if (todo.completed) {
          todo.completed = false;
        } else {
          todo.completed = true;
        }
      }
    }
    localStorage.setItem("LIST", JSON.stringify(todos));
  }
});

input.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});

window.onload = function () {
  input.focus();
};
