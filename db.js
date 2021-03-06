var user = firebase.auth().currentUser;
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

function submitTest(rawcpm, adjustedcpm, adjustedwpm, accuracy, dur, autocorrect) {
    user = firebase.auth().currentUser;

    if(user != null) {
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
    }

   updateResults();
}

function checkForDuplicates(array) {
    let valuesAlreadySeen = []
  
    for (let i = 0; i < array.length; i++) {
      let value = array[i]
      if (valuesAlreadySeen.indexOf(value) !== -1) {
        return true
      }
      valuesAlreadySeen.push(value)
    }
    return false
  }
  

$(".acct-15.acct-30.acct-60.acct-120").on("click", updateDisplay);

function updateLb(durSetting) {

    var itemArr = [];
    var toPush = []
    db.collection("users").get().then((response) => {
        response.forEach((doc) => {
            var tempId = doc.id;
            db.collection("users").doc(tempId).collection("scores").onSnapshot(snapshot => {
                var snapshot = snapshot;
                snapshot.forEach((doc) => {
                    /*db.collection("users").doc(tempId).collection("scores").*/
                    //if(itemArr.indexOf(tempUsername) === -1 ? itemArr.push(tempUsername) : console.log("already exists"));;
                    toPush.push(doc.data());
                });
                itemArr = itemArr.concat(toPush);
                lbCont(itemArr, durSetting);
            });
        });
    });
}

function lbCont(itemArr, durSetting) {

    const fifteens = document.querySelector(".lb-15");
    const thirtys = document.querySelector(".lb-30");
    const sixtys = document.querySelector(".lb-60");
    const onetwentys = document.querySelector(".lb-120");

    if(durSetting == 15) {
        fifteens.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text lb-15");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-30");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-60");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-120");

        const container = document.querySelector(".lb-parent");
        container.innerHTML = "";
        itemArr.forEach((item) => {
            if(item.durSetting == "15") {
                if(document.querySelector("." + item.username)) {
                    console.log("exists already");
                } else {
                    if(item.rawCPMs.length > 0) {
                        var innerParent = document.createElement("tr");
                        var userElem = document.createElement("td");
                        var rawElem = document.createElement("td");
                        var adjustElem = document.createElement("td");
                        var accElem = document.createElement("td");

                        var adjustWpm = Math.max(...item.adjustWPMs);
                        var tempAdjIndex = item.adjustWPMs.indexOf(adjustWpm);
                        var rawWpm = item.rawCPMs[tempAdjIndex] / 5;
                        var acc = item.accs[tempAdjIndex];

                        accElem.innerHTML = acc;
                        userElem.innerHTML = item.username;
                        rawElem.innerHTML = rawWpm;
                        adjustElem.innerHTML = adjustWpm;
                        innerParent.setAttribute("myAttribute", adjustWpm);
                        innerParent.appendChild(userElem);
                        innerParent.appendChild(rawElem);
                        innerParent.appendChild(adjustElem);
                        innerParent.appendChild(accElem);
                        innerParent.setAttribute("class", item.username);
                        innerParent.setAttribute("id", "item");
                        container.appendChild(innerParent);
                    } else {
                        container.innerHTML = "";
                    }
                }

            }
        });


    } else if(durSetting == 30) {
        thirtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text lb-30");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-60");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-15");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-120");

        
        const container = document.querySelector(".lb-parent");
        container.innerHTML = "";

        itemArr.forEach((item) => {
            if(item.durSetting == "30") {

                if(document.querySelector("." + item.username)) {
                    console.log("exists already");
                } else {
                    if(item.rawCPMs.length > 0) {
                        var innerParent = document.createElement("tr");
                        var userElem = document.createElement("td");
                        var rawElem = document.createElement("td");
                        var adjustElem = document.createElement("td");
                        var accElem = document.createElement("td");

                        var adjustWpm = Math.max(...item.adjustWPMs);
                        var tempAdjIndex = item.adjustWPMs.indexOf(adjustWpm);
                        var rawWpm = item.rawCPMs[tempAdjIndex] / 5;
                        var acc = item.accs[tempAdjIndex];
                        
                        accElem.innerHTML = acc;
                        userElem.innerHTML = item.username;
                        rawElem.innerHTML = rawWpm;
                        adjustElem.innerHTML = adjustWpm;
                        innerParent.setAttribute("myAttribute", adjustWpm);
                        innerParent.appendChild(userElem);
                        innerParent.appendChild(rawElem);
                        innerParent.appendChild(adjustElem);
                        innerParent.appendChild(accElem);
                        innerParent.setAttribute("class", item.username);
                        innerParent.setAttribute("id", "item");
                        container.appendChild(innerParent);
                    } else {
                        container.innerHTML = "";
                    }
                }

            }
        });

    } else if(durSetting == 60) {
        sixtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text lb-60");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-30");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-15");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-120");

        
        const container = document.querySelector(".lb-parent");
        container.innerHTML = "";

        itemArr.forEach((item) => {
            if(item.durSetting == "60") {

                if(document.querySelector("." + item.username)) {
                    console.log("exists already");
                } else {
                    if(item.rawCPMs.length > 0) {
                        var innerParent = document.createElement("tr");
                        var userElem = document.createElement("td");
                        var rawElem = document.createElement("td");
                        var adjustElem = document.createElement("td");
                        var accElem = document.createElement("td");

                        var adjustWpm = Math.max(...item.adjustWPMs);
                        var tempAdjIndex = item.adjustWPMs.indexOf(adjustWpm);
                        var rawWpm = item.rawCPMs[tempAdjIndex] / 5;
                        var acc = item.accs[tempAdjIndex];

                        accElem.innerHTML = acc;
                        userElem.innerHTML = item.username;
                        rawElem.innerHTML = rawWpm;
                        adjustElem.innerHTML = adjustWpm;
                        innerParent.setAttribute("myAttribute", adjustWpm);
                        innerParent.appendChild(userElem);
                        innerParent.appendChild(rawElem);
                        innerParent.appendChild(adjustElem);
                        innerParent.appendChild(accElem);
                        innerParent.setAttribute("class", item.username);
                        innerParent.setAttribute("id", "item");
                        container.appendChild(innerParent);
                    } else {
                        container.innerHTML = "";
                    }
                }

            }
        });

    } else if(durSetting == 120) {
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text lb-120");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light lighten-1 lb-60");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-30");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 lb-15");

        
        const container = document.querySelector(".lb-parent");
        container.innerHTML = "";

        itemArr.forEach((item) => {
            if(item.durSetting == "120") {
                if(document.querySelector("." + item.username)) {
                    console.log("exists already");
                } else {
                    if(item.rawCPMs.length > 0) {
                        var innerParent = document.createElement("tr");
                        var userElem = document.createElement("td");
                        var rawElem = document.createElement("td");
                        var adjustElem = document.createElement("td");
                        var accElem = document.createElement("td");

                        var adjustWpm = Math.max(...item.adjustWPMs);
                        var tempAdjIndex = item.adjustWPMs.indexOf(adjustWpm);
                        var rawWpm = item.rawCPMs[tempAdjIndex] / 5;
                        var acc = item.accs[tempAdjIndex];

                        accElem.innerHTML = acc;
                        userElem.innerHTML = item.username;
                        rawElem.innerHTML = rawWpm;
                        adjustElem.innerHTML = adjustWpm;
                        innerParent.setAttribute("myAttribute", adjustWpm);
                        innerParent.appendChild(userElem);
                        innerParent.appendChild(rawElem);
                        innerParent.appendChild(adjustElem);
                        innerParent.appendChild(accElem);
                        innerParent.setAttribute("class", item.username);
                        innerParent.setAttribute("id", "item");
                        container.appendChild(innerParent);
                    } else {
                        container.innerHTML = "";
                    }
                }

            }
        });

    }
    var tb = $('.lb-parent');
    var rows = tb.find('tr');
    rows.sort(function(a, b) {
        var keyA = $(a).attr('myAttribute');
        var keyB = $(b).attr('myAttribute');
        return keyB - keyA;
    });
    $.each(rows, function(index, row) {
        tb.append(row);
    });
}


/*
db.collection("users").get().then((doc) => {
            var tempArr = [];
            const response = doc.data.forEach((doc) => {
                tempArr.push(doc.data());
            });
            console.log(tempArr);
        });
        */

function updateDisplay(durSetting) {
    let user = auth.currentUser;
    const highestElem = document.querySelector(".highest-wpm");
    const avgWpmElem = document.querySelector(".avg-wpm");
    const avgAccElem = document.querySelector(".avg-acc");
    const container = document.querySelector(".recent-parent");
    const fifteens = document.querySelector(".acct-15");
    const thirtys = document.querySelector(".acct-30");
    const sixtys = document.querySelector(".acct-60");
    const onetwentys = document.querySelector(".acct-120");

    if(durSetting == 15) {
        fifteens.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text acct-15");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-30");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-60");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-120");

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
            let wpmAvg = Math.round(wpmSum / wpmArr.length);
            let accAvg = Math.round(accSum / accArr.length);
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = wpmArr.length - 1; r >= 0; r--) {
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
        thirtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text acct-30");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-60");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-15");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-120");
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
            let wpmAvg = Math.round(wpmSum / wpmArr.length);
            let accAvg = Math.round(accSum / accArr.length);
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = wpmArr.length - 1; r >= 0; r--) {
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
        sixtys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text acct-60");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-30");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-15");
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-120");
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
            let wpmAvg = Math.round(wpmSum / wpmArr.length);
            let accAvg = Math.round(accSum / accArr.length);
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = wpmArr.length - 1; r >= 0; r--) {
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
        onetwentys.setAttribute("class", "btn-large waves-effect waves-light grey lighten-1 black-text acct-120");
        sixtys.setAttribute("class", "btn-large waves-effect waves-light lighten-1 acct-60");
        thirtys.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-30");
        fifteens.setAttribute("class", "btn-large waves-effect waves-light teal lighten-1 acct-15");
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
            let wpmAvg = Math.round(wpmSum / wpmArr.length);
            let accAvg = Math.round(accSum / accArr.length);
            let max = Math.max(...wpmArr);
            highestElem.innerHTML = max;
            avgWpmElem.innerHTML = wpmAvg;
            avgAccElem.innerHTML = accAvg;

            //RECENT SCORES
            for(var r = wpmArr.length - 1; r >= 0; r--) {
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
