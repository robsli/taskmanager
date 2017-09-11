(function () {
    
     let tasks = dataStorage.retrieveFromStorage();
     updateTaskTable();
  
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
     function Task (taskObject) {
         this.taskId = taskObject[0];
         this.name = taskObject[1];
         this.assignedTo = taskObject[2];
         this.createdDate = new Date();
         this.dueDate = new Date(taskObject[3]);
         this.status = 'assigned';
     };
  
     function createTask () {
         let taskName = document.getElementById('task-name').value;
         let assignedTo = document.getElementById('assigned-to').value;
         let dueDate = document.getElementById('due-date').value;
         let taskId = tasks.length;
         let task = new Task([taskId, taskName, assignedTo, dueDate]);
  
         return task;
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
         dataStorage.updateStorage(tasks);
         updateTaskTable();
         console.log(tasks);
     }
  
     function addEventListeners (incompleteTasks) {
         for (task in incompleteTasks) {
             let currTaskId = incompleteTasks[task].taskId;
             document.getElementById('action-task' + currTaskId).addEventListener("click", function() {
                 completeTask(currTaskId);
             });
         }
     }
  
     function updateTaskTable () {
  
         let incompleteTasks = tasks.filter(task => {
             return task.status === 'assigned';
         })
  
         let taskHTMLText = (incompleteTasks.map(task => {
             let actionButton = "<button type='button' class='btn btn-success' id='action-task" + task.taskId + "'>Complete</button>";
            
             return ("<tr><td>" + task.name +
                     "</td><td>" + task.assignedTo +
                     "</td><td>" + (task.createdDate.getMonth()+1) + "/" + task.createdDate.getDate() + "/" + task.createdDate.getFullYear() +
                     "</td><td>" + (task.dueDate.getMonth()+1) + "/" + task.dueDate.getDate() + "/" + task.dueDate.getFullYear() +
                     "</td><td>" + task.status +
                     "</td><td>" + actionButton +
                     "</td></tr>");
         })).reduce((a, b) => {
             return a + b;
         }, "");
         document.getElementById('task-table').innerHTML = taskHTMLText;
  
         addEventListeners(incompleteTasks);
     }
 }());