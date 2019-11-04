"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*        
* Factory function to instantiate the selects (arrows)
*  
* @param {String} id The id of the select element , in this case the ids retrieved from the JSON
* @param {String} question The text that should appear in the label
* @param {String} answers The list of answers corresponding to the question
* @param {String} parent The parent element (div) where this new select is going to append to
* @param {String} startPos The position where this element will appear initally. It's negative so that it's hidden.
* @param {String} degree The degree of rotation
*/
function Select(id, question, answers, parent, startPos, degree) {
  this.id = id;
  this.question = question;
  this.answers = answers;
  this.parent = parent;
  this.x = startPos;
  this.degree = degree;
}
/*        
* This function generates the select elements and populates them with the appropriate choices
*/


Select.prototype.build = function () {
  var selectId = "select" + this.id;
  var labelEle = document.createElement("label");
  var labelTxt = document.createTextNode(this.question);
  var selectEle = document.createElement("select");
  var selectDiv = document.createElement("div");
  var arrowDiv = document.createElement("div");
  var selectOption;
  labelEle.setAttribute("for", selectId);
  labelEle.appendChild(labelTxt);
  selectEle.setAttribute("id", selectId); // Add the default selection option

  var defaultOption = this.generateOption("Select an option", 0);
  selectEle.appendChild(defaultOption); // key - option text, value - option value

  for (var _i = 0, _Object$entries = Object.entries(this.answers); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    selectOption = this.generateOption(key, value);
    selectEle.appendChild(selectOption);
  }

  selectEle.addEventListener("change", function (eventObj) {
    populate(this);
  });
  arrowDiv.appendChild(labelEle);
  arrowDiv.appendChild(selectEle);
  arrowDiv.setAttribute("id", "arrow" + this.id);
  arrowDiv.setAttribute("class", "arrow");
  arrowDiv.style.transform = "rotateZ(".concat(this.degree, "deg)");
  arrowDiv.style.marginLeft = this.x + "px";
  selectDiv.setAttribute("id", this.id);
  selectDiv.appendChild(arrowDiv);
  return selectDiv;
};
/*        
* Add the newly created select to the parent div, this creates nested divs
*/


Select.prototype.create = function () {
  this.parent.appendChild(this.build());
};
/*        
* This function populates the select element with options
*  
* @param {String} key The key retreived from the answers list in JSON
* @param {String} value The value of the option, which is the id used to look up that option in JSON
*/


Select.prototype.generateOption = function (key, value) {
  var optionEle = document.createElement("option");
  var optionTxt = document.createTextNode(key);
  optionEle.setAttribute("value", value);
  optionEle.appendChild(optionTxt);
  return optionEle;
};

/*        
* Moves the arrow from left to right
*/
Select.prototype.move = function () {
  var arrow = document.getElementById("arrow" + this.id);
  animateSelect(arrow);
};