let score = 0;
let timeLeft = 5000;
let countdownInterval;
let isCountdownRunning = false;

function handleClick() {
  score++;
  document.getElementById("score").textContent = "Score: " + score;
}

function startCountdown() {
  countdownInterval = setInterval(updateTime, 10);
  isCountdownRunning = true;
}

function updateTime() {
    console.log(timeLeft)
  if (timeLeft > 0) {
    timeLeft -= 10;
    document.getElementById("clickGumb").innerHTML = (timeLeft / 1000).toFixed(3);
    }else {
        clearInterval(countdownInterval);
        isCountdownRunning = false;
        document.getElementById("clickGumb").disabled = true;
        zapišiScore(score);
    }
}

function reset() {
  score = 0;
  timeLeft = 5000;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("clickGumb").innerHTML = (timeLeft / 1000).toFixed(3);
  document.getElementById("clickGumb").disabled = false;
  clearInterval(countdownInterval);
  isCountdownRunning = false;
}

function start() {
  if (!isCountdownRunning) {
    score = 0;
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("clickGumb").disabled = false;
    startCountdown();
  }
}

document.getElementById("clickGumb").addEventListener("click", handleClick);
document.getElementById("resetGumb").addEventListener("click", reset);
