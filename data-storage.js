let dataStorage = function () {
    if (typeof(Storage) !== undefined) {

        function updateStorage (taskList) {
            localStorage.setItem('taskList', JSON.stringify(taskList));
        }

        function retrieveFromStorage () {
            if (localStorage.getItem('taskList') === 'undefined' || localStorage.getItem('taskList') === null) {
                return [];
            } else {
                let parsedTaskList = JSON.parse(localStorage.getItem('taskList'));
                for (task in parsedTaskList) {
                    parsedTaskList[task].createdDate = new Date(parsedTaskList[task].createdDate);
                    parsedTaskList[task].dueDate = new Date(parsedTaskList[task].dueDate);   
                    parsedTaskList[task].lastUpdated = new Date(parsedTaskList[task].lastUpdated);             
                }
                return parsedTaskList;
            }
        }

        return {
            updateStorage : updateStorage,
            retrieveFromStorage: retrieveFromStorage
        }
    } 

} ();