const toDoForm = document.getElementById("todo-form");
const ToDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos()
{
    localStorage.setItem("todos", JSON.stringify(toDos));
    //JSON.stringify(a)는 a가 object든 array든 다 string 형태로 변환
    //<=> JSON.parse(a);
}

function deleteToDo(event)
{
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newToDo)
{
    const li = document.createElement("li");
    li.id = newToDo.id; //id : ~~
    li.style.paddingTop = "25px";
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button = document.createElement("button");
    const buttonStyle = button.style;
    button.innerText = "X";
    buttonStyle.border = "0px"; 
    buttonStyle.marginLeft = "10px";
    buttonStyle.padding = "2px 4px";
    buttonStyle.backgroundColor = "red";
    buttonStyle.color = "white";
    buttonStyle.opacity = "30%"
    button.addEventListener("click",deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event)
{
    event.preventDefault();
    const newToDo = ToDoInput.value;
    ToDoInput.value = "";
    const newToDoObj = {
        text : newToDo,
        id: Date.now()
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos)
{
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
    //pasedToDos.forEach((item) => console.log("hello, this is term of ", item);)
    
}