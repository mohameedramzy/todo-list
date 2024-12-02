var taskInput = document.getElementById("newTask")
var addTaskBtn = document.getElementById("add")
var updateTaskBtn = document.getElementById("update")
var updatedIndex;
var taskContainer = []

if (localStorage.getItem("userTask") !== null) {
    taskContainer = JSON.parse(localStorage.getItem("userTask"))
    displayTask()
}


function addTask() {
    var taskInfo = taskInput.value
    if (taskInfo) {
        taskContainer.push(taskInfo)
        localStorage.setItem("userTask", JSON.stringify(taskContainer))
        console.log(taskContainer);
        displayTask()
        taskInput.value = ""
    } else {
        alert("Task Input Cannot be Empty! 🛑")
    }
}

function displayTask() {
    var taskBox = ""
    if (taskContainer.length == 0) {
        document.getElementById("allTasks").innerHTML = `
        <tr>
        <td colspan="4" class="fw-bold">Task List is Empty!</td>
        </tr>
        `
    } else {
        for (var i = 0; i < taskContainer.length; i++) {
            taskBox += `
                    <tr class="fw-normal">
                        <td>
                            ${i + 1}
                        </td>
                        <td>
                            <span id="done" >${taskContainer[i]}</span>
                        </td>
                        <td>
                            <a style="cursor: pointer;" class="update" onclick="getTaskToUpdate(${i})"><i
                                    class="fas fa-pen-to-square fa-lg text-warning me-3"></i></a>
                        </td>
                        <td>
                            <a style="cursor: pointer;" class="delete" onclick="deleteTask(${i})"><i
                                    class="fas fa-trash-alt fa-lg text-danger"></i></a>
                        </td>
                       
                    </tr>
        `
        }
        document.getElementById("allTasks").innerHTML = taskBox;
    }

}


function deleteTask(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            taskContainer.splice(index, 1)
            console.log(taskContainer);
            localStorage.setItem("userTask", JSON.stringify(taskContainer))
            displayTask()
        }
    });

}

function getTaskToUpdate(i) {
    console.log(taskContainer[i]);
    addTaskBtn.classList.add("d-none")
    updateTaskBtn.classList.remove("d-none")
    taskInput.value = taskContainer[i]
    updatedIndex = i
}

function updateTask() {
    addTaskBtn.classList.remove("d-none")
    updateTaskBtn.classList.add("d-none")
    taskContainer[updatedIndex] = taskInput.value
    localStorage.setItem("userTask", JSON.stringify(taskContainer))
    taskInput.value = ""
    displayTask()
}

// function doneTask() {
//     document.getElementById("done").classList.add("text-decoration-line-through")

// }






