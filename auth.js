auth.onAuthStateChanged((user) => {
    loginForm.reset();
    signupForm.reset();
    if (user) {
        //window.value = user;
        setupUI(user);
    } else {
        setupUI();
    }
});

function createDocs(cred) {
    db.collection('users').doc(cred.user.uid).set({
        username: signupForm['signup-email'].value,
        pass: signupForm['signup-password'].value,
    });
    db.collection('users').doc(cred.user.uid).collection('scores').doc('15').set({
        rawCPMs: [],
        adjustWPMs: [],
        adjustCPMs: [],
        accs: []
    });
    db.collection('users').doc(cred.user.uid).collection('scores').doc('30').set({
        rawCPMs: [],
        adjustWPMs: [],
        adjustCPMs: [],
        accs: []
    });
    db.collection('users').doc(cred.user.uid).collection('scores').doc('60').set({
        rawCPMs: [],
        adjustWPMs: [],
        adjustCPMs: [],
        accs: []
    });
    db.collection('users').doc(cred.user.uid).collection('scores').doc('120').set({
        rawCPMs: [],
        adjustWPMs: [],
        adjustCPMs: [],
        accs: []
    });
}

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errMsgDiv = document.querySelector('#signupMsgDiv')

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            username: signupForm['signup-email'].value,
        });
    }).then(() => {
        let user = auth.currentUser;
        db.collection('users').doc(user.uid).collection('scores').doc('15').set({
            rawCPMs: [],
            adjustWPMs: [],
            adjustCPMs: [],
            accs: []
        });
        db.collection('users').doc(user.uid).collection('scores').doc('30').set({
            rawCPMs: [],
            adjustWPMs: [],
            adjustCPMs: [],
            accs: []
        });
        db.collection('users').doc(user.uid).collection('scores').doc('60').set({
            rawCPMs: [],
            adjustWPMs: [],
            adjustCPMs: [],
            accs: []
        });
        db.collection('users').doc(user.uid).collection('scores').doc('120').set({
            rawCPMs: [],
            adjustWPMs: [],
            adjustCPMs: [],
            accs: []
        });
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        window.location.reload();
    }).catch((err) => {
        errMsgDiv.innerHTML = (err.message);
    });
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errMsgDiv = document.querySelector('#loginMsgDiv')

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        window.location.reload();
    }).catch((err) => {
        errMsgDiv.innerHTML = (err.message);
    });
});

const logOut = document.querySelector('#logout');
logOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

function submitTest(rawcpm, adjustedcpm, adjustedwpm, accuracy, dur, autocorrect) {
    var user = firebase.auth().currentUser;
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    /*
    db.collection('users').doc(user.uid).update({
        rawCPMs: arrayUnion(rawcpm),
        adjustCPMs: arrayUnion(adjustedcpm),
        adjustWPMs: arrayUnion(adjustedwpm),
        accs: arrayUnion(accuracy)
    });
    */
   if(dur == 15 && autocorrect == 0) {
        db.collection('users').doc(user.uid).collection('scores').doc('15').update({
            rawCPMs: arrayUnion(rawcpm),
            adjustWPMs: arrayUnion(adjustedwpm),
            adjustCPMs: arrayUnion(adjustedcpm),
            accs: arrayUnion(accuracy)
        });
   } else if (dur == 30 && autocorrect == 0) {
        db.collection('users').doc(user.uid).collection('scores').doc('30').update({
            rawCPMs: arrayUnion(rawcpm),
            adjustWPMs: arrayUnion(adjustedwpm),
            adjustCPMs: arrayUnion(adjustedcpm),
            accs: arrayUnion(accuracy)
        });
   } else if (dur == 60 && autocorrect == 0) {
        db.collection('users').doc(user.uid).collection('scores').doc('60').update({
        rawCPMs: arrayUnion(rawcpm),
        adjustWPMs: arrayUnion(adjustedwpm),
        adjustCPMs: arrayUnion(adjustedcpm),
        accs: arrayUnion(accuracy)
    });
   } else if (dur == 120 && autocorrect == 0) {
        db.collection('users').doc(user.uid).collection('scores').doc('120').update({
            rawCPMs: arrayUnion(rawcpm),
            adjustWPMs: arrayUnion(adjustedwpm),
            adjustCPMs: arrayUnion(adjustedcpm),
            accs: arrayUnion(accuracy)
        });
   }
   updateResults();
}

var avgAcc;
var avgWpm;
var peakWpm;

$(".acct-15").on("click", updateDisplay);

$(".acct-30").on("click", updateDisplay);

$(".acct-60").on("click", updateDisplay);

$(".acct-120").on("click", updateDisplay);

function updateDisplay(durSetting) {
    console.log("function dumbo");
    let user = auth.currentUser;
    let highestElem = document.querySelector(".highest-wpm");
    let avgWpmElem = document.querySelector(".avg-wpm");
    let avgAccElem = document.querySelector(".avg-acc");
    let container = document.querySelector(".recent-parent");
    
    if(durSetting == 15) {
        db.collection("users").doc(user.uid).collection("scores").doc('15').get().then((doc) => {
            //MAIN STATS
            highestElem.innerHTML = "";
            avgWpmElem.innerHTML = "";
            avgAccElem.innerHTML = "";
            container.innerHTML = "";

            let wpmSum = 0;
            let accSum = 0;
            let rawArr = doc.data().rawCPMs;
            let wpmArr = doc.data().adjustWPMs;
            let accArr = doc.data().accs;
            wpmArr.forEach((item) => (wpmSum += item));
            accArr.forEach((item) => (accSum += item));
            let wpmAvg = wpmSum / wpmArr.length;
            let accAvg = accSum / accArr.length;
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = 0; r < wpmArr.length; r++) {
                var innerParent = document.createElement("tr");
                var recentRawElem = document.createElement("td");
                var recentWpmElem = document.createElement("td");
                var recentAccElem = document.createElement("td");
                recentRawElem.innerHTML = Math.round(rawArr[r] / 5);
                recentWpmElem.innerHTML = wpmArr[r];
                recentAccElem.innerHTML = accArr[r];
                innerParent.appendChild(recentRawElem);
                innerParent.appendChild(recentWpmElem);
                innerParent.appendChild(recentAccElem);
                container.appendChild(innerParent);
            }

        }).catch((err) => { console.log(err)});
    } else if(durSetting == 30) {
        db.collection("users").doc(user.uid).collection("scores").doc('30').get().then((doc) => {
            highestElem.innerHTML = "";
            avgWpmElem.innerHTML = "";
            avgAccElem.innerHTML = "";
            container.innerHTML = "";

            let wpmSum = 0;
            let accSum = 0;
            let rawArr = doc.data().rawCPMs;
            let wpmArr = doc.data().adjustWPMs;
            let accArr = doc.data().accs;
            wpmArr.forEach((item) => (wpmSum += item));
            accArr.forEach((item) => (accSum += item));
            let wpmAvg = wpmSum / wpmArr.length;
            let accAvg = accSum / accArr.length;
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = 0; r < wpmArr.length; r++) {
                var innerParent = document.createElement("tr");
                var recentRawElem = document.createElement("td");
                var recentWpmElem = document.createElement("td");
                var recentAccElem = document.createElement("td");
                recentRawElem.innerHTML = Math.round(rawArr[r] / 5);
                recentWpmElem.innerHTML = wpmArr[r];
                recentAccElem.innerHTML = accArr[r];
                innerParent.appendChild(recentRawElem);
                innerParent.appendChild(recentWpmElem);
                innerParent.appendChild(recentAccElem);
                container.appendChild(innerParent);
            }

        }).catch((err) => { console.log(err)});
    } else if(durSetting == 60) {
        db.collection("users").doc(user.uid).collection("scores").doc('60').get().then((doc) => {
            highestElem.innerHTML = "";
            avgWpmElem.innerHTML = "";
            avgAccElem.innerHTML = "";
            container.innerHTML = "";

            let wpmSum = 0;
            let accSum = 0;
            let rawArr = doc.data().rawCPMs;
            let wpmArr = doc.data().adjustWPMs;
            let accArr = doc.data().accs;
            wpmArr.forEach((item) => (wpmSum += item));
            accArr.forEach((item) => (accSum += item));
            let wpmAvg = wpmSum / wpmArr.length;
            let accAvg = accSum / accArr.length;
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = 0; r < wpmArr.length; r++) {
                var innerParent = document.createElement("tr");
                var recentRawElem = document.createElement("td");
                var recentWpmElem = document.createElement("td");
                var recentAccElem = document.createElement("td");
                recentRawElem.innerHTML = Math.round(rawArr[r] / 5);
                recentWpmElem.innerHTML = wpmArr[r];
                recentAccElem.innerHTML = accArr[r];
                innerParent.appendChild(recentRawElem);
                innerParent.appendChild(recentWpmElem);
                innerParent.appendChild(recentAccElem);
                container.appendChild(innerParent);
            }

        }).catch((err) => { console.log(err)});
    } else if(durSetting == 120) {
        db.collection("users").doc(user.uid).collection("scores").doc('120').get().then((doc) => {
            highestElem.innerHTML = "";
            avgWpmElem.innerHTML = "";
            avgAccElem.innerHTML = "";
            container.innerHTML = "";

            let wpmSum = 0;
            let accSum = 0;
            let rawArr = doc.data().rawCPMs;
            let wpmArr = doc.data().adjustWPMs;
            let accArr = doc.data().accs;
            wpmArr.forEach((item) => (wpmSum += item));
            accArr.forEach((item) => (accSum += item));
            let wpmAvg = wpmSum / wpmArr.length;
            let accAvg = accSum / accArr.length;
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = 0; r < wpmArr.length; r++) {
                var innerParent = document.createElement("tr");
                var recentRawElem = document.createElement("td");
                var recentWpmElem = document.createElement("td");
                var recentAccElem = document.createElement("td");
                recentRawElem.innerHTML = Math.round(rawArr[r] / 5);
                recentWpmElem.innerHTML = wpmArr[r];
                recentAccElem.innerHTML = accArr[r];
                innerParent.appendChild(recentRawElem);
                innerParent.appendChild(recentWpmElem);
                innerParent.appendChild(recentAccElem);
                container.appendChild(innerParent);
            }

        }).catch((err) => { console.log(err)});
    } else {
        return;
    }
}
