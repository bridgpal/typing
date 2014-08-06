function placeLetter() {
    var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    var thing = document.createElement("div");
    thing.innerHTML = letter;
    thing.className = letter;

    thing.style.top = Math.random() * 300 + "px";
    thing.style.right = 1000 - (Math.random() * 500) + "px";

    document.getElementById('box').appendChild(thing);
}

function moveLetters() {
    var boxes = document.querySelectorAll("#box > div");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.right = parseInt(boxes[i].style.right) - 10 + "px";
        if (parseInt(boxes[i].style.right) <= -10) {
            endGame();
        }
    }
}

function decreaseLetterSpeed(score) {
    if (parseInt(score.innerHTML) % 20 === 0) {
        clearInterval(placeLetterTimer);
        placeLetterInterval = placeLetterInterval * 1.1
        placeLetterTimer = setInterval(placeLetter, placeLetterInterval)
    }
}

function endGame() {
    clearInterval(moveLettersTimer);
    clearInterval(placeLetterTimer);
    document.removeEventListener('keydown', keyboardInput);
    document.getElementById('message').classList.remove("hidden");
}

function keyboardInput() {
    if (event.keyCode === 27) {
        return endGame();
    };

    var key = String.fromCharCode(event.keyCode).toLowerCase();
    var boxes = document.getElementsByClassName(key);
    var score = document.getElementById("score");

    if (boxes[0]) {
        boxes[0].remove();
        score.innerHTML = parseInt(score.innerHTML) + 1;
        decreaseLetterSpeed(score);
    } else {
        score.innerHTML = parseInt(score.innerHTML) - 1;
    }

}

document.addEventListener('keydown', keyboardInput);

console.log("OH HAI THERE!");
var placeLetterInterval = 500;
var placeLetterTimer = setInterval(placeLetter, placeLetterInterval);
var moveLettersTimer = setInterval(moveLetters, 100);