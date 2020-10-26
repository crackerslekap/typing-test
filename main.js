//TEXT INITIALISATION
var text = "about above add after again air all almost along also always America an and animal another answer any are around as ask at away back be because been before began begin being below between big book both boy but by call came can car carry change children city close come could country cut day did different do does don't down each earth eat end enough even every example eye face family far father feet few find first follow food for form found four from get girl give go good got great group grow had hand hard has have he head hear help her here high him his home house how idea if important in Indian into is it its it's just keep kind know land large last later learn leave left let letter life light like line list little live long look made make man many may me mean men might mile miss more most mother mountain move much must my name near need never new next night no not now number of off often oil old on once one only open or other our out over own page paper part people picture place plant play point put question quick quickly quite read really right river run said same saw say school sea second see seem sentence set she should show side small so some something sometimes song soon sound spell start state still stop story study such take talk tell than that the their them then there these they thing think this those thought three through time to together too took tree try turn two under until up us use very walk want was watch water way we well went were what when where which while white who why will with without word work world would write year you young yourabout above add after again air all almost along also always America an and animal another answer any are around as ask at away back be because been before began begin being below between big book both boy but by call came can car carry change children city close come could country cut day did different do does don't down each earth eat end enough even every example eye face family far father feet few find first follow food for form found four from get girl give go good got great group grow had hand hard has have he head hear help her here high him his home house how idea if important in Indian into is it its it's just keep kind know land large last later learn leave left let letter life light like line list little live long look made make man many may me mean men might mile miss more most mother mountain move much must my name near need never new next night no not now number of off often oil old on once one only open or other our out over own page paper part people picture place plant play point put question quick quickly quite read really right river run said same saw say school sea second see seem sentence set she should show side small so some something sometimes song soon sound spell start state still stop story study such take talk tell than that the their them then there these they thing think this those thought three through time to together too took tree try turn two under until up us use very walk want was watch water way we well went were what when where which while white who why will with without word work world would write year you young your";
text = text.split(" ");
for (var l = 0; l < text.length; l++) {
    if (text[l] == "yourabout") {
        text.splice(l, 1);
        l--;
    }
}
shuffle(text);
for (var n = 0; n < text.length; n++) {
    let parent = document.getElementById("text-content");
    var current = text[n];
    var newElem = document.createElement("span");
    newElem.setAttribute("id", "corpus");
    newElem.setAttribute("class", "corpus");
    newElem.innerHTML = current + " ";
    parent.appendChild(newElem);
}

/*
var toTruncate = 125;
var arrList = [];
var items = document.querySelectorAll(".corpus");
for (var k = 0; k < items.length; k++) {
    arrList.push(items[k].innerHTML);
}
arrList = arrList.toString();
arrList = truncate(arrList, toTruncate, true);
arrList = arrList.split(',');
for (var p = 0; p < items.length; p++) {
    items[p].innerHTML = arrList[p];
}
console.log(arrList);
*/

var keysPressed = 0;

$("#input-field").on("keypress", () => {
    if(keysPressed % 150 === 0 && keysPressed != 0) {
        const tsection = document.querySelector(".typing-section");
        const getStyle = getComputedStyle(tsection);
        var current = getStyle.height;
        current = current.replace("px", "");
        current = Number(current);
        if(current < 500) {
            current = current + 25.75;
            current = current.toString();
            current = current + "px";
            const currentHeight = $(".typing-section").css("height");
            console.log(currentHeight);
            tsection.style.height = current;
        } else {
            current = current;
        }
    }
    keysPressed++;
})

/*
function truncate(str, maxLength, useWordBoundary) {
    if (str == null) return '';
    var isTooLong = str.length > maxLength,
        s_ = isTooLong ? str.substr(0, maxLength - 1) : str;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + '&hellip;' : s_;
}
*/

//SHUFFLE FUNCTION
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//

const inputField = document.getElementById("input-field");
const wpmDisplay = document.getElementById("final-wpm");
const cpmDisplay = document.getElementById("final-cpm");
const adjustDisplay = document.getElementById("adjust-cpm");
const accDisplay = document.getElementById("acc");
//const redo = document.getElementById("redo");
const countdown = document.getElementById("countdown");
const tohide = document.getElementById("to-hide");

inputField.disabled = true;
inputField.value = "";

inputField.addEventListener("keypress", start);
$("#redo").on("click", () => {
    window.location.reload();
})
/*
redo.addEventListener("click", () => {
    window.location.reload();
})
*/

var submitted = [];

var i = 0;
var correct = 0;
var incorrect = 0;
var lengthOfIncorrect = 0;
var durationSetting;

const fifteens = document.getElementById("15");
const thirtys = document.getElementById("30");
const sixtys = document.getElementById("60");
const onetwentys = document.getElementById("120");
const localStorage = window.localStorage;
durationSetting = Number(localStorage.getItem("duration"));

document.addEventListener("DOMContentLoaded", () => {
    var durationVal = Number(localStorage.getItem("duration"));
    console.log(durationVal);
    if(durationVal == 15) {
        fifteens.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        inputField.disabled = false;
        inputField.focus();
    } else if(durationVal == 30) {
        thirtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        inputField.disabled = false;
        inputField.focus();
    } else if(durationVal == 60) {
        sixtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        inputField.disabled = false;
        inputField.focus();
    } else if(durationVal == 120) {
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light lighten-1");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
        inputField.disabled = false;
        inputField.focus();
    }
});

//100% sure there's a better way to do this but can't get anything else to work
fifteens.onclick = () => {
    fifteens.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
    thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    durationSetting = 15;
    localStorage.setItem("duration", durationSetting.toString());
    window.location.reload();
    inputField.disabled = false;
    inputField.focus();
}
thirtys.onclick = () => {
    thirtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
    sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    durationSetting = 30;
    localStorage.setItem("duration", durationSetting.toString());
    window.location.reload();
    inputField.disabled = false;
    inputField.focus();
}
sixtys.onclick = () => {
    sixtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
    thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    durationSetting = 60;
    localStorage.setItem("duration", durationSetting.toString());
    window.location.reload();
    inputField.disabled = false;
    inputField.focus();
}
onetwentys.onclick = () => {
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text");
    sixtys.setAttribute("class", "btn-large waves-effect waves-light lighten-1");
    thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1");
    durationSetting = 120;
    localStorage.setItem("duration", durationSetting.toString());
    window.location.reload();
    inputField.disabled = false;
    inputField.focus();
}

var chungus;

function start() {
    inputField.removeEventListener("keypress", start);
    console.log("before");
    inputField.addEventListener("keypress", check);
    var timer = durationSetting * 1000;
    chungus = durationSetting;
    var countdown = setInterval(function () {
        chungus--;
        document.getElementById("countdown").innerHTML = chungus;
        if (chungus <= 0) clearInterval(countdown);
    }, 1000);
    setTimeout(calc, timer);
}

function check(e) {
    if (e.keyCode == 32) {
        accMod();
        e.preventDefault();
        return false;
    }
}

function accMod() {
    var nodes = document.getElementById("text-content").children;
    if (inputField.value == text[i]) {
        nodes[i].style.color = "#26A69A";
        correct++;
    } else {
        nodes[i].style.color = "#C62828";
        incorrect++;
        lengthOfIncorrect += text[i].length;
    }
    //also 100% sure there is a better way to do this but I can't figure anything else out :(
        /*
    if (i % 25 === 0 && i != 0 && i != 1) {
        const tsection = document.querySelector(".typing-section");
        const getStyle = getComputedStyle(tsection);
        var current = getStyle.height;
        current = current.replace("px", "");
        current = Number(current);
        if(current < 500) {
            current = current + 25.75;
            current = current.toString();
            current = current + "px";
            const currentHeight = $(".typing-section").css("height");
            console.log(currentHeight);
            tsection.style.height = current;
        } else {
            current = current;
        }
    }
    */
    i++;
    submitted.push(inputField.value);
    inputField.value = "";
    inputField.value.replace(/\s+/g, '');
}

var realWPM;
var adjustWPM;

$(document).keydown(function (k) {
        realCPM = Math.round(submitted.toString().length * 60 / (durationSetting - chungus));
        realWPM = realCPM / 5;
        adjustCPM = realCPM - lengthOfIncorrect;
        adjustWPM = adjustCPM / 5;
        adjustWPM = Math.round(adjustWPM);
        $('#raw').html(realWPM);
        $('#adjusted').html(adjustWPM);
    })

function calc() {
    const tsection = document.querySelector(".text-content");
    const input = document.querySelector(".input");
    var cpm;
    var wpm;
    var adjustedCpm;
    var acc;
    var withoutSpace = inputField.value;
    withoutSpace = withoutSpace.replace(/\s/g, "");
    console.log(withoutSpace);
    var string = submitted.toString();
    string = string.replace(/,/g, ' ');
    cpm = string.length * 60 / durationSetting;

    var acc = (incorrect / correct) * 100;
    var toModify;
    acc = 100 - acc;
    acc = Math.round(acc);
    adjustedCpm = cpm - lengthOfIncorrect;
    wpm = adjustedCpm / 5;
    wpm = Math.round(wpm);

    adjustedCpm = String(adjustedCpm);
    wpm = String(wpm);
    acc = String(acc);

    if(acc.includes("-")) {
        acc = "ERR";
    }

    if(wpm.includes("-")) {
        wpm = "ERR";
    }

    if(adjustedCpm.includes("-")) {
        adjustedCpm = "ERR";
        toModify = "";
    } else {
        toModify = "%";
    }

    tsection.style.display = "none";
    input.style.backgroundColor = "transparent";
    $(".typing-section").removeClass("grey");

    accDisplay.innerHTML = acc + toModify;
    wpmDisplay.innerHTML = wpm;
    cpmDisplay.innerHTML = cpm;
    adjustDisplay.innerHTML = adjustedCpm;

    $("#preview").css("display", "none");

    document.getElementById("text-content").style.display = "none";
}