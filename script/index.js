// Wait for the document to be FULLY loaded.
window.addEventListener('DOMContentLoaded', () => {
  // Get all the buttons on the page and collect them into a node-list
  const buttonsList = document.querySelectorAll(".btn");
  // Convert node list of all buttons into an array
  const buttonsArray = Array.from(buttonsList);
  // Sort the operators and numbers apart with `.filter()`
  const numbersArray = buttonsArray.filter(button => button.dataset.type==="number");
  const operatorsArray = buttonsArray.filter(button => button.dataset.type==="operator");
  // Pull out the exceptions too
  const specialsArray = buttonsArray.filter(button => button.dataset.type==="special");
  // Destructure the individual special buttons
  const [clearButton, equalButton] = specialsArray;

  // Grab the display as we'll be needing soon
  window.display = document.getElementById('display');


  // Declare a string we'll use to hang on to the operation to perform
  window.equationString = '';

  // Declare some Event Listeners for the different types of buttons
  numbersArray.forEach(button => {
    button.addEventListener('click', addToEquationString);
  });
  operatorsArray.forEach(button => {
    button.addEventListener('click', addToEquationString);
  });
  clearButton.addEventListener('click', () => {
    // return the value to 0
    window.display.innerText= '0';
  });
  equalButton.addEventListener('click', () => {
    // evaluate the equation
    const result = eval(window.equationString);
    // display the evaluation
    window.display.innerText= result;
    // update the equationString so further operations can be performed
    window.equationString = result;
  });
});

function addToEquationString(e){
  // Grab the number out of the button
  const number = e.target.id;
  // Put the number in the string to calculate
  window.equationString += number;
}