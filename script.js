const todoListElem = document.getElementById('items-list');
const todoInputTextElem = document.getElementById('todoItemName');
const addBtnElem = document.getElementById('addBtn');
const colorInputElem = document.getElementById('colorInput');
const getFileElem = document.getElementById('getFile');

addBtnElem.addEventListener('click', (event) => {
    addTodoItem();
});

todoListElem.addEventListener('click', function (event) {
    removeSelectedItem(event);
});

document.getElementById('exportBtn').addEventListener('click', (event) => {
    exportTodoList();
});

document.getElementById('importBtn').addEventListener('click', (event) => {
    getFileElem.click();
});

getFileElem.addEventListener('change', (event) => {
    importTodoList();
})


/* DECLARATIONS */

function addTodoItem() {
    if (!todoInputTextElem.value) {
        alert('Cannot add empty TODO task.');
        return;
    }

    addTodoItemToList(todoInputTextElem.value, colorInputElem.value);
}

function addTodoItemToList(text, color) {
    const todoItem = document.createElement('div');

    todoItem.innerText = text;
    todoItem.classList.add('todo-item');
    todoItem.style = `background-color: ${color};`

    todoListElem.append(todoItem);
}

function removeSelectedItem(event) {
    if (event.target.id == 'items-list') return;

    if (confirm('Do You want to delete this task?')) {
        todoListElem.removeChild(event.target);
    }
}

function exportTodoList() {
    const todoItems = todoListElem.children;
    const exportList = [];

    for (let item of todoItems) {
        exportList.push(new TodoNote(item.innerText, item.style.backgroundColor));
    }

    const exportString = JSON.stringify(exportList);
    downloadFile(exportString, 'todoList.json', 'application/json');
}

function importTodoList() {
    const selectedFile = getFileElem.files[0];
    readFile(selectedFile);
}

function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('loadend', () =>{
        todoListElem.innerHTML = "";
        for (let item of JSON.parse(reader.result)) {
            addTodoItemToList(item.text, item.color);
        }
    });
    reader.readAsText(file);
}

function downloadFile(content, fileName, type) {
    const exportBlob = new Blob([content], {type: type});

    const url = window.URL.createObjectURL(exportBlob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;

    anchor.click();
    window.URL.revokeObjectURL(url);
    document.delete
}

class TodoNote {
    constructor(text, color) {
        this.text = text;
        this.color = color;
    }
}