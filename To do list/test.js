function dispData() {

    const tittle = document.getElementById("tittle")
    tittle.textContent = "All Tasks"

    //get the tasks from the local storage...
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    //where the task will be displayed...
    const output = document.getElementsByClassName("box3")[0]

    //Clear the prevous tasks to avoid duplicates..
    output.innerHTML = ""

    //looping through each task and creating HTML for...
    tasks.forEach(function (taskData , index){

        const{task, description, datetimelocal} = taskData

        output.innerHTML += `
        <div class="info" data-index="${index}">
                            <fieldset>
                            <input type="checkbox" name="" id="checkbox">
    
                            <span class="text" id = "content">
                                <label for="checkbox" id="label">${task}</label>
    
                                <h4 style="float:right; margin-left:20px">${datetimelocal}</h4>
    
                                <p id="label">${description}</p>
                            </span>
                            </fieldset>
    
                            <div class="changes">
                                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="delete" id = "delete"><i class="fa-solid fa-trash"></i></button>
                            </div>
                         </div
        `
        
    })
}

function deleteTask() {
    const deleteButtons = document.querySelectorAll('.delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const parentElement = button.closest('.info');
                    const index = parentElement.getAttribute('data-index');  // Get task index

                    // Get the tasks from localStorage
                    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

                    // Remove the task at the specific index
                    tasks.splice(index, 1);

                    // Save the updated tasks back to localStorage
                    localStorage.setItem("tasks", JSON.stringify(tasks));

                    // Re-render the tasks
                    dispData();
                });
            });
}

function checked() {
    const checkboxes = document.querySelectorAll("#checkbox");
    const texts = document.querySelectorAll("#content");

// Make sure the number of checkboxes matches the number of texts
    if (checkboxes.length === texts.length) {
        checkboxes.forEach((checkbox, index) => {
            const text = texts[index]; // Get the corresponding text element based on index
            
            // Add an event listener to each checkbox
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    text.style.textDecoration = "line-through"; 
                } else {
                    text.style.textDecoration = "none"; 
                }
            });
        });
    } else {
        console.warn("Checkboxes and text elements do not match in number.");
    }
}

function editingData() {
    const edit = document.querySelectorAll(".edit")
    edit.forEach(edit => {
        edit.addEventListener("click", function () {
            const parentElement = edit.closest('.info')
            const index = parentElement.getAttribute("data-index")

        
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let taskData = tasks[index]

            if (taskData) {
                document.getElementById("task").value = taskData.task
                document.getElementById("description").value = taskData.description
                document.getElementById("date").value = taskData.datetimelocal
                document.getElementById("options").value = taskData.priority
            } else {
                console.error("task not gotten")
            }
            
            const form = document.querySelector(".Form-popup");
            form.style.visibility = "visible";

            window.editingTaskIndex = index;
        
                    })
                    
                })

            // Handle form submission (saving changes)
            document.getElementById("taskform").addEventListener("submit", function () {

            // Get the updated task values from the form
            const updatedTask = document.getElementById("task").value;
            const updatedDescription = document.getElementById("description").value;
            const updatedDate = document.getElementById("date").value;
            const updatedPriority = document.getElementById("options").value;

            // Fetch tasks from localStorage
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            // Check if editingTaskIndex is valid
            if (window.editingTaskIndex !== undefined && tasks[window.editingTaskIndex]) {
                // Update the task at the selected index
                tasks[window.editingTaskIndex].task = updatedTask;
                tasks[window.editingTaskIndex].description = updatedDescription;
                tasks[window.editingTaskIndex].datetimelocal = updatedDate;
                tasks[window.editingTaskIndex].priority = updatedPriority;

                // Save the updated tasks back to localStorage
                localStorage.setItem("tasks", JSON.stringify(tasks));

                // Close the form
                const form = document.querySelector(".Form-popup");
                form.style.visibility = "hidden";

                // Update the displayed task data (you could refresh the UI or update directly)
                const taskElement = document.querySelector(`[data-index="${window.editingTaskIndex}"]`);
                if (taskElement) {
                    taskElement.querySelector(".task-name").innerHTML = updatedTask;
                    taskElement.querySelector(".task-description").innerHTML = updatedDescription;
                    taskElement.querySelector(".task-date").innerHTML = updatedDate;
                    taskElement.querySelector(".task-priority").innerHTML = updatedPriority;
                }

                // Clear the global index after the update
                window.editingTaskIndex = undefined;
            } else {
                console.error("No task found for editing.");
            }
            }); 
}

//displaying the form//
document.querySelector("#addtask").addEventListener("click", function () {
    const form = document.querySelector(".Form-popup")
    form.style.visibility = "visible"
})

 //hiding the form when cancelled...
 document.getElementById("Cancel").addEventListener("click", function () {
    const form = document.querySelector(".Form-popup")
    form.style.visibility = "hidden"
})

// collecting data...
document.querySelector("#taskform").addEventListener("submit", function (event) {

    event.preventDefault()

   // Get the updated task data from the form
   let updatedTask = document.getElementById("task").value;
   let updatedDescription = document.getElementById("description").value;
   let updatedDate = document.getElementById("date").value;
   let updatedPriority = document.getElementById("options").value;

   // Fetch tasks from localStorage
   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

   if (window.editingTaskIndex !== undefined) {
    // If we're editing, update the task at the specified index
    tasks[window.editingTaskIndex] = {
        task: updatedTask,
        description: updatedDescription,
        datetimelocal: updatedDate,
        priority: updatedPriority
    };

    // Clear the editing index after the task has been updated
    window.editingTaskIndex = undefined;
    } else {
    // If we're adding a new task, create a new task object
    let newTask = {
        task: updatedTask,
        description: updatedDescription,
        datetimelocal: updatedDate,
        priority: updatedPriority
    };

    // Add the new task to the array
    tasks.push(newTask);
    }
    // Save the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the form fields after submission
    document.getElementById("taskform").reset();


     //clearing the form and making it hidden..
    document.getElementById("taskform").reset();
    const form = document.querySelector(".Form-popup")
    form.style.visibility = "hidden"

    dispData() 
    checked()
})

//ALL TASKS BUTTON....
document.getElementById("All Task").addEventListener("click", function (params) {
    const tittle = document.getElementById("tittle")
    tittle.textContent = "All Tasks"

    dispData()
    checked()
    editingData()
    deleteTask()

})        

//IMPORTANT BUTTON.
document.getElementById("Important").addEventListener("click", function (params) {
    const tittle = document.getElementById("tittle")
    tittle.textContent = "Important"

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let importantTasks = tasks.filter(task => task.priority == 1);

    const output = document.getElementsByClassName("box3")[0]
    output.innerHTML = ""

    importantTasks.forEach(function (taskData, index) {
        const { task, description, datetimelocal } = taskData;

        output.innerHTML += `
        <div class="info" data-index="${index}">
            <fieldset>
                <input type="checkbox" name="" id="checkbox">
                <span class="text" id="content">
                    <label for="checkbox" id="label">${task}</label>
                    <h4 style="float:right; margin-left:20px">${datetimelocal}</h4>
                    <p id="label">${description}</p>
                </span>
            </fieldset>

            <div class="changes">
                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete" id="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;
    });

    checked()
    editingData()
    deleteTask()
})

document.addEventListener("DOMContentLoaded", dispData) 
 //COMPLETED TASKS ....
 /*
 document.getElementById("Finished").addEventListener("click", function () {
    const tittle = document.getElementById("tittle")
    tittle.textContent = "Important"

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let completedTasks = tasks.filter(task => task.completed === true);

    // Get the container where tasks will be displayed
    const output = document.getElementsByClassName("box3")[0];
    output.innerHTML = ""; // Clear any previous content

    // Loop through each completed task and create the HTML
    completedTasks.forEach(function (taskData, index) {
        const { task, description, datetimelocal, completed } = taskData;

        output.innerHTML += `
        <div class="info" data-index="${index}">
            <fieldset>
                <input type="checkbox" id="checkbox"  data-index="${index}" ${completed ? 'checked' : ''}>
                <span class="text" id="content">
                    <label for="checkbox" id="label">${task}</label>
                    <h4 style="float:right; margin-left:20px">${datetimelocal}</h4>
                    <p id="label">${description}</p>
                </span>
            </fieldset>

            <div class="changes">
                <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete" id="delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `;
    });

    // Handle checkbox state changes (to toggle completed status)
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const index = checkbox.getAttribute('data-index'); // Get the correct task index
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks[index].completed = checkbox.checked; // Update the completed status
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated task data

            // Re-render the tasks to reflect the checkbox change
            document.getElementById("Finished").click(); // Trigger the click to re-display completed tasks
        });
    });
}) */


















