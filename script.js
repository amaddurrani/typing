const targetTextElement = document.getElementById('targetText');
const textInputElement = document.getElementById('textInput');
const resultElement = document.getElementById('result');
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const timerElement = document.getElementById('timer');

let startTime, endTime, timerInterval;
let typedText = '';

// Start the typing test
function startTest() {
  textInputElement.value = '';
  textInputElement.removeAttribute('disabled');
  textInputElement.focus();
  startButton.setAttribute('disabled', 'disabled');
  endButton.removeAttribute('disabled');

  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

// End the typing test
function endTest() {
  endTime = new Date();
  textInputElement.setAttribute('disabled', 'disabled');
  startButton.removeAttribute('disabled');
  endButton.setAttribute('disabled', 'disabled');

  clearInterval(timerInterval);

  const timeDiff = endTime - startTime; // Time difference in milliseconds
  const seconds = timeDiff / 1000; // Convert to seconds

  const accuracy = calculateAccuracy(typedText, targetTextElement.textContent);
  const wordsPerMinute = calculateWordsPerMinute(typedText, seconds);

  resultElement.innerHTML = `Accuracy: ${accuracy}%<br>Word count per minute: ${wordsPerMinute}`;
}

// Handle keydown event
function handleKeyDown(event) {
  if (event.key === 'Backspace') {
    event.preventDefault();
  } else if (event.key !== 'Tab') {
    typedText += event.key;
  }

  if (event.key === ' ') {
    typedText += ' ';
  }

  if (!startTime) {
    startTest();
  }

  if (typedText === targetTextElement.textContent) {
    endTest();
  }
}

// Calculate accuracy by comparing typed text and target text
function calculateAccuracy(typedText, targetText) {
  let correctCount = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correctCount++;
    }
  }

  return ((correctCount / targetText.length) * 100).toFixed(2);
}

// Calculate words per minute based on typed text and time taken
function calculateWordsPerMinute(typedText, seconds) {
  const wordCount = typedText.trim().split(/\s+/).length;
  const minutes = seconds / 60;

  return Math.round(wordCount / minutes);
}

// Update the timer display
function updateTimer() {
  const currentTime = new Date();
  const timeDiff = currentTime - startTime;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);
  const formattedTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);

  timerElement.textContent = formattedTime;
}

// Format time with leading zeros
function formatTime(time) {
  return time < 10 ? '0' + time : time;
}
