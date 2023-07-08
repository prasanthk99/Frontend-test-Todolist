// Initialize variable and assigning value
let index = 0;
let arrayList = [];
let todoLists = document.getElementById('todo-lists-block');
let inputBtn = document.getElementById('input-btn');
let inputtxt = document.querySelector('.input-field input');
let taskLeft = document.querySelector('.todo-lists-bottom-ctn p');

// add list Clicking on add icon
inputBtn.addEventListener('click',addList);


// event to show and hide add icon beside input field
inputtxt.addEventListener('keydown',function(event){
    document.querySelector('.fa-regular.fa-square-plus').classList.remove("hide");
    if(event.key==="Enter"){
        addList();
    }
    if(inputtxt.value===""){
        document.querySelector('.fa-regular.fa-square-plus').classList.add("hide");
    }
})


// will check the List is Empty or not
function isEmpty(){
    return arrayList.length==0;
}


// Function to add TodoList 

function addList(){
    inputtxt = document.querySelector('.input-field input');
    if(inputtxt.value!=""){
        let todoList = `<div class="todo-lists todo-${index}">
        <div>
            <input data-type-Id="${index}" class="checkBox clickable" type="checkbox"/>
            <h3>${inputtxt.value}</h3>
        </div>
        <i class="fa-regular fa-circle-xmark clickable" onClick="deleteList(${index})"></i>
        </div>`;
        
        arrayList.push({
            id:index,
            value:todoList
        });

        taskLeft.innerHTML = `${arrayList.length} tasks left`;
        render();
        inputtxt.value="";
        index ++;
    }
    document.querySelector('.fa-regular.fa-square-plus').classList.add("hide");
}


// Function to Delete todoList

function deleteList(index){
    arrayList = arrayList.filter(function(values){
        return values.id!=index;
    });
    render();
    if(isEmpty()){
        todoLists.innerHTML = "<p style='text-align:center'>List is Empty !!!</p>";
    };
    taskLeft.innerHTML = `${arrayList.length} tasks left`;
}


let checkBox = document.getElementsByClassName("checkBox");
function completeAlltasks(){
    for(let i=0;i<checkBox.length;i++){
        checkBox[i].checked=true;
    }
}


// Function to clear the completed tasks

function clearCompleted(){
    let CompletedListIds = [];
    for(let i=0;i<checkBox.length;i++){
        if(checkBox[i].checked==true){
            CompletedListIds.push(checkBox[i].dataset.typeId);
        }    
    }
    CompletedListIds.forEach(val=>deleteList(val));
}



// Rerender the todoLists if the modification happen

function render(){
    todoLists.innerHTML = '';
    arrayList.forEach(function(element){
        todoLists.innerHTML += element.value;
    })
}

// Function call when loading the script

(function intiator(){
    if(isEmpty()){
        todoLists.innerHTML = "<p style='text-align:center'>List is Empty !!!</p>";
    };
    document.querySelector('.fa-regular.fa-square-plus').classList.add("hide");
})();