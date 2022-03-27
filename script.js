import TodoApi from "./TodoApi.js";

const REMOVE_BTN_CLASS = 'remove-button';
const DONE_CLASS = 'done';
const TODO_ITEM_CLASS = 'todo-item';

const list = document.querySelector('.todo-list');
const input = document.querySelector('.message-input');
const todoForm = document.querySelector('#todoForm');
const todoTemplateHTML = document.querySelector('#newTaskTemplate').innerHTML;

todoForm.addEventListener('submit', onTodoFormSubmit);
list.addEventListener('click', onTodoListClick);

init();

function init() {
    TodoApi.getList()
        .then(renderTodoList)
        .catch(handleError);
}

function onTodoFormSubmit(e) {
    e.preventDefault();

    if (!isValid(input.value)) {
        alert('Поле сообщение не должно быть пустым');
        return;
    }

    TodoApi
        .create({ status: false, title: input.value })
        .then((todo) => {
            renderTodo(todo);
            clear();
        })
        .catch(handleError);
}

function onTodoListClick(e) {
    const todoEl = getTodoElement(e.target);
    const classList = e.target.classList;

    if (todoEl) {
        if (classList.contains(REMOVE_BTN_CLASS)) {
            removeTodo(todoEl);
        }
        if (classList.contains(TODO_ITEM_CLASS)) {
            toggleDone(todoEl);
        }
    }
}

function getTodoElement(target) {
    return target.closest('.' + TODO_ITEM_CLASS);
}

function isValid(message) {
    return message !== '';
}

function renderTodoList(todoList) {
    const html = todoList.map(generateTodoHTML).join('');

    list.insertAdjacentHTML('beforeend', html);
}

function renderTodo(todo) {
    const html = generateTodoHTML(todo);

    list.insertAdjacentHTML('beforeend', html);
}

function generateTodoHTML(todo) {
    const done = todo.status ? DONE_CLASS : '';

    return todoTemplateHTML
        .replace('{{id}}', todo.id)
        .replace('{{status}}', todo.status)
        .replace('{{title}}', todo.title)
        .replace('{{done}}', done)
        ;
}

function removeTodo(el) {
    const id = getTodoElId(el);

    TodoApi
        .delete(id)
        .catch(handleError);
    el.remove();
}

function toggleDone(el) {
    const id = getTodoElId(el);
    const status = el.dataset.status !== 'true';

    TodoApi
        .update(id, { status })
        .catch(handleError);

    el.classList.toggle(DONE_CLASS);
}

function getTodoElId(el) {
    return el.dataset.id;
}

function clear() {
    input.value = '';
}

function handleError(e) {
    alert(e.message);
}