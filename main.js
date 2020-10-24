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
    var r = Math.random().toString(36).substring(7);
    var current = text[n];
    var newElem = document.createElement("span");
    newElem.setAttribute("id", r);
    newElem.setAttribute("id", "corpus");
    newElem.innerHTML = current + " ";
    parent.appendChild(newElem);
}
//

//TRUNCATE FUNCTION (UNUSED)
function truncate(str, maxLength, useWordBoundary) {
    if (str == null) return '';
    var isTooLong = str.length > maxLength,
        s_ = isTooLong ? str.substr(0, maxLength - 1) : str;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + '&hellip;' : s_;
}
//

//SHUFFLE FUNCTION
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
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
const redo = document.getElementById("redo");
const countdown = document.getElementById("countdown");
const tohide = document.getElementById("to-hide");

inputField.disabled = true;
inputField.value = "";

inputField.addEventListener("keypress", start);
redo.addEventListener("click", () => {
    window.location.reload();
})

var submitted = [];

var allowedLength = 125;
var i = 0;
var correct = 0;
var incorrect = 0;
var lengthOfIncorrect = 0;
var durationSetting;

var fifteens = document.getElementById("15");
var thirtys = document.getElementById("30");
var sixtys = document.getElementById("60");
var onetwentys = document.getElementById("120");

//100% sure there's a better way to do this but can't get anything else to work
fifteens.onclick = () => {
    fifteens.setAttribute("class", "btn-large waves-effect waves-light grey")
    thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    durationSetting = 15;
    tohide.style.display = "none";
    inputField.disabled = false;
    inputField.focus();
}
thirtys.onclick = () => {
    thirtys.setAttribute("class", "btn-large waves-effect waves-light grey")
    sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    durationSetting = 30;
    tohide.style.display = "none";
    inputField.disabled = false;
    inputField.focus();
}
sixtys.onclick = () => {
    sixtys.setAttribute("class", "btn-large waves-effect waves-light grey")
    thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    durationSetting = 60;
    tohide.style.display = "none";
    inputField.disabled = false;
    inputField.focus();
}
onetwentys.onclick = () => {
    onetwentys.setAttribute("class", "btn-large waves-effect waves-light grey")
    sixtys.setAttribute("class", "btn-large waves-effect waves-light lighten-1")
    thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1")
    durationSetting = 120;
    tohide.style.display = "none";
    inputField.disabled = false;
    inputField.focus();
}

function start() {
    inputField.removeEventListener("keypress", start);
    console.log("before");
    inputField.addEventListener("keypress", check);
    var timer = durationSetting * 1000;
    var chungus = durationSetting;
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
    i++;
    submitted.push(inputField.value);
    inputField.value = "";
    inputField.value.replace(/\s+/g, '');
}

function calc() {
    var withoutSpace = inputField.value;
    withoutSpace = withoutSpace.replace(/\s/g, "");
    console.log(withoutSpace);
    var string = submitted.toString();
    string = string.replace(/,/g, ' ');
    var cpm;
    if (durationSetting == 15) {
        cpm = string.length * 4;
    } else if (durationSetting == 30) {
        cpm = string.length * 2;
    } else if (durationSetting == 60) {
        cpm = string.length;
    } else if (durationSetting == 120) {
        cpm = string.length / 2;
    }
    var adjustedCpm = cpm - lengthOfIncorrect;
    var wpm = adjustedCpm / 5;
    wpm = Math.round(wpm);
    var acc = (incorrect / correct) * 100;
    acc = 100 - acc;
    acc = Math.round(acc);

    accDisplay.innerHTML = acc + "%";
    wpmDisplay.innerHTML = wpm;
    cpmDisplay.innerHTML = cpm;
    adjustDisplay.innerHTML = adjustedCpm;
    document.getElementById("text-content").style.display = "none";
}