/*
"Javascript Functionality For The Password Generator"

Resources Used :
- http://www.net-comber.com/charset.html *Website used to find the number assigned to each char
- https://stackoverflow.com/questions/37658524/copying-text-of-textarea-in-clipboard-when-button-is-clicked --> copy function


*/ 
// DOM Elements
const outputEl = document.getElementById('output'); // element for the 'output'
const lengthEl = document.getElementById('length'); // element for the length of the random password
const uppercaseEl = document.getElementById('uppercase'); // elemnent for the uppercase letters
const lowercaseEl = document.getElementById('lowercase'); // element for the lowercase letters
const numbersEl = document.getElementById('numbers'); // element for the numbers
const symbolsEl = document.getElementById('symbols'); // element for the symbols
const generateEl = document.getElementById('generate'); // element for the generate button
const clipboardEl = document.getElementById('clipboard'); // element for the clipboard 

const randomFunc = { // object for all the functions
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}
function handleChange() {
    var x = document.getElementById("numbers");
    if ((x.value > 128))
    {
      alert("Max Password Length is 128 Characters");
    }
  }
// Copy Password to clipboard

function copy() {
	let textarea = document.getElementById("output");
	textarea.select();
	document.execCommand("copy");
	alert("Password Copied To Clipboard");
  }
////////////////////



generate.addEventListener('click', () => { // EventListener when the generate button is clicked  
	const length = +lengthEl.value; // We used the plus sign to convert from strings to Number
	const incLower = lowercaseEl.checked; // Used to check if the checkbox checked or not and applys for the rest.
	const incUpper = uppercaseEl.checked;
	const incNumber = numbersEl.checked;
	const incSymbol = symbolsEl.checked;
	outputEl.innerText = generatePassword(incLower, incUpper, incNumber, incSymbol, length); // output generated random password into the output box.
});
//Generate Password Function

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol; //Used to count the number of checked items
	const typesArr = [{
		lower
	}, {
		upper
	}, {
		number
	}, {
		symbol
	}].filter(item => Object.values(item)[0]); //Array of types, curly brackets used to make them as keys. Filter used to take out any value equal to false which is the unchecked type.
	if (typesCount === 0) { // Used to check if none of the checkboxes clicked then it returns nothing.
		return '';
	}

	for (let i = 0; i < length; i += typesCount) { // Loop over the length and call generator function for each type
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();

		});
	}
	const finalPassword = generatedPassword.slice(0, length); // slice used to give the exact amount of the password length chosen
	return finalPassword;
}
// Generator functions - http://www.net-comber.com/charset.html *Website used to find the number assigned to each char
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Function To Generate Random Lowercase Letters, we used math.floor to remove the decimals. Number '26' is the number of letters and Number '97' is the letter lowercase letter 'a' that it will start with it.
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Function To Generate Random Uppercase Letters, we used math.floor to remove the decimals. Number '26' is the number of letters and Number '65' is the letter Uppercase letter 'A' that it will start with it.
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // Function To Generate Random Numbers, we used math.floor to remove the decimals. Number '10' is the count of numbers from 0-9 and Number '48' is the Char '0' that it will start with it.
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)]; // Function To Generate Random Symbols. We can choose what symbols to include.


}

