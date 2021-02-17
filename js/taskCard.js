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
    },
}




    // makeTaskCard () {
    //     //Make card div<div class="color_${taskCard.status}">
    //     const taskCard = document.createElement('div');
    //     taskCard.classList.add('col-3');
    //     //Add color modifier
    //     const colorMod = document.createElement('div');
    //     colorMod.classList.add('color_' + this.status);
    //     taskCard.appendChild(colorMod);
    //     //Bootstrap Card Creation
    //     const bootCard = document.createElement('div');
    //     bootCard.classList.add('card');
    //     bootCard.classList.add('d-inline-block');
    //     bootCard.style.width = '20rem';
    //     taskCard.appendChild(bootCard);
    //     //Make card header
    //     const cardHeader = document.createElement('div');
    //     cardHeader.classList.add('card-header');
    //     cardHeader.innerHTML = this.dueDate;
    //     taskCard.appendChild(cardHeader);
    //     //Make card body
    //     const cardBody = document.createElement('div');
    //     cardBody.classList.add('card-body');
    //     taskCard.appendChild(cardBody);
    //     // //Make footer
    //     // taskCard.insertAdjacentHTML("afterend", `<div class="card-footer bg-white border-primary">${this.name}</div>`);
    //     //Make card title
    //     const cardTitle = document.createElement('h5');
    //     cardTitle.classList.add('card-title');
    //     cardTitle.innerHTML = this.taskName;
    //     taskCard.appendChild(cardTitle);
    //     //Make card description
    //     const cardDescription = document.createElement('p');
    //     cardDescription.classList.add('card-text');
    //     cardDescription.innerHTML = this.description;
    //     taskCard.appendChild(cardDescription)
    //     //Make remove task button
    //     const removeButton = document.createElement('a');
    //     removeButton.classList.add('btn btn-danger');
    //     removeButton.href.add('#');
    //     removeButton.innerHTML = 'Remove Task';
    //     taskCard.appendChild(removeButton);
    //     //Make form group
    //     const formGroup = document.createElement('div');
    //     formGroup.classList.add('form-group');
    //     taskCard.appendChild(formGroup);
    //     //Make dropdown list
    //     const dropdownList = document.createElement('select');
    //     dropdownList.classList.add('form-control');
    //     dropdownList.id = "Status";
    //     taskCard.appendChild(dropdownList);
    //     //Add options
    //     const option1 = document.createElement('option');
    //     option1.classList.add('toDo');
    //     option1.innerHTML = 'To Do';
    //     option1.insertAdjacentHTML('afterend', '<option class="inProgress">In Progress</option>');
    //     option1.insertAdjacentHTML('afterend', '<option class="stuck">Stuck</option>');
    //     option1.insertAdjacentHTML('afterend', '<option class="done">Done</option>');
    //     taskCard.appendChild(option1);
    //     //Append to proper columnValue
    //     this.determineDate();
    //     const colPlace = getElementById(this.columnValue);
    //     colPlace.appendChild(taskCard);
    // }
// function determineDate (value){

//     // get weekday from dueDate
//     let dueDay = value;
//     let columnValue
//     let trueDate
//     dueDay = dueDay.replace(/\//g, ',');
//     const dateValues = dueDay.split(',');
//     const myMonth = dateValues[0];
//     const day = dateValues[1];

//     // get today's date and month
//     const today = new Date();
//     const month = today.getMonth();
//     const dayOfMonth = today.getDate();

//     if (dayOfMonth < day && month <= myMonth) {
//         window.alert()

//     }

    

//     // compare today's date to due date and assign column value
//     if (date == day) {
//         columnValue = 'columnToday';
//         return columnValue;
//     }
//     else if (date <= (day + 7)) {
//         columnValue = 'columnThisWeek';
//         return columnValue;
//     }
//     else {
//         columnValue = 'columnLater';
//         return columnValue;
//     }
    
// }
// console.log(determineDate('2/30/2021'))



        //mine//
        //Assign card color based on option chosen (during making card)
        let applyColor; (task) => {
        };
    

