"use strict";

/*        
* This functions makes the arrows move from the left to the right
*  
* @param {HTML element} arrow The div element with the id 'arrow[id]'
*/
function animateSelect(arrow) {
  if (arrow != undefined) {
    // curPos = arrow.style.marginLeft.slice( 0, arrow.style.marginLeft.length - 2 );
    var curPos = arrow.offsetLeft;
    var newPos = curPos + 30;
    arrow.style.marginLeft = newPos + "px";

    if (newPos + arrow.offsetWidth - HITTINGDEPTH < heartX) {
      setTimeout(animateSelect, 1, arrow);
    }
  }
}
/*        
* If the user is logged in, this function makes sure that the selects appear when the page loads
*  
* @param {Number} direction Specfies the direction the form should move, 1 - move to the right, other - move to the left to hide
*/


function animateForm(direction) {
  var frm = document.getElementById("userInfo");
  var curPos = frm.offsetLeft;
  var newPos;

  if (direction === 1 && curPos <= 0) {
    // prevent form animation, if form is already visible
    newPos = curPos + 8;
  } else {
    newPos = curPos - 8;
  }

  frm.style.marginLeft = newPos + "px";

  if (newPos <= 0 && direction === 1 || curPos + frm.offsetWidth >= 0 && direction === -1) {
    setTimeout(animateForm, 20, direction);
  }
}