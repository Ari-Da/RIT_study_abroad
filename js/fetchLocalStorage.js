"use strict";

/*        
* If the user is logged in, this function makes sure that the selects appear when the page loads
*  
* @param {Object} user Key value pair object of the user retrieved from the cookie. Has first and last name, email, birth day, gender and the list of choices
*/
function localStorageData(user) {
  selectContainer = document.getElementById("selectContainer");

  if (user[FILENAME] !== undefined && user[FILENAME].length > 0) {
    clearArrows();

    var divChild = null;
    user[FILENAME].forEach(function (choiceId) {
      choice = choices.find(function (obj) {
        return obj.id === choiceId;
      });
      divChild = selectContainer.querySelector("div:not(.arrow)");

      if (divChild) {
        selectContainer = divChild;
        selectContainer.querySelector("select").value = choiceId;
      }

      checkChoices(choice);
    });
  }
}