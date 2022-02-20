import TodoApi from "./TodoApe.js"

const btn = document.querySelector('#btn');
const todoList = document.querySelector('#todolist');
const writeMission = doucument.querySelector('#mission');
const todoItemTemplate = document.querySelector('#todoItemTemplate');


btn.addEventListener('click', onBtnClick);
todoList.addEventListener('click', onListClick);

init();

function init() {
    TodoApi
        .getList()
        .then(renderTodoList)
        .catch(handleError);
}

function onBtnClick() {
    const mission = getMission();

    if (!isMessageValid(mission)) {
        alert('Поле не должно быть пустым')
        return;
    }

    addTodoItem(mission);
    clear();
}

function onListClick(e) {
    const todoItem = e.target.closest('.todoItem');

    if (todoItem) {
        if (e.target.classList.contains('.deleteBtn')) {
            removeTodo(todoItem)
            return
        }

        e.target.classList.toggle('done');
    }
}

function removeTodo(todoEl) {
    const id = getTodoElId(el);

    TodoApi.delete(id)
    todoEl.remove();
}

function getTodoElId(el) {
    return el.dataset.id;
}

function getMission() {
    return writeMission.value;
}

function isMessageValid(mission) {
    return mission.trim() !=='';
}

function addTodoItem(mission) {
    TodoApi.create({})
}

function renderTodoItem(mission) {
    const todoItemHTML = todoItemTemplate.replace(`{{message}}`, mission);

    todoList.insertAdjacentHTML(`beforeend`, todoItemHTML);
}

function renderTodoList(todoList) {
    const html = todoList.map(genereteTodoHTML).join('');

    todoList.insertAdjacentHTML(`beforeend`, html);
}

function renderTodo(mission) {
    const html = genereteTodoHTML(mission);

    list.insertAdjacentHTML(`beforeend`, html);
}

function
 genereteTodoHTML(mission) {
     return todoItemTemplate
     .replace(`{{id}}`, mission)
     .replace(`{{name}}`, mission.name);
 }

 function handleError(e) {
     alert(e.message);
 }

function clear() {
    writeMission.value = '';
}