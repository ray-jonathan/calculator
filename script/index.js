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


  // Make some Event Listeners for the different types of buttons
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

  // Event handler for calculation time
  equalButton.addEventListener('click', () => {
    let result;
    try{
      // evaluate the equation
      result = eval(window.equationString);
      // check to see if the number is too long
      if(result.toString().replace('.','').length > 9){
        // set up a nice error message to display in a second
        setTimeout(() => {
          window.display.innerText="too \xa0\xa0 big";
        },1000)
        // force the 'catch' path
        throw new Error();
      }
      else{
        // display the evaluation
        window.display.innerText= result;
        // update the equationString so further operations can be performed
        window.equationString = result;
      }
    }
    catch(error){
      result = "invalid";
      window.equationString = "0";
    }
    // show the evaluation or 'invalid'
    window.display.innerText= result;
    // return the operation back to '0' after a short pause
    setTimeout(() => window.display.innerText=window.equationString, 2000);
  });
});

function addToEquationString(e){
  // Grab the number out of the button
  const number = e.target.id;
  // Put the number in the string to calculate
  window.equationString += number;
}