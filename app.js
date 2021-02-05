class TaskCard {
    constructor(ownerName, taskName, description, status, dueDate, cardId) {  // renamed name to ownerName, added cardID
        this._ownerName = ownerName;
        this._taskName = taskName;
        this._description = description;
        this._status = status;
        this._dueDate = dueDate;
        this._cardId = cardId;



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


    //added method to show objects as string
    toString() {
        return `{Task: taskId: ${this.cardId}, ownerName: ${this.ownerName}, taskName: ${this.taskName}, ${this.description}, ${this.status}, ${this.dueDate}}`;
    }

}

//unique number generator
let currentGeneratorId = 0;                           
let generateId = () => {
    return currentGeneratorId++;
}
//array with all tasks
let taskRegistry = new Map();


//function to create a new card object and add to array
let createNewCard = () => {
    
    let ownerName = document.getElementById("Name").value;
    let taskName = document.getElementById("taskName").value;
    let description = document.getElementById("Description").value;
    let status = document.getElementById("Status").value;
    let dueDate = document.getElementById("DueDateInput").value;
    console.log(`Adding new task ${ownerName}, ${taskName}, ${description}, ${status}, ${dueDate}`);
    let cardId = generateId();
    let newCard = new TaskCard(ownerName, taskName, description, status, dueDate, cardId);
    taskRegistry.set (cardId, newCard);
    drawNewCard(newCard);
    console.log(taskRegistry);
}

let deleteCard = (cardId) => {                          ///delete Card
    taskRegistry.delete(cardId);
    document.getElementById(`divId_${cardId}`).remove();

}



//function to draw a card
let drawNewCard = (taskCard) => {
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute("id", `divId_${taskCard.cardId}`);   ////added div id and removeButton ID
    cardDiv.innerHTML = `
        <div class="color_${taskCard.status}"> 
            <div class="card d-inline-block" style="width: 20rem;">
                <div class="card-header">${taskCard.dueDate}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${taskCard.taskName}</h5>
                    <p class="card-text">${taskCard.description}</p>
                    <a href="#" class="btn btn-danger" id="removeIdButton_${taskCard.cardId}">Remove Task</a>
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
    document.getElementById('columnLater').appendChild(cardDiv);
    document.getElementById(`removeIdButton_${taskCard.cardId}`).onclick = () => {  //onclick for removeButton
        deleteCard(taskCard.cardId);
    }
}

document.getElementById('addTaskButton').onclick = createNewCard;




























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

//     determineDate () {
//         // get weekday from dueDate
        
//         let dueDay = this.dueDate;
//         dueDay = dueDay.replace(/\//g, ',');
//         const dateValues = dueDay.split(',');
//         const day = dateValues[1];

//         // get today's date
//         const today = new Date();
//         const date = today.getDate();

//         // compare today's date to due date and assign column value
//         if (date == day) {
//             this.columnValue = 'today';
//             return this.columnValue;
//         }   
//         else if (date <= (day + 7)) {
//         this.columnValue = 'this week';
//         return this.columnValue;
//         }   
//         else {
//         this.columnValue = 'later';
//         return this.columnValue;
//     },

//     makeTaskCard () {
//         //Make card div
//         const taskCard = document.createElement('div');
//         taskCard.classList.add('card d-inline-block');
//         taskCard.style.width = '20rem'
//         //Make card header
//         const cardHeader = document.createElement('div');
//         cardHeader.classList.add('card-header');
//         cardHeader.innerHTML(this.dueDate);
//         //Make card body
//         const cardBody = document.createElement('div');
//         cardBody.classList.add('card-body');
//         //Make card title
//         const cardTitle = document.createElement('h5');
//         cardTitle.classList.add('card-title');
//         cardTitle.innerHTML(this.taskName);
//         //Make card description
//         const cardDescription = document.createElement('p');
//         cardDescription.classList.add('card-text');
//         cardDescription.innerHTML(this.description);



        
//     }

// }

