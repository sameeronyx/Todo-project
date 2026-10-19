
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const taskCount = document.querySelector("#task-count");
const taskCompleteCount = document.querySelector("#complete-count");
const addBtn = document.querySelector("#add-task");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editTodoId = null;

function saveTodo(){
    localStorage.setItem("todos" , JSON.stringify(todos));
}


todoForm.addEventListener("submit", (e) => {
    e.preventDefault();


    const todoValue = todoInput.value.trim();

    if (!todoValue) return;

    if (editTodoId !== null) {
        todos = todos.map((todo) => todo.id == editTodoId ? { ...todo, text: todoValue } : todo)
        editTodoId = null;
        addBtn.textContent ="Add"
       
        todoInput.value = "";
        saveTodo();


        rendertodo();

        updateCount();

        return;

    }




    let newTodo = {
        id: Date.now(),
        text: todoValue,
        isCompleted: false
    }



    todos.push(newTodo);
    addTodo(newTodo);
    updateCount();
    todoInput.value = "";

    saveTodo()

})


function addTodo(todo) {

    const listItem = document.createElement("li");
    listItem.classList = " flex  gap-5  bg-[#1f2329] p-4  rounded-lg";

    listItem.innerHTML = ` <div class="flex  flex-1 gap-2 ">
                        <input type="checkbox"  data-id ="${todo.id}" ${todo.isCompleted ? "checked" : ""}  class="accent-[#b6ff2e]" >
                        <p  class="font-vanguard font-bold text-md text-[#b6ff2e] capitalize py-1 ${todo.isCompleted ? "line-through opacity-50 text-red-400" : ""}" id="todo-msg"> ${todo.text}</p>
                    </div>
                    <div class="flex gap-3">
                        <button type ="button" data-action = "edit" data-id="${todo.id}" class="font-vanguard font-bold text-md text-[#b6ff2e] uppercase  border-[#b6ff2e] px-2 py-1 rounded-md border-2 cursor-pointer">Edit </button>
                        <button type="button" data-action = "delete" data-id="${todo.id}" class="font-vanguard font-bold text-md text-[#b6ff2e] uppercase  border-[#b6ff2e] px-2 py-1 rounded-md border-2 cursor-pointer">Delete</button>
                    </div>`


    todoList.append(listItem);
    

}

function rendertodo() {
    todoList.innerHTML = "";

    todos.forEach(function (todo) {
        addTodo(todo);
    }

    )



}

todoList.addEventListener("change", (e) => {

    const checkBox = e.target.closest('input[type="checkbox"]')
    if (checkBox) {
        const id = Number(checkBox.dataset.id)
        todos = todos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo, isCompleted: checkBox.checked
                }
            }
            return todo;


        })
        updateCount();
        rendertodo();
        saveTodo()



    }



})


todoList.addEventListener("click", (e) => {


    const deletebtn = e.target.closest("button")

    if (!deletebtn) return;

    if (deletebtn.dataset.action === "delete") {
        const id = Number(deletebtn.dataset.id);
        todos = todos.filter(todo => todo.id !== id);
        rendertodo()
        updateCount()
        saveTodo()
    }


})

todoList.addEventListener("click", (e) => {

    const editBtn = e.target.closest("button");
    if (!editBtn) return;

    const id = editBtn.dataset.id;
    const todo = todos.find(todo => todo.id == id);

    if (!todo) return;

    todoInput.value = todo.text;
    addBtn.textContent ="update"
    editTodoId = Number(id);
    saveTodo()

})

function updateCount() {
    taskCount.textContent = `TASK(${todos.length})`

    const completed = todos.filter(todo => todo.isCompleted).length;

    taskCompleteCount.textContent = `COMPLETED(${completed})`
  

}

updateCount();
rendertodo();














