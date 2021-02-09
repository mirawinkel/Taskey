$( document ).ready(function() {
    console.log( "ready!" );
    //instantiate new TaskManager object
    const taskList = new TaskManager
    const task=()=>{
        taskList.addTask()
        taskList.save()
    }
    adjustTask=(cardId)=>{
        let card=taskList.getTaskById(cardId)
        //Repopulates form fields with values from card
        $('#Name').val(`${card.ownerName}`);
        $('#taskName').val(`${card.taskName}`);
        $('#Description').val(`${card.description}`);
        $('#Status').val(`${card.status}`);
        $('#DueDateInput').val(`${card.dueDate}`);
        //hides add Task Button then reveals change Task and Cancel buttons
        $('#addTaskButton').css("display", 'none');
        $('#changeButton').css("display", '');
        $('#cancelButton').css("display", '');
        //Set Adjust task button in entry form event listener to update card
        $('#changeButton').one('click', ()=>{
            //store task values from fields as a task card
            card = taskList.changeTask(card.cardId);
            card.columnValue = determineDate(card, card.status);
            //adjust task array
            taskList.replaceTask(card);
            //remove old card, render new updates and clear entry form
            $(`#cardId${card.cardId}`).remove();
            document.getElementById(`${card.columnValue}`).appendChild(drawCard(card, card.cardId))
            document.getElementById('form').reset();
            //switch buttons
            $('#addTaskButton').css("display", '');
            $('#changeButton').css("display", 'none');
            $('#cancelButton').css("display", 'none');
            taskList.save();
                //remove and adjust button on card event listeners
            $(`#rmvId${card.cardId}`).on('click', ()=>{
                taskList.removeTask(cardId)
                $(`#cardId${card.cardId}`).remove()
            })
            $(`#adjId${card.cardId}`).on('click', ()=>{
                adjustTask(card.cardId);
            })
        })
    }
    //event listener for add task
    $("#addTaskButton").on('click',()=>{task()})
    // Event listener for cancel button
    $('#cancelButton').on('click', () => {
        $('#addTaskButton').css('display', '')
        $('#changeButton').css('display', 'none')
        $('#cancelButton').css('display', 'none')
        document.getElementById('form').reset()
    })
    const showFormButton = document.getElementById('showFormButton');  // change caption on form opening button
    isFormVisible = false;
    showFormButton.onclick = () => {
        isFormVisible = !isFormVisible;    
        if (isFormVisible) {
            showFormButton.innerHTML = 'Close';
        } else {
            showFormButton.innerHTML = 'Add new task';
        }
    }
    
});

taskList.load();
taskList.render();