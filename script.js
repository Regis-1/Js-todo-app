let todoListElem = document.getElementById('items-list');
let todoInputTextElem = document.getElementById('todoItemName');
let addBtnElem = document.getElementById('addBtn');

addBtnElem.addEventListener('click', (event) => {
    addTodoItem();
})

todoListElem.addEventListener('click', function(event) {
    removeSelectedItem(event);
})

function addTodoItem() {
    if(!todoInputTextElem.value) {
        alert('Cannot add empty TODO task.');
        return;
    }

    let todoItem = document.createElement('div');

    todoItem.innerText = todoInputTextElem.value;
    todoItem.classList.add('todo-item');
    
    todoListElem.append(todoItem);
}

function removeSelectedItem(event) {
    if(confirm('Do You want to delete this task?')) {
        todoListElem.removeChild(event.target);
    }
}