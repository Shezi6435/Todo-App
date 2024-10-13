const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progress-bar");
const clearAllBtn = document.getElementById("clearAllBtn");

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        taskList.appendChild(li);
        
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData(); 
    updateProgress();
}

taskList.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); 
        saveData(); 
        updateProgress();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); 
        saveData(); 
        updateProgress();
    }
}, false);

taskList.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI") {
        let currentTask = e.target.innerText.slice(0, -1);  
        let newTask = prompt("Edit your task:", currentTask);  
        if (newTask !== null && newTask.trim() !== '') {
            e.target.childNodes[0].nodeValue = newTask;
            saveData();
            updateProgress();
        }
    }
});

clearAllBtn.addEventListener("click", () => {
    taskList.innerHTML = '';
    totalTasks = 0;
    completedTasks = 0;
    saveData();
    updateProgress();
});


function saveData() {
    localStorage.setItem("data", taskList.innerHTML); 
}

function showData() {
    taskList.innerHTML = localStorage.getItem("data"); 
}
showData(); 
updateProgress();

function updateProgress() {
    let tasks = document.querySelectorAll("#taskList li");
    let completedTasks = document.querySelectorAll("#taskList li.checked");
    
    let totalTasks = tasks.length;
    let doneTasks = completedTasks.length;
    
    let progress = totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100;
    
    progressBar.style.width = progress + "%";
    progressBar.innerHTML = Math.round(progress) + "%";
}

function uploadProfilePicture() {
    const fileInput = document.getElementById('profilePic');
    const displayPic = document.getElementById('displayPic');
    
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;
            displayPic.src = imageSrc;
            localStorage.setItem('profileImage', imageSrc);
        };
        reader.readAsDataURL(file);
    }
}

function saveName() {
    const userName = document.getElementById('userName').value;
    localStorage.setItem('profileName', userName);
}

function loadProfile() {
    const savedImage = localStorage.getItem('profileImage');
    const savedName = localStorage.getItem('profileName');
    
    if (savedImage) {
        document.getElementById('displayPic').src = savedImage;
    }
    
    if (savedName) {
        document.getElementById('userName').value = savedName;
    }
}

window.onload = function() {
    loadProfile();
}

document.getElementById('userName').addEventListener('input', saveName);