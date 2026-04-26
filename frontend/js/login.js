/* Login page JavaScript */

const text = "> Assigned to Hangar 901 - Please Conduct your data to procces acces to the relay. |";
let index = 0;

// Typing animation for intrso text
function typeText() {
  if (index < text.length) {
    document.getElementById("typingText").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 40);
  }
}


typeText();