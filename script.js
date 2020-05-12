/* Daily Planner Script */

// Create timeSlot variable to store and loop through scheduler
var timeSlot = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
];

// Create function to retrieve date data for the header
// Source: https://tecadmin.net/get-current-date-time-javascript/
// Source: https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
// Source: https://www.w3schools.com/jsref/jsref_getminutes.asp

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

function getHeaderDateTime() {
    // Create variables to get and store date and time info in military format
    var currentDate = new Date();
    var dateTime = "Last Sync: " + + (currentDate.getMonth() + 1) + "/"
                    + currentDate.getDate() + "/"
                    + currentDate.getFullYear() + " @ "
                    + addZero(currentDate.getHours()) + ":"
                    + addZero(currentDate.getMinutes());
    $("#currentDay").text(dateTime);
}

// Create function that saves data to localStorage
function storeItem() {
    localStorage.setItem("timeSlot", JSON.stringify(timeSlot));
}

// Create function that sets any data in localStorage to the view
function displayItems() {
    timeSlot.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// Prints existing localStorage data to the browser
function init() {
    var storedDay = JSON.parse(localStorage.getItem("timeSlot"));

    if (storedDay) {
        timeSlot = storedDay;
    }

    storeItem();
    displayItems();
}

// Executes function to display header date and time
getHeaderDateTime();

// Creates element in browser creates the visuals for the scheduler body
timeSlot.forEach(function(thisHour) {
    // Create row form element in browser 
    var timeSlotRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(timeSlotRow);

    // Creates div element in browser for time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // Creates div element in browser for schdedule data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    // Creates textarea for planner inputs
    var plannerRowData = $("<textarea>");
    // Appends row data to div element
    hourPlan.append(plannerRowData);
    plannerRowData.attr("id", thisHour.id);
    // Assigns class of past if c
    if (thisHour.time < moment().format("HH")) {
        plannerRowData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        plannerRowData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        plannerRowData.attr({
            "class": "future"
        })
    }

    // Create save button in browser
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlannerData = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlannerData.append(saveButton);
    timeSlotRow.append(hourField, hourPlan, savePlannerData);
});

// Executes function to load existing localstorage data
init();

// Click event to save data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    timeSlot[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    storeItem();
    displayItems();
});