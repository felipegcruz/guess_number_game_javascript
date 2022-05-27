//Game Values
let min = 1,
	max = 10,
	winningNumber = getRandomNumber(min, max),
	guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input'),
	message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again event listener
game.addEventListener('mousedown', (e) => {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

//Listen for guess
guessBtn.addEventListener('click', () => {
	let guess = parseInt(guessInput.value);

	//Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	//Check if won
	if (guess === winningNumber) {
		gameOver(true, `${winningNumber} is correct. You win !!!`);
	} else {
		//Wrong Number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			//Game Over - lost

			gameOver(false, `Game Over, you lost. The correct number was ${winningNumber}`, 'green');
		} else {
			//Change color border
			guessInput.style.borderColor = 'red';

			//Clear the input
			guessInput.value = '';

			//Tell user it is the wrong number
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
		}
	}
});
//Game Over
function gameOver(won, msg) {
	let color;

	won === true ? (color = 'green ') : (color = 'red');

	//Disable Input
	guessInput.disabled = true;
	//Change color border
	guessInput.style.borderColor = color;
	//Set text color
	message.style.color = color;
	//Set Message
	setMessage(msg);

	//Play again
	guessBtn.value = 'Play Again';
	guessBtn.classList += 'play-again';
}

//Get winning number
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
