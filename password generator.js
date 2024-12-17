const characterAmountRange = document.getElementById('characterAmountRange') // slider input for the character count
const characterAmountNumber = document.getElementById('characterAmountNumber') // number input for character count
const includeUppercaseElement = document.getElementById('includeUppercase') // checkbox to include the uppercase letters
const includeNumbersElement = document.getElementById('includeNumbers') // checkbox to include the numbers
const includeSymbolsElement = document.getElementById('includeSymbols') // checkbox to include the symbols
const form = document.getElementById('passwordgeneratorform') // the form element for the password generator
const passwordDisplay = document.getElementById('passwordDisplay') // the box where the password will be displayed

// include the arrays of the characters codes for the different character types
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90) // the ASCII codes for A-Z
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122) // the ASCII codes for a-z
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57) // the ASCII codes for 0-9
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47) // the ASCII codes for the symbols (!, ", #)
    .concat(arrayFromLowToHigh(58, 64)) // the additional symbols (:, ;, <, =)
    .concat(arrayFromLowToHigh(91, 96)) // the additional symbols ([, \, ], ^)
    .concat(arrayFromLowToHigh(123, 126)) // the additional symbols ({, |, }, ~)

// these will sync the slider and number input so they always display the same value
characterAmountNumber.addEventListener('input', syncCharacterAmount) // updates slider when number changes
characterAmountRange.addEventListener('input', syncCharacterAmount) // updates number when slider changes

form.addEventListener ('submit', e => {
    e.preventDefault() // this prevents the form page from refreshing 
    const characterAmount = characterAmountNumber.value // this gets the number of characters
    const includeUppercase = includeUppercaseElement.checked // this checks if the uppercase checkbox is selected
    const includeNumbers = includeNumbersElement.checked // this checks if the numbers checkbox is selected
    const includeSymbols = includeSymbolsElement.checked // this checks if the symbols checkbox is selected
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) // this generates the password
    passwordDisplay.innerText = password // this replaces the empty box with the generated password
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = LOWERCASE_CHAR_CODES // by default, the generated will start with lowercase letters
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES) // adds uppercase letters if chosen
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES) // adds numbers if chosen
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES) // adds symbols if chosen

    const passwordCharacters = [] // this stores the generated password characters in an array
    for (let i = 0; i < characterAmount; i++) { // this is a loop to generate the required number of characters
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)] // this picks a random character from the ASCII codes
        passwordCharacters.push(String.fromCharCode(characterCode)) // this converts the code into a character and adds it into the array
    }
    return passwordCharacters.join('') // this joins and returns all the characters into a single string
}

// this function creates an array of numbers between low and high
function arrayFromLowToHigh(low, high) { // this function generates the array of numbers that represents the ASCII codes for specific character ranges
    const array = [] // initialises an empty array
    for (let i = low; i <= high; i++) { // loops from low to high
        array.push(i) // adds each number to the array
    }
    return array // returns the array
}

// this syncs the values of the number inputs and slider
function syncCharacterAmount(e) {
    const value = e.target.value // this gets the value of the input that triggered the event
    characterAmountNumber.value = value // this updates the number input to match
    characterAmountRange.value = value // this updates the slider input to match
}