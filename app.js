const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let currentUser = localStorage.getItem("currentUser");
const clearBtn = document.getElementById("clearTasksBtn");

if(!currentUser)
{
    window.location.href = "index.html";
}

document.querySelector("h1").textContent = `Hello, ${currentUser}`;
loadTasks();

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
});

//daily tasks
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        addTask();
    }
});

function addTask()
{
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function(){
        li.classList.toggle("done");
        saveTasks();
        updateAIInsight();
    });

    const dot = document.createElement("span");
    dot.classList.add("priority-dot");

    const textLower = taskText.toLowerCase();

    if(textLower.includes("exam") || textLower.includes("quiz") || textLower.includes("assignment"))
    {
        dot.style.backgroundColor = "#ef4444";
    }
    else if(textLower.includes("review") || textLower.includes("practice"))
    {
        dot.style.backgroundColor = "#f59e0b";
    }
    else
    {
        dot.style.backgroundColor = "#22c55e";
    }

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent = taskText;

    li.appendChild(checkbox);
    li.appendChild(dot);
    li.appendChild(text);

    taskList.appendChild(li);

    //clear textarea
    taskInput.value= "";
    taskInput.focus();

    saveTasks();
    updateAIInsight();
}

if(clearBtn){
clearBtn.addEventListener("click", ()=>{
    if(!confirm("Are you sure you want to clear all tasks?")) return;

    localStorage.removeItem(`tasks_${currentUser}`);

    taskList.innerHTML = "";

    saveTasks();
    updateAIInsight();
})
}
function updateAIInsight(){
    const tasks = document.querySelectorAll("#taskList li");
    const doneTasks = document.querySelectorAll("#taskList li.done");

    const total = tasks.length;
    const completed = doneTasks.length;
    const pending = total - completed;

    const highPriorityPending = Array.from(tasks).filter(task =>{
        return (
            !task.classList.contains("done") &&
            task.querySelector(".priority-dot").style.backgroundColor === "rgb(239, 68, 68)"
        );
    }).length;

    const aiMessage = document.getElementById("aiMessage");

    if(total === 0)
    {
        aiMessage.textContent = "Start by adding your study tasks. I'll help you plan smart sessions.";

    }
    else if(highPriorityPending >= 3)
    {
        aiMessage.innerHTML =
        "You have multiple high-priority tasks. Try a <b>45-minute deep focus session</b> now.";
    }
    else if(pending >= 5)
    {
        aiMessage.innerHTML = 
        "Your task list is getting long. Use the <b>Pomodoro technique (25-5)</b> to stay productive.";
    }
    else if(completed === total && total > 0)
    {
        aiMessage.innerHTML =
        "Great job!! 🎉, All tasks completed. Take a <b>break</b> to recharge.";
    }
    else
    {
        aiMessage.innerHTML = 
        "You're making steady progress. Complete one more task to maintain momentum.";
    }
}

function saveTasks()
{
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push({
            text: li.querySelector(".task-text").textContent,
            done: li.classList.contains("done"),
            priority: li.querySelector(".priority-dot").style.backgroundColor
        });

    });

    localStorage.setItem(
        `tasks_${currentUser}`,
        JSON.stringify(tasks)
    );
}

function loadTasks()
{
    const saved =
        JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];

    saved.forEach(task => {

        const li = document.createElement("li");
        li.classList.add("task-item");

        if(task.done)
        {
            li.classList.add("done");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", function(){
            li.classList.toggle("done");
            saveTasks();
            updateAIInsight();
        });

        const dot = document.createElement("span");
        dot.classList.add("priority-dot");
        dot.style.backgroundColor = task.priority;

        const text = document.createElement("span");
        text.classList.add("task-text");
        text.textContent = task.text;

        li.appendChild(checkbox);
        li.appendChild(dot);
        li.appendChild(text);

        taskList.appendChild(li);
    });

    updateAIInsight();
}

