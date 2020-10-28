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

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errMsgDiv = document.querySelector('#signupMsgDiv')

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return dataBase.collection('users').doc(cred.user.uid).set({
            username: signupForm['signup-email'].value,
            pass: signupForm['signup-password'].value,
            rawCPMs: [],
            adjustCPMs: [],
            adjustWPMs: [],
            accs: []
        });
    }).then(() => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
        }).catch(function (error) {
            console.log(error.message);
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
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
    }).catch((err) => {
        errMsgDiv.innerHTML = (err.message);
    });
});

const logOut = document.querySelector('#logout');
logOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});
