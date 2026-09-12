// let todos = [];
// const todoForm = document.querySelector("#todo-form");
// const todoInput = document.querySelector("#todo-input");
// const todolist = document.querySelector("#todo-list")


// todoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const todoValue = todoInput.value
//     todos.push(newTodo)

//     let newTodo = {
//         id: Date.now()+1,
//         text: todoValue,
//         isCompleted: false
//     }
//     addTodo(newTodo)


// });

// function renderTodo() {
//     todos.forEach(function (todo) {
//         addTodo(todo)
//     })

// }

// renderTodo()

// function addTodo(todo) {
//     const li = document.createElement("li")
//     li.textContent = todo
//     todolist.append(li)
//     li.className = `flex  gap-2 border border-slate-400 p-4 rounded-lg mb-3 `
//     li.innerHTML = ` 
    
//                     <div class="flex  flex-1 gap-1 ">
//                         <input type="checkbox" data-id=${todo.id}>
//                         <p> ${todo.text}</p>
//                     </div>
//                     <div class="flex gap-2">
//                         <button data-action="edit" data-id=${todo.id}>Edit </button>
//                         <button data-action="delete" data-id=${todo.id}>Delete</button>
//                     </div>


                
// `
// }

// todolist.addEventListener("click", (e) => {

//     let btn = e.target.closest("button")
//     let action = btn?.dataset.action;
//     let id = btn?.dataset.id;
//     let checkbox = e.target.closest('input[type="checkbox"]')

//     if (checkbox) {
//         todos = todos.map((todo)=>{
//              if ((todo.id === Number(id))) {
//             return {
//                 ...todo,
//                 isCompleted:!todo.isCompleted
//             }
//         }
//         return todo


//         })

        

//     }
//     if (action === "delete") {
//         deleteTodo(e, id)
//         // renderTodo

//     }
//     if (checkbox){
//         todos
//     }



// })
// function deleteTodo(e, id) {
//     e.target.closest('li').remove()

//     todos = todos.filter((todo) => {
//         if ((todo.id !== Number(id))) {
//             return todo
//         }

//     })

// }

let todos = []; 
const todoForm = document.querySelector("#todo-form"); 
const todoInput = document.querySelector("#todo-input"); 
const todolist = document.querySelector("#todo-list");

todoForm.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const todoValue = todoInput.value.trim(); // trim() space hatane ke liye
    
    if (!todoValue) return; // Khali input submit na ho

    let newTodo = { 
        id: Date.now(), // Date.now() hi kaafi hai unique id ke liye
        text: todoValue, 
        isCompleted: false 
    };

    todos.push(newTodo); //  YAHAN Galti thi: Pehle aap sirf todoValue push kar rahe the
    addTodo(newTodo);
    todoInput.value = ""; // Input box ko khali karne ke liye
});

function renderTodo() { 
    todolist.innerHTML = ""; // Re-render se pehle list saaf karne ke liye
    todos.forEach(function (todo) { 
        addTodo(todo);
    });
} 

function addTodo(todo) { 
    const li = document.createElement("li");
    li.className = `flex gap-2 border border-slate-400 p-4 rounded-lg mb-3`; 
    
    // 🔴 li.textContent ko hataya kyunki innerHTML use niche overwrite kar raha tha
    li.innerHTML = ` 
        <div class="flex flex-1 gap-1 "> 
            <input type="checkbox" data-id="${todo.id}" ${todo.isCompleted ? 'checked' : ''}> 
            <p class="${todo.isCompleted ? 'line-through text-slate-400' : ''}"> ${todo.text}</p> 
        </div> 
        <div class="flex gap-2"> 
            <button data-action="edit" data-id="${todo.id}">Edit</button> 
            <button data-action="delete" data-id="${todo.id}">Delete</button> 
        </div> 
    `;
    todolist.append(li); 
} 

todolist.addEventListener("click", (e) => { 
    let btn = e.target.closest("button"); 
    let action = btn?.dataset.action; 
    let id = btn?.dataset.id || e.target.dataset.id; // ID handle karne ke liye
    
    // 🔴 Sahi selector use kiya checkbox ke liye
    let checkbox = e.target.closest('input[type="checkbox"]'); 

    if (checkbox) { 
        todos = todos.map((todo) => { 
            if (todo.id === Number(id)) { 
                return { ...todo, isCompleted: !todo.isCompleted }; 
            } 
            return todo; 
        });
        // Checkbox click hone par styling update karne ke liye re-render kr sakte hain
        renderTodo(); 
    } 

    if (action === "delete") { 
        deleteTodo(e, id); 
    } 
});

function deleteTodo(e, id) { 
    e.target.closest('li').remove(); 
    todos = todos.filter((todo) => todo.id !== Number(id)); 
}















