document.addEventListener("DOMContentLoaded", () => {
  // your code here
    


  const input = document.getElementById("new-task-description");
  const toDoList = document.getElementById("tasks");
  const form = document.getElementById("create-task-form");
  let divList = document.getElementById('list');
  const colors = ['red', 'yellow', 'green'];
  let deleteButton;
  let editButton;
  let list;
  let todoListArray = [];
  // let todoListArray = {};


  const color = {yellow : "#FFFF00", red : "#FF0000", green : "#00FF00"};
  // console.log(button[0].value)
  const select = document.createElement('select');
    select.setAttribute('name', 'priority');
    select.setAttribute('id', 'priority');
    for(let i=0; i < colors.length; i++){
      select.innerHTML += `<option value=${i}> ${colors[i]} </option>`
    }
    
  form.appendChild(select);
  
  form.addEventListener('submit', logSubmit, false);

  
  function logSubmit(event) {
    toDoList.innerText = "";
    inputValue = input.value 
    if (inputValue != ""){
      todoListArray.push([`${inputValue}`,  `${select.value}`]);
    }
    // todoListArray[`${inputValue}`] = `${select.value}`;
    // sort array here 
    sortArray();
    if (inputValue != "") {
      displayList();
    }
    
  
    deleteButton = document.getElementsByClassName('delete');
    editButton = document.getElementsByClassName('edit');
    list = document.querySelectorAll('li');

    for (let i=0; i < deleteButton.length; i++){
      deleteButton[i].addEventListener('click', () => {
        todoListArray.splice(i, 1);
        toDoList.removeChild(list[i]);
      });
      // remove from array
    } 

    for (let i=0; i < deleteButton.length; i++){
      editButton[i].addEventListener('click', () => {
        // create a form with an texfield input 
        // when this form is submitted, it should update the value of the list ...
        createEditForm(list[i].innerText.slice(0,-5));
      });
      
    } 
    event.preventDefault();
  }

  function displayList() {
    todoListArray.forEach(entry => {
      // Object.entries(todoListArray).forEach(entry => {
        const [key, value] = entry;
        let textColor = color[colors[parseInt(value)]];
        let list = listCreate(key, textColor);
        let button = buttonCreate('X', 'delete');
        let editbutton = buttonCreate('Edit', 'edit');
        
        list.appendChild(button);
        list.appendChild(editbutton);
        toDoList.appendChild(list);
      });
  }
  function sortArray() {
    todoListArray.sort( 
      (a, b) => {
      if (a[1] > b[1]) {
        return 1;
      };
      if (a[1] < b[1]){
        return -1;
      }
      return 0;
    }
    );
  }
  function buttonCreate(text, className) {
    let button = document.createElement('button');
    button.textContent = text;
    button.setAttribute('class', `${className}`);
    return button
  }

  function listCreate(text, textcolor){
    let list = document.createElement('li');
    list.textContent = text;
    list.style.color = `${textcolor}`;
    return list
  }

  function createEditForm(placeholder) {
    
    let form = document.createElement('form');
    let input = document.createElement('input');
    let submit = document.createElement('input');

    input.type = "text";
    input.placeholder = placeholder;
    input.id = 'edit_field';
    submit.type = 'submit';
    form.appendChild(input);
    form.appendChild(submit);
    divList.appendChild(form);
  }
});

