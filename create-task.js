
    let tasks = [];
    
    /* Object structure:
        - Task name
        - Assigned to
        - Status: ['assigned', 'pending', 'complete']
        - Created date
        - Due Date
    */
    
    window.onload = function() {
        document.getElementById('create-task').addEventListener("click", function() {
            let newTask = createTask();
            updateTable(newTask);
        });
    };


    // Task Constructor: takes in array with 3 arguments
    function Task (taskObject) {
        this.name = taskObject[0];
        this.assignedTo = taskObject[1];
        this.createdDate = new Date();
        this.dueDate = new Date(taskObject[2]);
        this.status = 'assigned';
    };

    function createTask () {
        let taskName = document.getElementById('task-name').value;
        let assignedTo = document.getElementById('assigned-to').value;
        let dueDate = document.getElementById('due-date').value;

        let task = new Task([taskName, assignedTo, dueDate]);

        return task;
    };

    function updateTable (newTask) {

        tasks.push(newTask)

        let tableBody = document.getElementById('task-table');
        let newRow = tableBody.insertRow();

        for (let i in newTask) {
            let newCell = newRow.insertCell(-1);
            let newElement = newCell.appendChild(document.createTextNode(newTask[i]));
        }


        console.log(tasks);
    }
