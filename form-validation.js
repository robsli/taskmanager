let formValidation = function () {
    
       document.getElementById('task-name').addEventListener('focusout', validateTaskName);
       document.getElementById('assigned-to').addEventListener('focusout', validateAssignedTo);
       document.getElementById('due-date').addEventListener('focusout', validateDueDate);
    
       function validateTaskName () {
           let taskNameError = document.getElementById('task-name-error');
          
           if (document.getElementById('task-name').value === "") {
               taskNameError.innerHTML = "Task name cannot be left blank.";
           } else {
               taskNameError.innerHTML = "";
               taskNameError.className = "";
           }
       }
    
       function validateAssignedTo () {
           let assignedToError = document.getElementById('assigned-to-error');
    
           if (document.getElementById('assigned-to').value === "") {
               assignedToError.innerHTML = "Assigned to field cannot be left blank.";
           } else {
               assignedToError.innerHTML = "";
               assignedToError.className = "";
           }
       }
    
       function validateDueDate () {
           let dueDateError = document.getElementById('due-date-error');
    
           if (document.getElementById('due-date').value === "") {
               dueDateError.innerHTML = "Due date cannot be left blank.";
           } else {
               dueDateError.innerHTML = "";
               dueDateError.className = "";
           }
       }
    
       function validateCreateNewTask () {
          
           if (document.getElementById('task-name').value === "") { validateTaskName(); }
           if (document.getElementById('assigned-to').value === "") { validateAssignedTo(); }
           if (document.getElementById('due-date').value === "") { validateDueDate(); }
    
           if (document.getElementById('task-name').value === "" || document.getElementById('assigned-to').value === "" || document.getElementById('due-date').value === "") {
               return false;
           } else { return true;}
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
           validateCreateNewTask : validateCreateNewTask
       }
    
   }();