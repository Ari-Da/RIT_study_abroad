"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*        
* If the user is logged in, this function makes sure that the selects appear when the page loads
*  
* @param {HTML element} frm The form used to sugn up
*/
function getUserInfo(frm) {
  var email = frm.elements["email"].value;
  var fName;
  var lName;
  var bDay;
  var phone;
  var gender;
  fName = frm.elements["fName"].value;
  lName = frm.elements["lName"].value;
  bDay = frm.elements["bDay"].value;
  phone = frm.elements["phone"].value;
  gender = frm.elements["gender"].value;
  var values = {
    "fName": fName,
    "lName": lName,
    "bDay": bDay,
    "phone": phone,
    "gender": gender,
    "email": email
  };
  cookies.setCookie("user", email);
  var user = JSON.parse(localStorage.getItem(email));

  if (user !== null) {
    values[FILENAME] = user[FILENAME];
  }

  localStorage.setItem(email, JSON.stringify(values));
  setWelcomeBox(fName + " " + lName, "Log out", 0);

  if (user !== null) {
    localStorageData(values);
  } else {
    clearArrows();
    populate();
  }
  animateForm(-1);
  frm.reset();
}
/*        
* This functions prefills other fields in the form based on the email found in localstorage
*/


function prefill() {
  var email = document.getElementById("email").value;
  var usrFromStorage = JSON.parse(localStorage.getItem(email));
  var frm = document.querySelector("#userInfo > form");

  if (usrFromStorage !== null) {
    for (var _i = 0, _Object$entries = Object.entries(usrFromStorage); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

      if (key === "gender") {
        frm.querySelector("input[name='".concat(key, "']")).checked = true;
      } else {
        frm.querySelector("input[name='".concat(key, "']")).value = value;
      }
    }
  }
} 


/*        
* Logs out the user
*/

function logout() {
  cookies.deleteCookie("user");
  setWelcomeBox("anonymous user!", "Click here to sign up.", 1);
}
/*        
* Sets the welcome text based on the existence of the cookie with the name 'user'
*  
* @param {String} txt1 The text which holds the first and last name of the user, otherwise anonymous
* @param {String} txt2 The text on the a tag, either 'Click here to sign up' or 'Log out'
* @para {Number} flag Indicates if the a tag should call the animateForm function to show the form or the logour function to delete the cookie
*/


function setWelcomeBox(txt1, txt2, flag) {
  var wlcmEle = document.querySelector("#wlcm > span");
  var log = document.getElementById("log");
  wlcmEle.textContent = txt1;
  log.textContent = txt2;

  if (flag === 1) {
    log.href = "javascript:animateForm(1);";
  } else {
    log.href = "javascript:logout();";
  }
}