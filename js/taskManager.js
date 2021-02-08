//card render function
drawCard=(card, cardId)=>{
    const taskCard = card
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute("id", `cardId${cardId}`); 
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
    return cardDiv
}
// Function to determine column value in relation to date due and todays date
determineDate=(dueBy)=>{
// get weekday from dueDate
    let dueDay = dueBy
    dueDay = dueDay.replace(/\//g, ',')
    const dateValues = dueDay.split(',')
    const day = dateValues[1]
// get today's date
    const today = new Date()
    const date = today.getDate()
// compare today's date to due date and assign column value
    if (date == day) {
        return 'columnToday'
    } else if (day <= (date + 7)) {
        return 'columnThisWeek'
    } else if (day > (date +7)) {
        return 'columnLater'
    }
}
//adjust card function

class TaskManager {
    constructor(currentId = 0, tasks = []) {
        this._currentId = currentId
        this._tasks = tasks
    }
    get currentId() { return this._currentId }
    set currentId(value) { this._currentId = value }
    get tasks() { return this._tasks }
    set tasks(value) { this._tasks = value }

    replaceTask(task) {
        const card = task
        for (let i = 0; i < this._tasks.length; i++) {
            if (this._tasks[i].cardId == card.cardId) {
                this._tasks.splice(i, 1, card)
                console.log(`Task ${i + 1} replaced`)
            }
            console.log(this.tasks)
        }
    }
    removeTask(cardId){
        const id = cardId
        const deleted = {
            cardId: 'deleted',
        };
        for (let i = 0; i < this._tasks.length; i++) {
            if (this._tasks[i].cardId == id) {
                this._tasks.splice(i, 1, deleted)
                console.log(`Task ${i + 1} deleted`)
            }
        }
    }
    addTask(){
        const ownerName = document.getElementById("Name").value
        const taskName = document.getElementById("taskName").value
        const description = document.getElementById("Description").value
        const status = document.getElementById("Status").value
        const dueDate = document.getElementById("DueDateInput").value
        console.log(`Adding new task ${ownerName}, ${taskName}, ${description}, ${status}, ${dueDate}`)
        this._currentId++
        const cardId = this.currentId
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
        this._tasks.push(newCard)
        document.getElementById(`${newCard.columnValue}`).appendChild(drawCard(newCard, cardId))
    //remove and adjust button on card event listeners
        $(`#rmvId${cardId}`).on('click', ()=>{
            $(`#cardId${cardId}`).remove()
            taskList.removeTask(cardId)
        })
        $(`#adjId${cardId}`).on('click', ()=>{
            adjustTask(cardId);
        })
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
    getTaskById(id){
        let foundTask
        for (let i = 0; i < this._tasks.length; i++) {
            if (this._tasks[i].cardId == id) {
                foundTask = this._tasks[i]
            }
        }
        return foundTask
    }
    save(){
        const tasksJSON = JSON.stringify(this.tasks)
        localStorage.setItem('tasks', tasksJSON)
        const currentId = this._currentId.toString()
        localStorage.setItem('currentId', currentId)
    }
    load(){
        let tasksJSON
        let currentId
        tasksJSON = localStorage.getItem('tasks')
        this.tasks = JSON.parse(tasksJSON)
        currentId = localStorage.getItem('currentId')
        currentId = parseInt(currentId)
        this.currentId = currentId
    }
}

// const ownerName = 'me'
//         const taskName = 'me'
//         const description = 'me'
//         const status = 'me'
//         const dueDate = 'me'

// let taskey = new TaskManager

// taskey.addTask()
// taskey.addTask()
// taskey.addTask()
// const newCard = {
//     cardId: 2,
//     ownerName: ownerName,
//     taskName: taskName,
//     description: description,
//     status: status,
//     dueDate: dueDate,
//     columnValue: null
//     }
// taskey.save()
// taskey.tasks = []
// console.log(taskey._tasks)
// taskey.load()
// console.log('test')
// console.log(taskey.tasks)

