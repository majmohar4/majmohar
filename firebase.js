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
  
      checkEmailVerification();
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Logged");
          document.getElementById("login-form").style.display = "none";
          if (checkEmailVerification != false) {
            alert("Email is not verified.");
          }
          document.getElementById("profile").style.display = "block";
          document.getElementById("username").innerHTML = "Logged in as: " + email;
          if (email === "maj.mohar4@gmail.com") {
            document.getElementById("users").style.display = "block";
            document.getElementById("profile").style.display = "block";
            getName(email)
              .then((retrievedName) => {
                document.getElementById("username").innerHTML = retrievedName;
                getUsers();
              })
              .catch((error) => {
                console.log("Error getting user information:", error);
              });
          } else {
            document.getElementById("users").style.display = "block";
            const welcome = document.createElement("div");
            getName(email)
              .then((retrievedName) => {
                welcome.innerHTML = `Živijo ${retrievedName}! Hvala, da si se vpisal na mojo spletno stran.`;
                welcome.innerHTML += `   Nove stvari: remnote za informatiko: <a href="https://www.remnote.com/a/64622bb4650dbdc61c7826ae">Link</a>`;
                document.getElementById("profile").appendChild(welcome);
              })
              .catch((error) => {
                console.log("Error getting user information:", error);
              });
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    });
  }
  

// Sign up function
function signup() {
    const signupForm = document.getElementById("login-form");
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent default form submission behavior
        console.log("Signed up");
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const repeatPassword = document.getElementById("repeat-password").value;
      const name = document.getElementById("name-input").value;
      const username = document.getElementById("username-input").value;
  
      if (password === repeatPassword) {
        auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            alert("Account created successfully!");
            user.sendEmailVerification()
              .then(() => {
                alert("Verification email sent!");
              })
              .catch((error) => {
                alert(error.message);
              });
            saveUserInfo(email, name, username);
            window.location = "login.html";
          })
          .catch((error) => {
            alert(error.message);
            alert("Account not created! Try again.");
          });
      } else {
        alert("Passwords do not match.");
      }
    });
  }
  
function saveUserInfo(email, name, username) {
    db.collection("users")
      .doc(email)
      .set({
        name: name,
        email: email,
        username: username
      })
      .then(() => {
        console.log("User information saved successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  
function checkEmailVerification() {
    const user = auth.currentUser;
    
    if (user && user.emailVerified) {
        return false
    } else {
      console.log("Email is not verified.");
    }
  }

  function getName(email) {
    const userRef = db.collection("users").doc(email);
  
    return userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const name = data.name;
          return name;
        } else {
          throw new Error("User not found in Firestore.");
        }
      })
      .catch((error) => {
        throw error;
      });
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
                        welcome.innerHTML += '   Nove stvari: remnote za geografijo: <a href="https://www.remnote.com/a/6457b968cf00d6698dec6987">Link</a>';
                        welcome.innerHTML += '   Nove stvari: remnote za likovno umetnost: <a href="https://www.remnote.com/a/645aa57fd2258975e69d5b55">Link</a>';
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
