const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // filter : true 인 애들만 가지고 새로운 어레이를 만든다.
    toDos = cleanToDo;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
    });
    }
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "🍎";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newID = toDos.length + 1;
    span.innerText = text;
    span.classList.add('todoText');
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newID
    };

    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event){
    event.preventDefault();
    const currentVaule = toDoInput.value;
    paintToDo(currentVaule);
    toDoInput.value = "";
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);

}

init();