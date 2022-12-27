

// here we declare most
let currentDay = moment().format('dddd');
let time = moment().format('MMMM Do YYYY, h:mm:ss a');
let currentTime = $('#time').innerText;
let taskDigit = 9;
let timeBlock = "a.m.";
let currentHour = moment().hour();
let secretTime = 9;
let text;


// function that listens for page to load.
document.addEventListener("load",(e)=> {
    // this prevents page from clearing after clicking submit
    e.preventDefault();
});

//step 1:
// creation of each individual time block using a 'for' loop (better than creating each html div by hand)
for (let i = 0; i < 9; i++) {

    // classes and attributes are created dynamically and inserted as children
    // creation of first box with time block number
    let taskNumber = $("<div></div>").addClass("h-100 rounded-left text-white").attr("id", "time");
    //creation of input text to add task item
    let taskItem = $("<input></input>").addClass("h-100 text-white").attr({"id":"task", "data-number":[i]});
    // container that holds task and its attribues and colors
    let listItem = $("<li></li>").addClass("row mb-1").attr("id", "inTab");
    // save button and data-number !! important to add for later refercence to perpendicular task input
    let saveButton = $("<input></input>").attr({"type": "button", "value": "save", "id": "saveButton", "data-number":[i]});
    // save button container
    let saveBox = $("<p></p>").addClass("h-100 rounded-right text-white").attr("id", "saveBtn");

    //this if block checks the hour to match it against the current time
    // it is important to keep it before the if statement that changes the taskDigit to avoid highlighting the wrong hour
    // 

    // if the time block is in the past, the colors cahnge to gray, green for current and the rest remain the same
    // also the input text becomes readonly since you cannot do tasks in the past

    // these logic statements changes the color of boxes that are in the past
    if (secretTime < currentHour ){
        taskItem.css("background-color", "var(--middle-tone)").attr("readonly", "readonly");
        saveBox.css("background-color", "var(--dark-gray)");
        taskNumber.css("background-color","var(--dutch-white)");
        saveButton.attr({"disable":"disable", "id": "grayButton"});
    // if the time block matches the current time, the colors are chnaged to green
    } else if (secretTime == currentHour ) {
        saveBox.css("background-color","var(--celadon-green)");
        taskNumber.css("background-color","var(--dark-sea-green)");
        taskItem.css({"background-color":"var(--tea-green)","border":"solid 2px var(--phthalo-green)"});

    } else {
        // leaves the block as is, no changes are made
        // this 3rd option is needed to avoid changes
    };
    // these logic statements check the hour and add 1 through each iteration, and add text
    // to the current number
    // they are in charge of converting the moment.js returned digit into a 12 hour clock and add pm or am
    if (taskDigit <= 11) {
        taskNumber.text(taskDigit + " " + timeBlock);
        taskDigit++;
        secretTime++;

    } else if (taskDigit == 12) {
        timeBlock = "p.m.";
        taskNumber.text(taskDigit + " " + timeBlock);
        taskDigit++;
        secretTime++;
    } else {
        taskDigit = 1;
        timeBlock = "p.m.";
        taskNumber.text(taskDigit + " " + timeBlock);
        taskDigit++;
        secretTime++;
    };
    // append created attr to block
    taskNumber.appendTo(listItem);
    taskItem.appendTo(listItem);
    saveButton.appendTo(saveBox);
    saveBox.appendTo(listItem);

    // here we add all the list items to the unordered list
    listItem.appendTo("ul");
};

// this code creates an array of all the time slots created on the previous block
// this variable HAS TO be declared after the previous code runs and the time blocks
// are created.
let choiceBoxes = Array.from(document.querySelectorAll("#saveButton"));
let choiceTask = Array.from(document.querySelectorAll("#task"));
console.log(choiceBoxes);
console.log(choiceTask);

// here we use the selectors to create listeners
choiceBoxes.forEach(choice => {
    choice.addEventListener("click", event => {
        // the listener is based on the target button used
        let choiceButton = event.target;
        // we store the data set assigned to that particular chosen button
        let dataNumber = choiceButton.dataset["number"];
        // we use the referenced data set to reference the index number in the array of forms under task to assign to each individual button
        // that lies on the same index line, and we assign the value to a variable
        let inputText = choiceTask[dataNumber].value;
        // we use the variable to store it in local storage
        localStorage.setItem( dataNumber, inputText);

        console.log(localStorage);
    })

});

$("#timeblock").text(currentDay + ", " +  time);
console.log();
//this works and adds an input text box
$("#task").click(function(event){
    let inputText = $("<input></input>");
    let target = this.event;
    inputText.appendTo(task);
});


// event listener that saves data to local storage
$(document).on("click", event => {

    if(event.target.id == "saveButton") {
        console.log("click");
    } else {
        console.log("not click");
    }

 });

 for (let i = 0; i < choiceTask.length; i++) {

    const key = localStorage.key(i);
    const pairValue = localStorage.getItem(key);
    
    console.log(key);
    console.log(pairValue);

    choiceTask[key].value = pairValue;


 };




