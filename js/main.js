if (BrowserDetect.browser === "Mozilla" && BrowserDetect.version == 11) {
    //Does not work in IE
    window.location = "https://www.mozilla.org/en-US/firefox/download/thanks/";
} else if (BrowserDetect.browser === "MSIE" && BrowserDetect.version == 11) {
    //Does not work in IE
    window.location = "https://www.mozilla.org/en-US/firefox/download/thanks/";
}

// FILENAME - the name of the dataset file
// OFFSETX - the x position of the arrows. It's minus so that they are hidden on the left side.
// MAXDEGREE - the maximum angle that arrows can rotate
// HITTINGDEPTH - the value till where the arrows go into the heart
"use strict";

var FILENAME = localStorage.getItem("FILENAME");
if (FILENAME == null) {
    FILENAME = "choices2.json";
}
var OFFSETX = -450;
var MAXDEGREE = 8;
var HITTINGDEPTH = 100;
var heartX;
var winWidth;
var choices = [];
var selectedChoices = [];
var choice = null;
var selectContainer;
var resEle, resTxt;

/*        
* Intialize the content
* Check for cookies and display a username or anonymous
* Do the AJAX call and when finished execute two function, get the data from localstoragea and populate the selects
*  
* @param {String} fn1 Function name, e.g. localStorageData
* @param {String} fn2 Function name, e.g. populate
*/
function init(fn1, fn2) {
    var file = "data/"+FILENAME;
    var user = cookies.getCookie("user");
    heartX = document.getElementById("heart").offsetLeft + 20;
    document.getElementById("heart").style.width = winWidth - document.getElementById("selectContainer").offsetWidth + "px";

    if (user === null) {
        setWelcomeBox("anonymous user!", "Click here to sign up.", 1);
    } else {
        user = JSON.parse(localStorage.getItem(user));
        setWelcomeBox(user.fName + " " + user.lName, "Log out", 0);
    } 
    
    
    // AJAX call
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        choices = JSON.parse(this.responseText);

        if (this.readyState == 4 && this.status == 200) {
            if (user === null || user[FILENAME] === undefined) {
                fn2();
            } else {
                fn1(user);
            }
        }
    };

    xmlhttp.open("GET", file, true);
    xmlhttp.send();
}

/*        
* Dynamically populates the selects based on the chosen value/id
* Also, populates the localstorage with the chosen values
*  
* @param {selectEle} The select element where this function got triggered
*/
function populate(selectEle) {
    var bgImg = document.getElementById("bgImg");
    resTxt = document.querySelector("#heart > a");
    var id;

    if (selectEle === undefined) {
        id = "1";
        selectContainer = document.getElementById("selectContainer");
    } else {
        id = selectEle.value;
        selectContainer = selectEle.parentNode.parentNode; // select > div > div
        
        // the last child is the div element
        var lastChild = selectContainer.lastChild;

        if (lastChild.tagName === "DIV" && !lastChild.classList.contains("arrow")) {
            selectContainer.removeChild(lastChild);
            indexOf = selectedChoices.indexOf(parseInt(lastChild.id));
            selectedChoices = selectedChoices.slice(0, indexOf);
        }

        bgImg.style.backgroundImage = "";
        resTxt.textContent = "";
    }

    var choiceId = parseInt(id); // the id used to look up the data in the choices list
    
    // get the object from the list based on id
    choice = choices.find(function (obj) {
        return obj.id === choiceId;
    }); 
    
    // create the select option
    // check if the object is in the list and if it is a question
    if (choice !== undefined) {
        checkChoices(choice); // store the select id in localstorage if it already doesn't exist

        if (selectedChoices.indexOf(choiceId) === -1) {
            selectedChoices.push(choiceId);
        } // keep track of selects if user is logged in


        var user = cookies.getCookie("user");

        if (user !== null) {
            user = JSON.parse(localStorage.getItem(user));
            user[FILENAME] = selectedChoices;
            localStorage.setItem(user.email, JSON.stringify(user));
        }
    }
}


/*        
* Checks the keys of the choices fetch from JSON. 
* If it does not have the result key, that means that we need to display another select option
*  
* @param {String} choice This is the object fetched from JSON
* @param {String} bgImg Function name, e.g. populate
*/
function checkChoices(choice) {
    var bgImg = document.getElementById("bgImg");

    if (!("result" in choice)) {
        // if the choice object does not contain the result keyword
        var randDegree = Math.floor(Math.random() * MAXDEGREE); // random number between 1 and 10

        randDegree *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // get negative numbers in 50% of the cases

        var newArrow = new Select(choice.id, choice.question, choice.answers, selectContainer, OFFSETX, randDegree);
        newArrow.create();
        newArrow.move();
    } else {
        // it is the end of the tree
        resTxt = document.querySelector("#heart > a");
        resTxt.textContent = choice.result;
        resTxt.setAttribute("href", choice.link);
        var folder = "imgs/" + FILENAME + "/" + choice.id + "/";
        bgImg.style.animation = "img_appearance 3s linear 0s 1 normal;";
        bgImg.style.backgroundImage = "url('".concat(folder, "index.jpg')");
    }
}


/*        
* Sets some dimensions, such as the width of the heart and the container of arrows, when page is resized
*/
function dimensions() {
    winWidth = window.offsetWidth;
    var heart = document.getElementById("heart");
    var selectContainer = document.getElementById("selectContainer");
    heartX = heart.offsetLeft + 20;
    heart.style.width = winWidth - selectContainer.offsetWidth + "px";
    selectContainer.style.width = winWidth - heart.style.width + "px";
}


/*        
* Changes the dataset and initialzes the selected choices for e user save in cookies and localstorage
*  
* @param {String} val The filename
*/
function changeDataSet(val) {
    FILENAME = val;
    localStorage.setItem("FILENAME",FILENAME);

    clearArrows();
    selectedChoices = [];

    // intialize everything
    init(localStorageData, populate);
}

/*        
* Select default a dataset and call init
*/
function load() {
    document.querySelector('#datasets').value = FILENAME;
    changeDataSet(FILENAME);
}

/*        
* Clears the arrows from selectContainer div
*/
function clearArrows() {
    selectContainer = document.getElementById("selectContainer");
    // empties the select container
    while(selectContainer.firstChild){
        selectContainer.removeChild(selectContainer.firstChild);
    }
}