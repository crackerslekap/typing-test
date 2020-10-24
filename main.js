// var text = ["about", "above", "add", "after", "those", "thought", "three", "through", "time", "without", "word", "work", "world", "would", "write", "year", "you", "young", "your"];
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

function truncate(str, maxLength, useWordBoundary) {
    if (str == null) return '';
    var isTooLong = str.length > maxLength,
        s_ = isTooLong ? str.substr(0, maxLength - 1) : str;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + '&hellip;' : s_;
}

console.log(text);

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

/*shuffle(text);
newText = text.toString();
newText = newText.replace(/,/g, ' ');
*/

//document.getElementById("corpus").innerHTML = newText;
const inputField = document.getElementById("input-field");
const wpmDisplay = document.getElementById("final-wpm");
const cpmDisplay = document.getElementById("final-cpm");
const adjustDisplay = document.getElementById("adjust-cpm");
const accDisplay = document.getElementById("acc");
const redo = document.getElementById("redo");

inputField.value = "";
inputField.focus();

redo.addEventListener("click", () => {
    window.location.reload();
})
inputField.addEventListener("keypress", start);

var submitted = [];

var allowedLength = 125;
var i = 0;
var correct = 0;
var incorrect = 0;
var lengthOfIncorrect = 0;

document.getElementById("redo").onclick = () => {
    shuffle(text);
    newText = text.toString();
    newText = newText.replace(/,/g, ' ');
    submitted = [];
    lengthOfIncorrect = 0;
    incorrect = 0;
    correct = 0;
    i = 0;

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

function check(e) {
    if (e.keyCode == 32) {
        accMod();
        e.preventDefault();
        return false;
    }
}

function start() {
    inputField.removeEventListener("keypress", start);
    console.log("before");
    inputField.addEventListener("keypress", check);
    setTimeout(end, 20000);
}

function end() {
    console.log("20s up");
    calc();
}

function calc() {
    var withoutSpace = inputField.value;
    withoutSpace = withoutSpace.replace(/\s/g, "");
    console.log(withoutSpace);
    var string = submitted.toString();
    string = string.replace(/,/g, ' ');
    var cpm = string.length * 3;
    var adjustedCpm = cpm - lengthOfIncorrect;
    var wpm = adjustedCpm / 5;
    wpm = Math.round(wpm);
    var acc = (incorrect / correct) * 100;
    acc = 100 - acc;
    accDisplay.innerHTML = Math.round(acc);
    wpmDisplay.innerHTML = wpm;
    cpmDisplay.innerHTML = cpm;
    adjustDisplay.innerHTML = adjustedCpm;
    /*
    console.log(adjustedCpm);
    console.log(string);
    console.log(wpm);
    */
}