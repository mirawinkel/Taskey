class TaskCard {
    constructor(name, taskName, description, status, dueDate) {
        this._name = name;
        this._taskName = taskName;
        this._description = description;
        this._status = status;
        this._dueDate = dueDate;
    }
    // Getter/setter methods
    get name() { return this._name; }
    set name(value) { this._name = value;}
    get taskName() { return this._taskName; }
    set taskName(value) { this._taskName = value}
    get description() { return this._description; }
    set description(value) { this._description = value}
    get status() { return this._status; }
    set status(value) { this._status = value}
    get dueDate() { return this._dueDate; }
    set dueDate(value) { this._dueDate = value}

}

const taskForm = {

    name:'',
    taskName:'',
    description:'',
    status:'',
    dueDate:'',
    columnValue:'',

    getCardInfo () {
        //Get information from forms

        this.name = document.getElementById("Name").value;
        this.taskName = document.getElementById("taskName");
        this.description = document.getElementById("Description");
        this.status = document.getElementById("Status")
        this.dueDate = document.getElementById("datetimepicker1")
    },

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
            this.columnValue = 'today';
            return this.columnValue;
        }   
        else if (date <= (day + 7)) {
        this.columnValue = 'this week';
        return this.columnValue;
        }   
        else {
        this.columnValue = 'later';
        return this.columnValue;
    },

    makeTaskCard () {
        //Make card div
        const taskCard = document.createElement('div');
        taskCard.classList.add('card d-inline-block');
        taskCard.style.width = '20rem';
        //Make card header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerHTML(this.dueDate);
        //Make card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        //Make card title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerHTML(this.taskName);
        //Make card description
        const cardDescription = document.createElement('p');
        cardDescription.classList.add('card-text');
        cardDescription.innerHTML(this.description);
        
    }

}