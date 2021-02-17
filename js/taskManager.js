

// Function to determine column value in relation to date due and todays date
determineDate=(dueBy, status)=>{
    if (status == 'done') {
        return 'columnDone';
    }
    // get the end of today's day, the due date, and the end of a week's time as milliseconds
    let dueWhen = new Date(dueBy);
    let endDay = new Date();
    let endWeek = new Date();
    dueWhen.setHours(23, 59, 59, 999);
    endDay.setHours(23, 59, 59, 999);
    endWeek.setHours(23, 59, 59, 999);
    dueWhen = dueWhen.getTime();
    endDay = endDay.getTime();
    endWeek = endWeek.getTime();
    endWeek = endWeek + (1000 * 60 * 60 * 24 * 7)
    //compare values and return a column placement
    if (endDay === dueWhen) {
        return 'columnToday'
    }   else if (dueWhen < endWeek) {
        return 'columnThisWeek'
    }   else {
        return 'columnLater'
    }
}
//adjust card function

class TaskManager {
    constructor() {
        this._currentId = 0;
        this._tasks = new Map();
    }
    get currentId() { return this._currentId }
    set currentId(value) { this._currentId = value }
    get tasks() { return this._tasks }
    set tasks(value) { this._tasks = value }

    replaceTask(task) {
        this._tasks.set(task.cardId, task);      
        console.log(`Task ${task.cardId} replaced`);        
    }
    
    
    removeTask(cardId){
        this._tasks.delete(cardId);
        console.log(`Task ${cardId} deleted`);  
        console.log(this.tasks);
        this.save();
    }


    addTask(){
        const ownerName = document.getElementById("Name").value;
        const taskName = document.getElementById("taskName").value;
        const description = document.getElementById("Description").value;
        const status = document.getElementById("Status").value;
        const dueDate = document.getElementById("DueDateInput").value;
        console.log(`Adding new task ${ownerName}, ${taskName}, ${description}, ${status}, ${dueDate}`);
        this._currentId++;
        const cardId = this.currentId;
        
        const newCard = {
            cardId: cardId,
            ownerName: ownerName,
            taskName: taskName,
            description: description,
            status: status,
            dueDate: dueDate            
            };
        this._tasks.set(cardId, newCard);
        this.drawCard(newCard);
        
        document.getElementById('form').reset()
    }
    changeTask(cardId){
        const ownerName = document.getElementById("Name").value
        const taskName = document.getElementById("taskName").value
        const description = document.getElementById("Description").value
        const status = document.getElementById("Status").value
        const dueDate = document.getElementById("DueDateInput").value
        const columnValue = determineDate(dueDate)
        const newCard = {
            cardId: cardId,
            ownerName: ownerName,
            taskName: taskName,
            description: description,
            status: status,
            dueDate: dueDate,
            columnValue: columnValue
            }
        return newCard
    }


    render(){
        this._tasks.forEach((value, key, map) => {
            this.drawCard(value);  
        });        
    }


    getTaskById(id){
        return this._tasks.get(id);           
    }  
    save(){

        let tasksJSON = JSON.stringify(Array.from(this._tasks.entries()));        
        localStorage.setItem('tasks', tasksJSON);
        const currentIdString = this._currentId.toString();
        localStorage.setItem('currentId', currentIdString);
    }
    load(){
        
        let tasksJSON = localStorage.getItem('tasks');
        this._tasks = new Map(JSON.parse(tasksJSON));        
        let currentIdString = localStorage.getItem('currentId');
        this._currentId = parseInt(currentIdString);

        console.log(`Loaded tasks ${this._tasks} and current ID ${this._currentId}`);   
    
    }

    //card render method

    drawCard(taskCard) {    
        const cardId = taskCard.cardId;
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute("id", `cardId${cardId}`);
        cardDiv.setAttribute("class", "col-2"); 
        cardDiv.innerHTML = `
            <div class="color_${taskCard.status}" id="statNum${cardId}"> 
                <div class="card d-inline-block" style="width: 20rem;">
                    <div class="card-header" id="dueNum${cardId}">
                        ${taskCard.dueDate}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title" id="nameNum${cardId}">${taskCard.taskName}</h5>
                        <p class="card-text" id="descNum${cardId}">${taskCard.description}</p>
                        <button class="rmvBtn" id="rmvId${cardId}">Remove Task</button>
                        <button class="adjustBtn" id="adjId${cardId}" value="${cardId}">Adjust Task</button>
                    </div>
                    <div class="card-footer bg-white" id="ownerNum${cardId}">${taskCard.ownerName}
                    </div>
                </div>
            </div>`;
        const columnValue = determineDate(taskCard.dueDate, taskCard.status);

        document.getElementById(columnValue).appendChild(cardDiv);

        //remove and adjust button on card event listeners        
        $(`#rmvId${cardId}`).on('click', ()=>{
            $(`#cardId${cardId}`).remove();
            this.removeTask(cardId);            
        });

        $(`#adjId${cardId}`).on('click', ()=>{
            adjustTask(cardId);
        });    
    }







}
const unitTest =() => {
    const ownerName = 'me'
    const taskName = 'me'
    const description = 'me'
    const status = 'me'
    const dueDate = 'me'

let taskey = new TaskManager

taskey.addTask()
taskey.addTask()
taskey.addTask()

console.log('test')
console.log(taskey.tasks)
taskey.render()
}
