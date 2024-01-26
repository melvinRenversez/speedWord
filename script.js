content = document.getElementById("content")
letterText = document.getElementById("letter")
timer = document.getElementById("timer")
userAnswer = document.getElementById("answer")
sendButton = document.getElementById("send")
startButton = document.getElementById("start")
listAnswer = document.getElementById("listAnswer")

letterText.innerHTML = "_"
timer.innerHTML = "0"

var verifacationDone = false
var currentLetter = ""
var x
var Text = ""
var sizeLetter
var time = "0m 0s"
var m = 0
var s = 0
var timerInterval
var replay = false

alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
allAnswers = []

sizeLetter = alphabet.length

startButton.addEventListener("click", start)
sendButton.addEventListener("click", ()=>{
    if (replay){
        alphabet = help
        generate()
        console.log('restart')
        listAnswer.classList.add("disabled")
        sendButton.innerHTML = "repondre"
    }else{
        verification()
    }
})

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        verification()
    }
})

function printAnswer() {
    console.log("printAnswer")
    help = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    for (let i = 0; i < sizeLetter; i++) {
        console.log(i)
        allAnswers.forEach(element => {
            if (element[0] == help[i]) {
                Text += element[0] + " : " + element[1] + "<br>"
            }
        });
    }
    listAnswer.innerHTML = Text
    listAnswer.classList.remove("disabled")
}

function start() {
    generate()
    timerInterval = setInterval(startTimer, 1000)   
}

function generate(){
    startButton.classList.remove("active")
    content.classList.remove("disabled")
    if(alphabet.length > 0) {
        x = Math.floor(Math.random() * alphabet.length)
        letterText.innerHTML = alphabet[x]
        currentLetter = alphabet[x]
    }else{
        letterText.innerHTML = "Finish"
        sendButton.innerHTML = "Replay"
        replay = true
        clearInterval(timerInterval)
        printAnswer()
    }
}

function verification() {
    value = userAnswer.value
    if (value.length >= 3) {
        if (value.charAt(0).toUpperCase() == currentLetter) {
            p = [currentLetter, value]
            allAnswers.push(p)
            userAnswer.value = ""
            alphabet.splice(x, 1)
            generate()
        }
    }
}

function startTimer() {
    s++
    if (s == 60) {
        m++
        s = 0
    }
    time = m + "m " + s + "s"
    timer.innerHTML = time
    console.log()
}