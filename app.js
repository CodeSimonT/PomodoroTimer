
// toggler button
const menuButton = document.querySelector(".button, .toggler")
const navbar = document.querySelector(".navbar")
const bar = document.querySelector(".menu-line")

menuButton.addEventListener("click", () => {
    navbar.classList.toggle("nav-toggler")
    bar.classList.toggle("active")
})

// box4 (task) menu button
const taskActive = document.querySelector(".toggler-one")
const completedActive = document.querySelector(".toggler-two")
const displayTask = document.querySelector(".task-output")
const displayCompleted = document.querySelector(".task-completed")

taskActive.addEventListener("click", () => { // task button
    displayTask.classList.remove("active-output")
    displayCompleted.classList.remove("active-comleted")
})
completedActive.addEventListener("click", () => { // complete button
    displayTask.classList.add("active-output")
    displayCompleted.classList.add("active-comleted")
})
// box1 (timer)
const timerCount = document.querySelector(".timer")
const timerUpArrow = document.querySelector(".up-button")
const timerDownArrow = document.querySelector(".down-button")
const timerStartButton = document.querySelector(".start-button")
const mainDisplay = document.querySelector(".box1-container")
const overlayDisplay = document.querySelector(".box1-overlay")
const progressValue = document.querySelector(".progress-value")

const countDownNumber = [25,50]
let pressButton = true
timerUpArrow.addEventListener("click", () => { // upButton
    countDownDisplayDOM(countDownNumber[1])
})
timerDownArrow.addEventListener("click", () => { // downButton
    countDownDisplayDOM(countDownNumber[0])
})

function countDownDisplayDOM(item = 25) { // display counting to DOM
    let countDown = item
    timerCount.innerText = countDown
}
countDownDisplayDOM()

timerStartButton.addEventListener("click", () => { // startButton
    mainDisplay.classList.add("hide")
    overlayDisplay.classList.add("show")
    progressValue.innerText = `${timerCount.innerText - 1}:59`
    countingDown()
})

const stopButton = document.querySelector(".stop-button")
const pauseButton = document.querySelector(".pause-button")
const continueButton = document.querySelector(".continue-button")

function countingDown() {
    let choosenCount = timerCount.innerText - 1
    let sec = 59
    let countingInterval = setInterval(() => {
        sec--;
        
        
        if(sec == -1) {
            sec = 59
        }
        if(sec < 10) {
            sec = `0${sec}`
        }
        if(sec == 59) {
            choosenCount--
        }
        
        progressValue.innerText = `${choosenCount}:${sec}`
        if(choosenCount < 10) {
            progressValue.innerText = `0${choosenCount}:${sec}`
        }
        if(choosenCount == 0 && sec == 0) {
            domManpulat()
            storing()
            clearInterval(countingInterval)
        }
    },00)
    stopButton.addEventListener("click", () => { // stopButton
        domManpulat()
        clearInterval(countingInterval)
    })
    function domManpulat() {
        mainDisplay.classList.remove("hide")
        overlayDisplay.classList.remove("show")
        pauseButton.classList.remove("hide")
        continueButton.classList.remove("show")
    }
    pauseButton.addEventListener("click", () => { // pauseButton
        pauseButton.classList.add("hide")
        continueButton.classList.add("show")
        clearInterval(countingInterval)
    })
    continueButton.addEventListener("click", () => { //continueButton
        pauseButton.classList.remove("hide")
        continueButton.classList.remove("show")
        countingDown()
    })
}

const completeHour = document.querySelector(".hour-complete") // completed hour
stopButton.addEventListener("click", () => { // startButton
    storing()
})
function storing() {
    const countDownInnerText = [progressValue.innerText]
    let number = countDownInnerText[0].split(':') // countdown value
    let choose = [timerCount.innerText - 1, 59] // choosen count value
    let hourCounting = 0
    let minuteCounting =  choose[0] - number[0]
    let SecondCounting =  60 - number[1]

    if(SecondCounting > 59) {
        SecondCounting = 0
        minuteCounting++
    }
    
    let stringArray = `${hourCounting}:${minuteCounting}:${SecondCounting} ` // item container to localstorage
    console.log(`this is the total value ${stringArray}`)

    if(localStorage.getItem('storage1') === null) { // if storage1 is null then store a value to it
        
        localStorage.setItem('storage1',JSON.stringify(stringArray))
        
    }else { // else get the value of storage1 and concatinat the number and stored it again in storage1
        let localStorage1 = JSON.parse(localStorage.getItem('storage1'))  
        let localStorage1ToArray = localStorage1.split(':')  
        console.log(localStorage1ToArray)
        let secondTotal = parseFloat(localStorage1ToArray[2]) + SecondCounting
        let minuteTotal = parseFloat(localStorage1ToArray[1]) + minuteCounting
        let hourTotal = parseFloat(localStorage1ToArray[0])
        // condition for sec,min,and hour concatination
        if(secondTotal > 59) {
            secondTotal = 0
            minuteTotal++
        }
        if(minuteTotal > 59) {
            minuteTotal = 0
            hourTotal++
        }

        // finally store the totalCounting into storage1
        if(hourTotal >= 4) {hourTotal = 4}
        if(hourTotal == 4 && minuteTotal > 59) {minuteTotal = 0}
        if(hourTotal == 4 && minuteTotal == 0 && secondTotal > 59) {secondTotal = 0}
        const limitNumber = JSON.parse(localStorage.getItem('storage1'))
        if(limitNumber == '4:0:0') {
            hourTotal = 4
            minuteTotal = 0
            secondTotal = 0
        }
        const totalCounting = `${hourTotal}:${minuteTotal}:${secondTotal}`
        localStorage.clear(localStorage1)
        localStorage.setItem('storage1', JSON.stringify(totalCounting))
       
    }

    item()
}
// get the storage1 to local and display it on the DOM (completedHour)
function item() {
    let displayToCompletedHour = JSON.parse(localStorage.getItem('storage1'))
    completeHour.innerText = displayToCompletedHour
}
item()// call the item() to run even if the page is refeshed
// condition for box 2

// condition for ever day rest of local storage1
setInterval(() => {
    const date = new Date()
    let localStorage1 = JSON.parse(localStorage.getItem('storage1')) 
    let hour = date.getHours()
    if(hour == 1) {
        localStorage.clear(localStorage1)
    }
},1000)

