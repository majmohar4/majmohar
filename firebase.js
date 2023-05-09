function showLogin() {
    window.location = "login.html";
    // Update the active tab
    var navLinks = document.getElementsByClassName("login")[0].getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[1].classList.add("active");
}
function showRegister() {
  window.location = "register.html";
  var navLinks = document.getElementsByClassName("register")[0].getElementsByTagName("a");
  for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
  }
  navLinks[1].classList.add("active");
}
const firebaseConfig = {
    apiKey: "AIzaSyC5qgMh1cC8RsfXHafcnJu5BioJRIm1hdw",
    authDomain: "my-website-8f892.firebaseapp.com",
    projectId: "my-website-8f892",
    storageBucket: "my-website-8f892.appspot.com",
    messagingSenderId: "91947991336",
    appId: "1:91947991336:web:663163e19d2c8d5d81901d",
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = firebase.auth();

// Get a reference to the Firestore database
const db = firebase.firestore();

// Login function
function login() {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // prevent default form submission behavior

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("logged in");
        document.getElementById("login-form").style.display = "none";
            document.getElementById("profile").style.display = "block";
            document.getElementById("user-email").innerHTML = "Logged in as: " + email;
            if (email === "maj.mohar4@gmail.com") {
                document.getElementById("users").style.display = "block";
                getUsers();
            } else {
                welcome = <div>
                    Hello {user}!
                    Thanks for login into my website.
                    New content: 
                        remnote for geography: <link src="https://www.remnote.com/a/6457b968cf00d6698dec6987">Link</link>
                </div>
                document.getElementById("users").style.display = welcome;
            }
        })
        .catch(error => {
            alert(error.message);
        });
    })
}

// Sign up function
function signup() {
    console.log("prevented")
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent default form submission behavior
    }); 
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const repeat_password = document.getElementById("repeat-password").value;
    console.log(password + " in " + repeat_password)
    if (password === repeat_password){
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Account created successfully!");
            user.sendEmailVerification()
                .then(() => {
                    alert("Verification email sent!");
                })
                .catch(error => {
                    alert(error.message);
                });
        })
        .catch(error => {
            alert(error.message);
            alert("Account not created! Try again.")
        });
    }else{
        alert("Passwords do not match.");
    }
}

// Logout function
function logout() {
    auth.signOut()
        .then(() => {
            location.reload();
            alert("Logged out successfully!");
        })
        .catch(error => {
            alert(error.message);
        });
}

// Get all users
function getUsers() {
    db.collection("users").get()
        .then(querySnapshot => {
            const userList = document.getElementById("user-list");
            querySnapshot.forEach(doc => {
                const user = doc.data();
                const li = document.createElement("li");
                li.innerHTML = user.name + " (" + user.email + ")";
                userList.appendChild(li);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}