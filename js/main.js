import ServiceAPI from "../service/service.js";
import Todo from "../model/todo.js";
import TodoList from "../model/todolist.js";

let ToDoList = [];
//POST trực tiếp

let ListToDo = new TodoList();

document.getElementById("addItem").onclick = () => {
  let NewTask = document.getElementById("newTask").value;
  let todoI = new Todo("", NewTask, "incomplete");
  ToDoList = [...ToDoList, todoI];
  postData(todoI);
  renderTodolist(ToDoList);
};

const postData = async (tdo) => {
  try {
    const postTdo = await ServiceAPI.postTodo(tdo);
  } catch (error) {
    throw error;
  }
};

window.removeTodo = (id) => {
  deleteData(id);
};

window.doneTodo = (id) => {
  for (let i = 0; i < ToDoList.length; i++) {
    if (ToDoList[i].id * 1 === id) {
      console.log(ToDoList[i]);
      ToDoList[i] = { ...ToDoList[i], type: "complete" };
      console.log(ToDoList[i]);
      updateData(ToDoList[i]);
    }
  }

  console.log(id); //Number
  console.log("13"); //Chuỗi
  renderTodolist(ToDoList);
};

const updateData = async (tdo) => {
  const upData = await ServiceAPI.updateTodo(tdo).then((res) => {
    console.log(res);
  });
};

const deleteData = async (id) => {
  const deleteTdo = await ServiceAPI.deleteTodo(id).then((res) => {
    console.log(id); //Number
    ToDoList = ToDoList.filter((item) => item.id !== `${id}`);
    console.log("13"); //Chuỗi
    renderTodolist(ToDoList);
  });
};

const renderTodolist = (list) => {
  let contentA = "";
  let contentB = "";
  for (let i = 0; i < list.length; i++) {
    let type = list[i].type;
    if ((type == "incomplete")) {
      contentA += `
      <li>${list[i].content}
      <div>
      <button onclick='doneTodo(${list[i].id})'>
      <i class="fa fa-check-circle"></i>
      </button>
      <button onclick='removeTodo(${list[i].id})'>
      <i class="fa fa-times-circle"></i>
      </button>
      </div>
      </li>
      `;
    } else if ((type == "complete")) {
      contentB += `
      <li style="color:green">${list[i].content}
      <div>
      <button>
      <i style="color:green" class="fa fa-check-circle"></i>
      </button>
      <button onclick='removeTodo(${list[i].id})'>
      <i class="fa fa-times-circle"></i>
      </button>
      </div>
      </li>
      `;
    }
  }
  document.getElementById("todo").innerHTML = contentA;
  document.getElementById("completed").innerHTML = contentB;
};
//style="color:green"
const fetchData = async () => {
  try {
    const { data } = await ServiceAPI.getTodo();
    if (data) {
      const list = data.map((tdo) => {
        const { id, content, type } = tdo;
        return new Todo(id, content, type);
      });
      ToDoList = [...list];
      renderTodolist(ToDoList);
      //RENDER
    }
  } catch (error) {
    throw error;
  }
};

fetchData();