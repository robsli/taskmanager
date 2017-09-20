(function () {
    
    let tasks = dataStorage.retrieveFromStorage();
    if (tasks !== null) {updateTaskTable();}

    /* Object structure:
        - Task ID
        - Task name
        - Assigned to
        - Created date
        - Due Date
        - Status: ['assigned', 'pending', 'complete']
    */

    document.getElementById('create-task').addEventListener("click", function() {
        if (formValidation.validateCreateNewTask()) {
            let newTask = createTask();
            updateTaskList(newTask);
            updateTaskTable();
        } else {
        }
    });

    // Task Constructor: takes in array with 3 arguments
    // function Task (taskObject) {
    //     this.taskId = taskObject[0];
    //     this.name = taskObject[1];
    //     this.assignedTo = taskObject[2];
    //     this.dueDate = new Date(taskObject[3]);
    //     this.status = taskObject[4];
    //     this.createdDate = new Date();
    //     this.lastUpdated = new Date();
    // };

    function createTask () {
        let taskName = document.getElementById('task-name').value;
        let assignedTo = document.getElementById('assigned-to').value;
        let dueDate = new Date(document.getElementById('due-date').value);
        let taskId = tasks.length;
        let status = 'assigned'

        return {
            taskId: taskId,
            name: taskName,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            createdDate: new Date(),
            lastUpdated: new Date()  
        };
    };

    function updateTaskList (task) {
        if (tasks[task.taskId] === undefined) {
            tasks.push(task);
        } else {
            tasks[task.taskId] = task;
        };
        dataStorage.updateStorage(tasks);
    }

    function completeTask (taskId) {
        tasks[taskId].status = 'complete';
        tasks[taskId].lastUpdated = new Date();
        dataStorage.updateStorage(tasks);
        updateTaskTable();
    }
  
    function addEventListeners (filteredTasks) {
        for (task in filteredTasks) {
            let currTaskId = filteredTasks[task].taskId;
            document.getElementById('edit-task' + currTaskId).addEventListener("click", function () { editTask(currTaskId); });
            if (filteredTasks[task].status === 'assigned') {
                document.getElementById('complete-task' + currTaskId).addEventListener("click", function () { completeTask(currTaskId); });
            }
        }
    }

    document.getElementById('assigned-tasks').addEventListener("click", function () { updateTaskTable('assigned'); });
    document.getElementById('completed-tasks').addEventListener("click", function () { updateTaskTable('complete'); });
    document.getElementById('all-tasks').addEventListener("click", function () { updateTaskTable('all'); });

    function updateTaskTable (status) {
        let filter = (status === undefined) ? 'assigned' : status;   
        let filteredTasks = (filter !== 'all') ? tasks.filter(task => { return task.status === filter; }) : tasks.filter(task => { return task.status !== 'archived'; });

        let currentTaskTable = (filteredTasks.map(task => {
                
            let editButton = "<button type='button' class='btn btn-outline-info' data-toggle='modal' data-target='#editModal' id='edit-task" + task.taskId + "'>Edit</button> ";
            let completeButton = (task.status === 'assigned') ?
                    "<button type='button' class='btn btn-outline-success' id='complete-task" + task.taskId + "'>Complete</button>" :
                    "<button type='button' class='btn btn-outline-secondary' disabled>Completed</button>";
            
            return ("<tr><td>" + task.name +
                    "</td><td>" + task.assignedTo +
                    "</td><td>" + (task.createdDate.getMonth()+1) + "/" + task.createdDate.getDate() + "/" + task.createdDate.getFullYear() +
                    "</td><td>" + (task.dueDate.getMonth()+1) + "/" + (task.dueDate.getDate()+1) + "/" + task.dueDate.getFullYear() +
                    "</td><td>" + task.status +
                    "</td><td>" + editButton +
                    "</td><td>" + completeButton +
                    "</td></tr>");
        })).reduce((a, b) => {
            return a + b;
        }, "");

        document.getElementById('task-table').innerHTML = currentTaskTable;
        addEventListeners(filteredTasks);
    }

    function editTask(taskId) {
        // Set modal form values:
        document.getElementById('modal-task-name').value = tasks[taskId].name;
        document.getElementById('modal-assigned-to').value = tasks[taskId].assignedTo;
        document.getElementById('modal-due-date').value = tasks[taskId].dueDate.toISOString().split('T')[0];
        document.getElementById('modal-status').value = tasks[taskId].status;
        document.getElementById('modal-created-date').innerHTML = tasks[taskId].createdDate.toLocaleString('en-US');
        document.getElementById('modal-last-updated').innerHTML = tasks[taskId].lastUpdated.toLocaleString('en-US');
        document.getElementById('modal-task-id').innerHTML = taskId;
    }

    document.getElementById('modal-save-changes').addEventListener("click", function() {
        saveTask()
    });

    function saveTask() {
        if (formValidation.validateUpdateTask()) {
            let editingTaskId = document.getElementById('modal-task-id').innerHTML;
            let previousTaskVersion = tasks[editingTaskId];

            let updatedTaskVersion = {
                taskId: editingTaskId,
                name: document.getElementById('modal-task-name').value, 
                assignedTo: document.getElementById('modal-assigned-to').value, 
                dueDate: new Date(document.getElementById('modal-due-date').value),
                status: document.getElementById('modal-status').value,
                createdDate: new Date(document.getElementById('modal-created-date').innerHTML),
                lastUpdated: new Date()  
            };            
            tasks[editingTaskId] = updatedTaskVersion;
            dataStorage.updateStorage(tasks)
            updateTaskTable();
            $('#editModal').modal('hide');
        };
    }


    document.getElementById('modal-archive-task').addEventListener("click", function() {
        archiveTask(document.getElementById('modal-task-id').innerHTML)
    });
    function archiveTask(taskId) {
        tasks[taskId].status = 'archived';
        tasks[taskId].lastUpdated = new Date();
        dataStorage.updateStorage(tasks);
        updateTaskTable();
        $('#editModal').modal('hide');
    }
}());