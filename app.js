// toggler button
const menuButton = document.querySelector(".button, .toggler");
const navbar = document.querySelector(".navbar");
const bar = document.querySelector(".menu-line");

menuButton.addEventListener("click", () => {
  navbar.classList.toggle("nav-toggler");
  bar.classList.toggle("active");
});

// box4 (task) menu button
const taskActive = document.querySelector(".toggler-one");
const completedActive = document.querySelector(".toggler-two");
const addActive = document.querySelector(".toggler-three");
const displayTask = document.querySelector(".task-output");
const displayCompleted = document.querySelector(".task-completed");
const displayAdd = document.querySelector(".add-task");

taskActive.addEventListener("click", () => {
  // task button
  taskActivePros();
});
function taskActivePros() {
  // for box4 (task) active heading
  taskActive.classList.remove("transparentC");
  completedActive.classList.remove("active-heading");
  addActive.classList.remove("active-heading");
  // for box4 (task) buttons
  displayTask.classList.remove("active-output");
  displayCompleted.classList.remove("active-comleted");
  displayAdd.classList.remove("active-add");
}
completedActive.addEventListener("click", () => {
  // complete button
  // for box4 (task) active heading
  taskActive.classList.add("transparentC");
  completedActive.classList.add("active-heading");
  addActive.classList.remove("active-heading");
  // for box4 (task) buttons
  displayTask.classList.add("active-output");
  displayCompleted.classList.add("active-comleted");
  displayAdd.classList.remove("active-add");
});
addActive.addEventListener("click", () => {
  // add button
  // for box4 (task) active heading
  addActive.classList.add("active-heading");
  taskActive.classList.add("transparentC");
  completedActive.classList.remove("active-heading");
  // for box4 (task) buttons
  displayTask.classList.add("active-output");
  displayCompleted.classList.remove("active-comleted");
  displayAdd.classList.add("active-add");
});

// box1 (timer)
const timerCount = document.querySelector(".timer");
const timerUpArrow = document.querySelector(".up-button");
const timerDownArrow = document.querySelector(".down-button");
const timerStartButton = document.querySelector(".start-button");
const mainDisplay = document.querySelector(".box1-container");
const overlayDisplay = document.querySelector(".box1-overlay");
const progressValue = document.querySelector(".progress-value");

const countDownNumber = [25, 50];
let pressButton = true;
timerUpArrow.addEventListener("click", () => {
  // upButton
  countDownDisplayDOM(countDownNumber[1]);
});
timerDownArrow.addEventListener("click", () => {
  // downButton
  countDownDisplayDOM(countDownNumber[0]);
});

function countDownDisplayDOM(item = 25) {
  // display counting to DOM
  let countDown = item;
  timerCount.innerText = countDown;
}
countDownDisplayDOM();

timerStartButton.addEventListener("click", () => {
  // startButton
  mainDisplay.classList.add("hide");
  overlayDisplay.classList.add("show");
  progressValue.innerText = `${timerCount.innerText - 1}:59`;
  countingDown();
});

const stopButton = document.querySelector(".stop-button");
const pauseButton = document.querySelector(".pause-button");
const continueButton = document.querySelector(".continue-button");

function countingDown() {
  let choosenCount = timerCount.innerText - 1;
  let sec = 59;
  let countingInterval = setInterval(() => {
    sec--;

    if (sec == -1) {
      sec = 59;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (sec == 59) {
      choosenCount--;
    }

    progressValue.innerText = `${choosenCount}:${sec}`;
    if (choosenCount < 10) {
      progressValue.innerText = `0${choosenCount}:${sec}`;
    }
    if (choosenCount == 0 && sec == 0) {
      domManpulat();
      storing();
      clearInterval(countingInterval);
    }
  }, 1000);
  stopButton.addEventListener("click", () => {
    // stopButton
    domManpulat();
    clearInterval(countingInterval);
  });
  function domManpulat() {
    mainDisplay.classList.remove("hide");
    overlayDisplay.classList.remove("show");
    pauseButton.classList.remove("hide");
    continueButton.classList.remove("show");
  }
  pauseButton.addEventListener("click", () => {
    // pauseButton
    pauseButton.classList.add("hide");
    continueButton.classList.add("show");
    clearInterval(countingInterval);
  });
  continueButton.addEventListener("click", () => {
    //continueButton
    pauseButton.classList.remove("hide");
    continueButton.classList.remove("show");
    countingDown();
  });
}
// box 2
const completeHour = document.querySelector(".hour-complete"); // completed hour
stopButton.addEventListener("click", () => {
  // startButton
  storing();
});
function storing() {
  const countDownInnerText = [progressValue.innerText];
  let number = countDownInnerText[0].split(":"); // countdown value
  let choose = [timerCount.innerText - 1, 59]; // choosen count value
  let hourCounting = 0;
  let minuteCounting = choose[0] - number[0];
  let SecondCounting = 60 - number[1];

  if (SecondCounting > 59) {
    SecondCounting = 0;
    minuteCounting++;
  }

  let stringArray = `${hourCounting}:${minuteCounting}:${SecondCounting} `; // item container to localstorage
  console.log(`this is the total value ${stringArray}`);

  if (localStorage.getItem("storage1") === null) {
    // if storage1 is null then store a value to it

    localStorage.setItem("storage1", JSON.stringify(stringArray));
  } else {
    // else get the value of storage1 and concatinate the number and stored it again in storage1
    let localStorage1 = JSON.parse(localStorage.getItem("storage1"));
    let localStorage1ToArray = localStorage1.split(":");
    console.log(localStorage1ToArray);
    let secondTotal = parseFloat(localStorage1ToArray[2]) + SecondCounting;
    let minuteTotal = parseFloat(localStorage1ToArray[1]) + minuteCounting;
    let hourTotal = parseFloat(localStorage1ToArray[0]);
    // condition for sec,min,and hour concatination
    if (secondTotal > 59) {
      secondTotal = 0;
      minuteTotal++;
    }
    if (minuteTotal > 59) {
      minuteTotal = 0;
      hourTotal++;
    }

    // 4 hours limiter
    if (hourTotal >= 4) {
      hourTotal = 4;
    }
    if (hourTotal == 4 && minuteTotal > 59) {
      minuteTotal = 0;
    }
    if (hourTotal == 4 && minuteTotal == 0 && secondTotal > 59) {
      secondTotal = 0;
    }
    const limitNumber = JSON.parse(localStorage.getItem("storage1"));
    if (limitNumber == "4:0:0") {
      hourTotal = 4;
      minuteTotal = 0;
      secondTotal = 0;
    }
    // finally store the totalCounting into storage1
    const totalCounting = `${hourTotal}:${minuteTotal}:${secondTotal}`;
    localStorage.clear(localStorage1);
    localStorage.setItem("storage1", JSON.stringify(totalCounting));
  }

  item();
}
// get the storage1 to local and display it on the DOM (completedHour)
function item() {
  let displayToCompletedHour = JSON.parse(localStorage.getItem("storage1"));
  completeHour.innerText = displayToCompletedHour;
}
item(); // call the item() to run even if the page is refeshed
// condition for box 2

// condition for every day reset of local storage1

setInterval(() => {
  const date = new Date();
  let localStorage1 = JSON.parse(localStorage.getItem("storage1"));
  let hour = date.getHours();
  if (hour == 1) {
    localStorage.clear(localStorage1);
  }
}, 1000);

const inputText = document.querySelector("#text-input");
const saveTask = document.querySelector(".saveTask");
const deleteTask = document.querySelector(".deleteTask");
const saveContent = document.querySelector(".task-output");
const saveCompleted = document.querySelector(".task-completed");
const totalTask = document.querySelector(".totalTask");
let globalItem = [];

saveTask.addEventListener("click", () => {
  totalTask.innerText = JSON.parse(localStorage.getItem("todolist"));
  if (inputText.value !== "") {
    const localitem = JSON.parse(localStorage.getItem("todolist"));

    if (localitem === null) {
      globalItem = [];
    } else {
      globalItem = localitem;
    }
    globalItem.unshift(inputText.value);
    inputText.value = "";
    localStorage.setItem("todolist", JSON.stringify(globalItem));
    console.log("click");
    savingProcess();
  }
});

const savingProcess = () => {
  // make sure to make an varieble with empty string on the top
  let addingElements = "";
  const localitem = JSON.parse(localStorage.getItem("todolist"));
  totalTask.innerText = localitem.length;
  if (localitem === null) {
    globalItem = [];
  } else {
    globalItem = localitem;
  }
  // adding an element to the dom
  globalItem.forEach((element) => {
    addingElements += `
            <div class="list1">
                <div class="text">
                    <p class="item">
                        ${element}
                    </p>
                </div>
                <div class="list-button">
                    <img class="saving" src="img/icons8-checkmark-30.png" alt="save">
                    <img class="delete" src="img/icons8-remove-30.png" alt="remove">
                </div>
            </div>  
        `;
  });
  saveContent.innerHTML = addingElements;
};
savingProcess();
let completedTaskPlaceHoder = [];
saveContent.addEventListener("click", (e) => {
  if (e.target.className === "saving") {
    const localitem = JSON.parse(localStorage.getItem("todolist"));
    // locate the inputText
    const targetItem = e.target.parentNode.previousElementSibling.innerText;
    console.log(`this is the item ${targetItem}`);
    globalItem = localitem;
    // find the indexOf the targetItem and remove the value using splice
    const indexof = globalItem.indexOf(targetItem);
    console.log(indexof);
    let spliceArray = globalItem.splice(indexof, 1);
    localStorage.setItem("todolist", JSON.stringify(globalItem));
    savingProcess();
    console.log(spliceArray);
    const storage2 = JSON.parse(localStorage.getItem("storage2"));
    if (storage2) {
      completedTaskPlaceHoder = storage2;
    } else {
      completedTaskPlaceHoder = [];
    }
    completedTaskPlaceHoder.unshift(spliceArray);
    localStorage.setItem("storage2", JSON.stringify(completedTaskPlaceHoder));
    savingCompleted();
  }
  if (e.target.className === "delete") {
    console.log("click the delete");
    const localitem = JSON.parse(localStorage.getItem("todolist"));
    // locate the inputText
    const targetItem = e.target.parentNode.previousElementSibling.innerText;
    console.log(`this is the item ${targetItem}`);
    globalItem = localitem;
    // find the indexOf the targetItem and remove the value using splice
    const indexof = globalItem.indexOf(targetItem);
    console.log(indexof);
    let spliceArray = globalItem.splice(indexof, 1);
    localStorage.setItem("todolist", JSON.stringify(globalItem));
    savingProcess();
  }
});

const savingCompleted = () => {
  // make sure to make an varieble with empty string on the top
  let addingElements = "";
  const localitem = JSON.parse(localStorage.getItem("storage2"));
  if (localitem) {
    localitem.flat(Infinity);
  }
  if (localitem === null) {
    globalItem = [];
  } else {
    globalItem = localitem;
  }
  // adding an element to the dom
  globalItem.forEach((element) => {
    addingElements += `
            <div class="list1">
                <div class="text">
                    <p class="item">
                        ${element}
                    </p>
                </div>
            </div>  
        `;
  });
  saveCompleted.innerHTML = addingElements;
};
savingCompleted();
// this is for the save and delete button for add task

saveTask.addEventListener("click", () => {
  taskActivePros();
});
deleteTask.addEventListener("click", () => {
  inputText.value = "";
  taskActivePros();
});
