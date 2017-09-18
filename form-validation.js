let formValidation = function () {
    
       document.getElementById('task-name').addEventListener('focusout', function () { validateTaskName(document.getElementById('task-name'), document.getElementById('task-name-error')); });
       document.getElementById('assigned-to').addEventListener('focusout', function () { validateAssignedTo(document.getElementById('assigned-to'), document.getElementById('assigned-to-error')); });
       document.getElementById('due-date').addEventListener('focusout', function () { validateDueDate(document.getElementById('due-date'), document.getElementById('due-date-error')); });
    
       document.getElementById('modal-task-name').addEventListener('focusout', function () { validateTaskName(document.getElementById('modal-task-name'), document.getElementById('modal-task-name-error')); });
       document.getElementById('modal-assigned-to').addEventListener('focusout', function () { validateAssignedTo(document.getElementById('modal-assigned-to'), document.getElementById('modal-assigned-to-error')); });
       document.getElementById('modal-due-date').addEventListener('focusout', function () {validateDueDate(document.getElementById('modal-due-date'), document.getElementById('modal-due-date-error')); });


       function validateTaskName (taskName, taskNameError) {
           if (taskName.value === "") {
               taskNameError.innerHTML = "Please enter a task name.";
           } else {
               taskNameError.innerHTML = "";
               taskNameError.className = "";
           }
       }
    
       function validateAssignedTo (assignedTo, assignedToError) {
           if (assignedTo.value === "") {
               assignedToError.innerHTML = "Please assign this task to someone.";
           } else {
               assignedToError.innerHTML = "";
               assignedToError.className = "";
           }
       }
    
       function validateDueDate (dueDate, dueDateError) {
           if (dueDate.value === "") {
               dueDateError.innerHTML = "Please enter a due date.";
        //    } else if (Date(document.getElementById('due-date').value) < Date()) {
        //        dueDateError.innerHTML = "Please enter a due date in the future.";
           } else {
               dueDateError.innerHTML = "";
               dueDateError.className = "";
           }
       }
    
       function validateCreateNewTask () {
          
           validateTaskName(document.getElementById('task-name'), document.getElementById('task-name-error'));
           validateAssignedTo(document.getElementById('assigned-to'), document.getElementById('assigned-to-error'));
           validateDueDate(document.getElementById('due-date'), document.getElementById('due-date-error'));
    
           return (document.getElementById('task-name').value === "" || document.getElementById('assigned-to').value === "" || 
                   document.getElementById('due-date').value === "") ? false : true;
       }

       function validateUpdateTask () {

            validateTaskName(document.getElementById('modal-task-name'), document.getElementById('modal-task-name-error'));
            validateAssignedTo(document.getElementById('modal-assigned-to'), document.getElementById('modal-assigned-to-error'));
            validateDueDate(document.getElementById('modal-due-date'), document.getElementById('modal-due-date-error'));
    
            return (document.getElementById('modal-task-name').value === "" || document.getElementById('modal-assigned-to').value === "" || 
                    document.getElementById('modal-due-date').value === "") ? false : true;
       }
    
       // Enter Enter key (13) pressed:
       document.getElementById('task-name').addEventListener("keyup", function(event) {
           if (event.keyCode === 13) document.getElementById('create-task').click();
       });
    
       document.getElementById('assigned-to').addEventListener("keyup", function(event) {
           if (event.keyCode === 13) document.getElementById('create-task').click();
       });
    
       document.getElementById('due-date').addEventListener("keyup", function(event) {
           if (event.keyCode === 13) document.getElementById('create-task').click();
       });
    
       return {
           validateCreateNewTask : validateCreateNewTask,
           validateUpdateTask: validateUpdateTask
       }
    
   }();