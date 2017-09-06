
    let tasks = [];
    
    /* Object structure:
        - Task name
        - Assigned to
        - Status: ['assigned', 'pending', 'complete']
        - Created date
        - Due Date
    */
    

    // let createTaskButton = document.getElementById('createTask');
    // if(createTaskButton) {
    //     createTaskButton.addEventListener("click", createTask, false);
    // }

    // Task Constructor: takes in array with 3 arguments
    function Task (taskObject) {
        this.name = taskObject[0];
        this.assignedTo = taskObject[1];
        this.status = 'assigned';
        this.createdDate = new Date();
        this.dueDate = new Date(taskObject[2]);
    };

    function createTask () {
        console.log('In createTask() function');
        let taskName = document.getElementById('task-name').value;
        let assignedTo = document.getElementById('assigned-to').value;
        let dueDate = document.getElementById('due-date').value;

        let task = new Task([taskName, assignedTo, dueDate]);
        console.log(task);
        tasks.push(task);
        console.log(tasks);
    };
