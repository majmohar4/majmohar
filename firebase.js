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
        .then((userCredential) => {
            // Create session cookie that expires in 30 days
            const expiresIn = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
            firebase.auth().currentUser.getIdToken(true)
              .then((idToken) => {
                document.cookie = `session=${idToken};expires=${new Date(Date.now() + expiresIn).toUTCString()};path=/`;
              })
              .catch((error) => {
                console.log(error.message);
              });
      
        document.getElementById("login-form").style.display = "none";
            document.getElementById("profile").style.display = "block";
            document.getElementById("user-email").innerHTML = "Logged in as: " + email;
            if (email === "maj.mohar4@gmail.com") {
                document.getElementById("users").style.display = "block";
                getUsers();
            } else {
                document.getElementById("users").style.display = "block";
                const welcome = document.createElement("div");
                welcome.innerHTML = `Hello ${email}! Thanks for logging in to my website. New content: remnote for geography: <a href="https://www.remnote.com/a/6457b968cf00d6698dec6987">Link</a>`;
                document.getElementById("profile").appendChild(welcome);
                
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


function checkSessionCookie() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "session") {
            // Use the Firebase Auth REST API to verify the ID token
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${firebaseConfig.apiKey}`);
            xhr.setRequestHeader("Authorization", `Bearer ${value}`);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    const email = response.users[0].email;
                    document.getElementById("login-form").style.display = "none";
                    document.getElementById("profile").style.display = "block";
                    document.getElementById("user-email").innerHTML = "Logged in as: " + email;
                    if (email === "maj.mohar4@gmail.com") {
                        document.getElementById("users").style.display = "block";
                        getUsers();
                    } else {
                        document.getElementById("users").style.display = "block";
                        const welcome = document.createElement("div");
                        welcome.innerHTML = `Živijo ${email}! Hvala, da si se vpisal na mojo spletno stran.`;
                        welcome.innerHTML = "   Nove stvari: remnote za geografijo: <a href="https://www.remnote.com/a/6457b968cf00d6698dec6987">Link</a>`;
                        welcome.innerHTML = `   Nove stvari: remnote za likovno umetnost: <a href="https://www.remnote.com/a/645aa57fd2258975e69d5b55">Link</a>`;
                        document.getElementById("profile").appendChild(welcome);
                    }
                }
            };
            xhr.send();
            break;
        }
    }
}

window.onload = checkSessionCookie;
