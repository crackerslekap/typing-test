//TEXT INITIALISATION
var text = "power list spite life talk ones lines real sail most more moves notes nose past realm hear nations last walk house move team pages live have lives rain going fail doing ours reality person those sometimes late near note law things hate ship realize images around learn calm mortal poets";
text = text.split(" ");
/*for (var l = 0; l < text.length; l++) {
    if (text[l] == "yourabout") {
        text.splice(l, 1);
        l--;
    }
}
*/

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

const accountDetails = document.getElementById("account-details");
const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");

const setupUI = user => {
    if (user) {
        loggedInLinks.forEach(item => {
            item.style.display = "block";
        });
        loggedOutLinks.forEach(item => {
            item.style.display = "none";
        });
    } else {
        accountDetails.innerHTML = "";
        loggedInLinks.forEach(item => {
        item.style.display = "none";
        });
        loggedOutLinks.forEach(item => {
        item.style.display = "block";
        });
    }
};
var keysPressed = 0;

$("#input-field").on("keypress", () => {
    if(keysPressed % 130 === 0 && keysPressed != 0) {
        const tsection = document.querySelector(".typing-section");
        const getStyle = getComputedStyle(tsection);
        var current = getStyle.height;
        current = current.replace("px", "");
        current = Number(current);
        if(current < 500) {
            current = current + 28.96875;
            current = current.toString();
            current = current + "px";
            const currentHeight = $(".typing-section").css("height");
            tsection.style.height = current;
        } else {
            current = current;
        }
    }
    keysPressed++;
})

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


const inputField = document.getElementById("input-field");
const wpmDisplay = document.getElementById("final-wpm");
const cpmDisplay = document.getElementById("final-cpm");
const adjustDisplay = document.getElementById("adjust-cpm");
const accDisplay = document.getElementById("acc");
const countdown = document.getElementById("countdown");
const tohide = document.getElementById("to-hide");

inputField.disabled = true;
inputField.value = "";

inputField.addEventListener("keypress", start);
$("#redo").on("click", () => {
    window.location.reload();
})

var submitted = [];

var i = 0;
var correct = 0;
var incorrect = 0;
var lengthOfIncorrect = 0;
var lengthOfCorrect = 0;
var durationSetting;
var durationVal;

const fifteens = document.getElementById("15");
const thirtys = document.getElementById("30");
const sixtys = document.getElementById("60");
const onetwentys = document.getElementById("120");
const localStorage = window.localStorage;
durationSetting = Number(localStorage.getItem("duration"));
var autocorrect = Number(localStorage.getItem("autocorrect"));
var themeSetting = Number(localStorage.getItem("themeSetting"));
durationVal = durationSetting;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("countdown").style.display = "block";
    if(themeSetting == 0) {
        $("body").css("background-color", "#212121");

        $(".corpus").css("color", "#f2f3f4");
        $(".changepls").css("color", "#f2f3f4");
        $("#countdown").css("color", "#f2f3f4");    
        $("#input-field").css("color", "#f2f3f4");

        $(".transparentpls").css("background-color", "212121");
        $(".text-content").css("background-color", "#212121");
        $(".typing-content").css("background-color", "#212121");

        $(".theme-toggle").removeClass("white-text");
        $(".theme-toggle").addClass("black-text");
        $(".theme-toggle").removeClass("waves-light");
        $(".theme-toggle").addClass("waves-dark");
        $(".theme-toggle").css("background-color", "#BDBDBD");
    } else {
        $("body").css("background-color", "#f2f3f4");

        $(".corpus").css("color", "#212121");
        $(".changepls").css("color", "#212121");
        $("#countdown").css("color", "#212121");
        $("#input-field").css("color", "#212121");

        $(".transparentpls").css("background-color", "f2f3f4");
        $(".text-content").css("background-color", "#f2f3f4");
        $(".typing-content").css("background-color", "#f2f3f4");


        $(".theme-toggle").addClass("white-text");
        $(".theme-toggle").removeClass("black-text");
        $(".theme-toggle").addClass("waves-light");
        $(".theme-toggle").removeClass("waves-dark");
        $(".theme-toggle").css("background-color", "#212121");
    }

    if(autocorrect == 0) {
        $(".autocorrect").addClass("teal");
        $(".autocorrect").removeClass("grey");
        $(".autocorrect").addClass("white-text");
        $(".autocorrect").removeClass("black-text");
        $(".on-off").text("OFF")
    } else {
        $(".autocorrect").removeClass("teal");
        $(".autocorrect").addClass("grey");
        $(".autocorrect").removeClass("white-text");
        $(".autocorrect").addClass("black-text");
        $(".on-off").text("ON")
    }

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
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
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

$(".autocorrect").on("click", () => {
    if(autocorrect == true) {
        $(".autocorrect").addClass("teal");
        $(".autocorrect").removeClass("grey");
        $(".autocorrect").addClass("white-text");
        $(".autocorrect").removeClass("black-text");
        $(".on-off").text("OFF")
        autocorrect = 0;
        localStorage.setItem("autocorrect", autocorrect.toString());
        inputField.focus();
    } else {
        $(".autocorrect").removeClass("teal");
        $(".autocorrect").addClass("grey");
        $(".autocorrect").removeClass("white-text");
        $(".autocorrect").addClass("black-text");
        $(".on-off").text("ON")
        autocorrect = 1;
        localStorage.setItem("autocorrect", autocorrect.toString());
        inputField.focus();
    }
});


$(".theme-toggle").on("click", () => {
    if(themeSetting == 0) {
        //SET BODY TO WHITE, THEME TOGGLE TO BLACK
        $("body").css("background-color", "#f2f3f4");

        $(".corpus").css("color", "#212121");
        $(".changepls").css("color", "#212121");
        $("#countdown").css("color", "#212121");
        $("#input-field").css("color", "#212121");

        $(".transparentpls").css("background-color", "f2f3f4");
        $(".text-content").css("background-color", "#f2f3f4");
        $(".typing-content").css("background-color", "#f2f3f4");


        $(".theme-toggle").addClass("white-text");
        $(".theme-toggle").removeClass("black-text");
        $(".theme-toggle").addClass("waves-light");
        $(".theme-toggle").removeClass("waves-dark");
        $(".theme-toggle").css("background-color", "#212121");
        themeSetting = 1;
        localStorage.setItem("themeSetting", themeSetting.toString());
    } else {
        //SET BODY TO BLACK, THEME TOGGLE TO WHITE
        $("body").css("background-color", "#212121");

        $(".corpus").css("color", "#f2f3f4");
        $(".changepls").css("color", "#f2f3f4");
        $("#countdown").css("color", "#f2f3f4");
        $("#input-field").css("color", "#f2f3f4");

        $(".transparentpls").css("background-color", "212121");
        $(".text-content").css("background-color", "#212121");
        $(".typing-content").css("background-color", "#212121");

        $(".theme-toggle").removeClass("white-text");
        $(".theme-toggle").addClass("black-text");
        $(".theme-toggle").removeClass("waves-light");
        $(".theme-toggle").addClass("waves-dark");
        $(".theme-toggle").css("background-color", "#BDBDBD");
        themeSetting = 0;
        localStorage.setItem("themeSetting", themeSetting.toString());
    }
});

var chungus;

function start() {
    inputField.removeEventListener("keypress", start);
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

var nodes = document.getElementById("text-content").children;

function accMod() {
    if(autocorrect) {
        inputField.value = text[i];
    }
    if (inputField.value == text[i]) {
        nodes[i].style.color = "#26A69A";
        correct++;
        lengthOfCorrect += inputField.value.length;
    } else {
        nodes[i].style.color = "#C62828";
        incorrect++;
        lengthOfIncorrect += inputField.value.length;
    }
    i++;
    submitted.push(inputField.value);
    inputField.value = "";
    inputField.value.replace(/\s+/g, '');
}
var realCPM;
var realWPM;
var adjustWPM;

$(document).keydown(function () {
/*
    realCPM = Math.round(submitted.toString().length * 60 / (durationSetting - chungus));
    realWPM = realCPM / 5;
    realWPM = Math.round(realWPM);
    adjustCPM = realCPM - lengthOfIncorrect;
    adjustWPM = adjustCPM / 5;
    adjustWPM = Math.round(adjustWPM);
*/
    realCPM = Math.round((correct + incorrect) * 5 * 60 / (durationSetting - chungus));
    realWPM = Math.round(realCPM / 5);
    adjustCPM = Math.round(correct * 5 * 60 / (durationSetting - chungus));
    adjustWPM = Math.round(adjustCPM / 5);
    if(realWPM < 0 || realWPM > 1000 || adjustWPM < 0 || adjustWPM > 1000){
        realWPM = '';
        adjustWPM = '';
    }
    $('#raw').html(realWPM);
    $('#adjusted').html(adjustWPM);
});

/*function updateData(rawcpm, adjustcpm, adjustwpm, acc) {
    db
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
        db.collection('users').doc(cred.user.uid).update({
            rawCPMs: db.FieldValue.arrayUnion(rawcpm),
            adjustCPMs: db.FieldValue.arrayUnion(adjustcpm),
            adjustWPMs: db.FieldValue.arrayUnion(adjustwpm),
            accs: db.FieldValue.arrayUnion(acc)
        });
        console.log(db.collection('users').doc(cred.user.uid));
    });
}*/

var acc;
const tsection = document.querySelector(".text-content");
const input = document.querySelector(".input");

function calc() {
    document.getElementById("countdown").style.display = "none";
    acc = (incorrect / correct) * 100;
    acc = 100 - acc;
    acc = Math.round(acc);
    /*
    lengthOfIncorrect = incorrect * 5;
    adjustedCpm = cpm - lengthOfIncorrect;
    wpm = adjustedCpm / 5;
    wpm = Math.round(wpm);
    */
   /*
    var toModify;
    var acc = (incorrect / correct) * 100;
    acc = 100 - acc;
    acc = Math.round(acc);
    realCPM = Math.round(string.length * 60 / durationSetting);
    realWPM = realCPM / 5;
    realWPM = Math.round(realWPM);
    lengthOfIncorrect = incorrect * 5;
    adjustCPM = realCPM - lengthOfIncorrect;
    adjustWPM = adjustCPM / 5;
    adjustWPM = Math.round(adjustWPM);
    if(realWPM < 0 || realWPM > 400 || adjustWPM < 0 || adjustWPM > 400){
        realWPM = '';
        adjustWPM = '';
    }
    */



   submitTest(realCPM, adjustCPM, adjustWPM, acc, durationSetting, autocorrect);
}

document.querySelector(".acct-15").addEventListener("click", function pre() {
    updateDisplay(15);
});
document.querySelector(".acct-30").addEventListener("click", function pre() {
    updateDisplay(30);
})
document.querySelector(".acct-60").addEventListener("click", function pre() {
    updateDisplay(60);
})
document.querySelector(".acct-120").addEventListener("click", function pre() {
    updateDisplay(120);
})

function updateResults() {
    tsection.style.display = "none";
    input.style.backgroundColor = "transparent";
    $(".typing-section").removeClass("grey");

    acc = String(acc);
    accDisplay.innerHTML = acc + "%";
    wpmDisplay.innerHTML = String(adjustWPM);
    cpmDisplay.innerHTML = String(realCPM);
    adjustDisplay.innerHTML = String(adjustCPM);

    $("#preview").css("display", "none");
    $("#text-content").css("display", "none");

}