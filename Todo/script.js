document.addEventListener("DOMContentLoaded",loadTasks);
document.getElementById("details").addEventListener("submit",function(event){
    event.preventDefault();
    let taskinput=document.getElementById("ta").value.trim();
    let category=document.getElementById("category").value;
    if(taskinput==="")
    {
        alert("Please enter a task");
        return;
    }
    addTaskDOM(taskinput,category,false);
    saveTask(taskinput,category,false);
    document.getElementById("ta").value="";
})
function addTaskDOM(task,category,iscompleted)
{
    let listitem=document.createElement("li");
    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=iscompleted;
    checkbox.addEventListener("change",()=>toggleCompletion(task));
    let tasktext=document.createElement("span");
    tasktext.innerHTML = ` ${task} - <strong>${category}</strong>`;
    if (iscompleted) tasktext.style.textDecoration = "line-through";
    let deletebutton=document.createElement("button");
    let space="";
    deletebutton.innerHTML="❌";
    let edi=document.createElement("button")
    edi.innerHTML="Edit";
    edi.onclick = () => {
        let newTask = prompt("Edit task:", task);
        if (newTask) {
            updateTask(task, newTask);
        }
    };
    deletebutton.onclick=()=>deleteTask(task);
    listitem.appendChild(checkbox);
    listitem.appendChild(tasktext);
    listitem.appendChild(edi);
    listitem.appendChild(deletebutton);
    listitem.setAttribute("data-category",category);
    if(category==="Urgent")
    {
        tasktext.style.color="red";
    }
    if(category==="Personal")
    {
        tasktext.style.color="darkviolet";
    }
    if(category==="Work")
    {
        tasktext.style.color="green";
    }
    document.getElementById("list").appendChild(listitem);
}
function saveTask(task,category,iscompleted)
{
    let tasks=JSON.parse(localStorage.getItem("tasks"))|| [];
    tasks.push({task,category,iscompleted});
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function loadTasks()
{
    let tasks=JSON.parse(localStorage.getItem("tasks"))|| [];
    tasks.forEach(taskobj => {
        addTaskDOM(taskobj.task,taskobj.category,taskobj.iscompleted)
    });
}
function updateTask(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskObj => {
        if (taskObj.task === oldTask) {
            taskObj.task = newTask; // Update task name
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("list").innerHTML="";
     loadTasks(); // Reload UI
}

function deleteTask(task)
{
    let tasks=JSON.parse(localStorage.getItem("tasks"))|| [];
    tasks=tasks.filter(taskobj=>taskobj.task!==task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    document.getElementById("list").innerHTML="";
    loadTasks();
}
function toggleCompletion(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskobj => {
        if (taskobj.task === task) {
            taskobj.iscompleted = !taskobj.iscompleted;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("list").innerHTML = ""; 
    loadTasks(); 
}
function filterTasks(category) {
    let items = document.querySelectorAll("#list li");
    items.forEach(item => {
        if (category === "all" || item.getAttribute("data-category") === category) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}
function Delteall()
{
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    localStorage.removeItem("tasks");
    document.getElementById("list").innerHTML="";

}