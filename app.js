class TaskCard {
    constructor(ownerName, taskName, description, status, dueDate, cardId) {  // renamed name to ownerName, added cardID
        this._ownerName = ownerName;
        this._taskName = taskName;
        this._description = description;
        this._status = status;
        this._dueDate = dueDate;
        this._cardId = cardId;
        this._columnValue = null;



    }
    // Getter/setter methods
    get ownerName() { return this._ownerName; }
    set ownerName(value) { this._ownerName = value;}
    get taskName() { return this._taskName; }
    set taskName(value) { this._taskName = value}
    get description() { return this._description; }
    set description(value) { this._description = value}
    get status() { return this._status; }
    set status(value) { this._status = value}
    get dueDate() { return this._dueDate; }
    set dueDate(value) { this._dueDate = value}
    get cardId() { return this._cardId; }
    set cardId(value) { this._cardId = value}
    get columnValue() { return this._columnValue; }
    set columnValue(value) { this._columnValue = value}

    
    determineDate () {
        // get weekday from dueDate
        
        let dueDay = this.dueDate;
        dueDay = dueDay.replace(/\//g, ',');
        const dateValues = dueDay.split(',');
        const day = dateValues[1];
    
        // get today's date
        const today = new Date();
        const date = today.getDate();
    
        // compare today's date to due date and assign column value
        if (date == day) {
            this.columnValue = 'columnToday';
            return this.columnValue;
        }   
        else if (date <= (day + 7)) {
            this.columnValue = 'columnThisWeek';
            return this.columnValue;
        }   
        else if (date > (day +7)) {
            this.columnValue = 'columnLater';
            return this.columnValue;
        }
        else {
            window.alert('Invalid date')
        }
    }
}

//unique number generator
let currentGeneratorId = 0;                           
let generateId = () => {
    return currentGeneratorId++;
}
//array with all tasks
let taskRegistry = [];

//function to create a new card object and add to array
let createNewCard = (event) => {
    event.preventDefault();    
    let ownerName = document.getElementById("Name").value;
    let taskName = document.getElementById("taskName").value;
    let description = document.getElementById("Description").value;
    let status = document.getElementById("Status").value;
    let dueDate = document.getElementById("DueDateInput").value;
    console.log(`Adding new task ${ownerName}, ${taskName}, ${description}, ${status}, ${dueDate}`);
    let cardId = generateId();
    let newCard = new TaskCard(ownerName, taskName, description, status, dueDate, cardId);
    taskRegistry += newCard;
    newCard.determineDate();
    drawNewCard(newCard);
    console.log(taskRegistry);
    console.log(newCard.columnValue);

    //drawNewCard(newCard);
}
//function to draw a card
let drawNewCard = (taskCard) => {
    let cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
        <div class="color_${taskCard.status}"> 
            <div class="card d-inline-block" style="width: 20rem;">
                <div class="card-header">${taskCard.dueDate}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${taskCard.taskName}</h5>
                    <p class="card-text">${taskCard.description}</p>
                    <a href="#" class="btn btn-danger">Remove Task</a>
                    <div class="form-group">
                        
                        <select class="form-control" id="Status">
                            <option class="toDo">To Do</option>
                            <option class="inProgress">In Progress</option>                            
                            <option class="stuck">Stuck</option>
                            <option class="done">Done</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer bg-white border-warning">${taskCard.ownerName}
                </div>
            </div>
        </div>`;
    const colPlace = document.getElementById(taskCard.columnValue);
    colPlace.appendChild(cardDiv);
}

const taskButton = document.getElementById("addTaskButton");
taskButton.addEventListener("click", createNewCard);










// const taskForm = {

//     name:'',
//     taskName:'',
//     description:'',
//     status:'',
//     dueDate:'',
//     columnValue:'',

//     getCardInfo () {
//         //Get information from forms

//         this.name = document.getElementById("Name").value;
//         this.taskName = document.getElementById("taskName");
//         this.description = document.getElementById("Description");
//         this.status = document.getElementById("Status")
//         this.dueDate = document.getElementById("datetimepicker1")
//     },










        
//     }

// }

