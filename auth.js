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
