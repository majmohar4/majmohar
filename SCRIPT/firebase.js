function showLogin() {
  window.location = "login.html";
}

function showRegister() {
  window.location = "register.html";
}
const firebaseConfig = {
  apiKey: "AIzaSyC5qgMh1cC8RsfXHafcnJu5BioJRIm1hdw",
  authDomain: "my-website-8f892.firebaseapp.com",
  projectId: "my-website-8f892",
  storageBucket: "my-website-8f892.appspot.com",
  messagingSenderId: "91947991336",
  appId: "1:91947991336:web:663163e19d2c8d5d81901d",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function login() {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission behavior

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const token = getCookie("token");

    if (token) {
      replaceCookieWithFirestore(email)
        .then(() => {
          console.log("Token replaced successfully");
          regularLogin(email, password); // Proceed with regular login
        })
        .catch((error) => {
          console.log("Error replacing token with Firestore:", error);
          regularLogin(email, password); // Fall back to regular login if token replacement fails
        });
    } else {
      createCookieWithFirestore(email)
        .then(() => {
          console.log("Token created successfully");
          regularLogin(email, password); // Proceed with regular login
        })
        .catch((error) => {
          console.log("Error creating token with Firestore:", error);
          regularLogin(email, password); // Fall back to regular login if token creation fails
        });
    }
  });
}
function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
}
function signup() {
  const signupForm = document.getElementById("signup-page");
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission behavior

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const repeatPassword = document.getElementById("repeat-password").value;
    const name = document.getElementById("name-input").value;
    const username = document.getElementById("username-input").value;

    if (password === repeatPassword) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          saveUserInfo(email, name, username);
          alert("Account created successfully.");
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
function logout() {
  auth.signOut()
    .then(() => {
      deleteCookie("token")
      location.reload()
      alert("Logged out successfully.");
    })
    .catch(error => {
      alert(error.message);
    });
}
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
function checkLogin() {
  db.collection("tokens").get()
    .then(querySnapshot => {

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
function replaceCookieWithFirestore(email) {
  return new Promise((resolve, reject) => {
    const usersRef = firebase.firestore().collection("users");
    const query = usersRef.where("email", "==", email).limit(1);

    query
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const firestoreCode = doc.get("token");
          setCookie("token", firestoreCode);
          resolve();
        } else {
          reject(new Error("User not found"));
        }
      })
      .catch((error) => {
        reject(error);
      });
    resolve();
  });
}
function createCookieWithFirestore(email) {
  return new Promise((resolve, reject) => {
    // Get the Firestore code from the Firebase collection "users" based on the email
    const usersRef = firebase.firestore().collection("users");
    const query = usersRef.where("email", "==", email).limit(1);

    query
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const firestoreCode = doc.get("token");

          // Set the Firestore code as the value of the "token" cookie
          setCookie("token", firestoreCode);
          resolve(); // Resolve the promise to indicate success
        } else {
          reject(new Error("User not found"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    const cookieName = decodeURIComponent(cookie[0]);
    const cookieValue = decodeURIComponent(cookie[1]);
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
}
function regularLogin(email, password) {
  console.log("trying to log in")
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Logged");
      document.getElementById("login-form").style.display = "none";
      document.getElementById("profile").style.display = "block";
      getName(email)
        .then((name) => {
          setCookie("name", name)
          document.getElementById("username").innerHTML = "Logged in as " + name;
          SetContent(name);
        })
    })
    .catch((error) => {
      alert(error.message);
    });
}
function checkTokenOnLoad() { 
  if (window.location.href === "/index.html" || window.location.href === "/index.html") {
  } else {
    checkCookie_Box()
    const token = getCookie("token");
    if (token) {
      if (token === "") {
        return
      } else {
        getEmailFromToken(token)
          .then((name) => {
            console.log("Name:", name);
            if ((window.location.pathname === "/login" || window.location.pathname === "/login.html") && name !== "") {
              SetContent(name)
            } else {
              document.getElementById("user-navbar").textContent = name;
              document.getElementById("logout-button").style.display = "block";
            }
          })
          .catch((error) => {
            console.log("Error getting name from email:", error);
          });
      }
    } else {
      console.log("No token found.");
    }
  }
}
function getEmailFromToken(token) {
  return new Promise((resolve, reject) => {
    const tokensRef = firebase.firestore().collection("tokens").doc(token);

    tokensRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const name = data.name;
          resolve(name);
        } else {
          reject(new Error("Token not found"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function SetContent(name) {
  if (name === "Maj") {
    document.getElementById("users").style.display = "block";
    document.getElementById("vsebina_naslov").textContent = "Uporabniki";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("users").style.display = "block";
    document.getElementById("users").classList.add("tekst");
    document.getElementById("user-list").style.marginLeft = "5%";
    document.getElementById("user-navbar").textContent = name;
    document.getElementById("logout-button").style.display = "block";
    getUsers();
  } else {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("users").style.display = "block";
    var welcome = document.createElement("p");
    welcome.innerHTML = `Živijo ${name}! Hvala, da si se vpisal na mojo spletno stran.<br>`;
    welcome.innerHTML += `- nove stvari: <br>`;
    welcome.innerHTML += `&emsp; - remnote za informatiko: <a href="https://www.remnote.com/a/64622bb4650dbdc61c7826ae">Link</a>`;
    document.getElementById("content").appendChild(welcome);
    document.getElementById("content").classList.add("tekst");
    document.getElementById("content").style.marginLeft = "5%";
    document.getElementById("user-navbar").textContent = name;
    document.getElementById("users").classList.add("tekst");
    document.getElementById("logout-button").style.display = "block";
  }
}
function checkCookie_Box() {
  const box_display = getCookie("box_display");
  if (window.location.pathname === "/login" || window.location.pathname === "/register.html" || window.location.pathname === "/login.html") {
    if (box_display) {
      document.getElementById("cookie-banner").style.display = "none"
    } else {
      return
    }
  } else {
    return
  }
}
function CookieDontShow() {
  const CookieShow = document.getElementById("cookie-banner");
  console.log("najden")
  CookieShow.addEventListener("submit", (event) => {
    event.preventDefault();

    setCookie("box_display", 1)
    document.getElementById("cookie-banner").style.display = "none"
  })
}
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

let score = 0;
let timeLeft = 5000;
let countdownInterval;
let isCountdownRunning = false;

document.getElementById("clickGumb").addEventListener("click", handleClick);

function handleClick(score) {
  score++;
  document.getElementById("score").textContent = score;
}
function startCountdown(točke) {
  countdownInterval = setInterval(updateTime(točke), 10);
  isCountdownRunning = true;
}
function updateTime(točke) {
  if (timeLeft > 0) {
    timeLeft -= 10;
    document.getElementById("clickGumb").innerHTML = (timeLeft / 1000).toFixed(3);
  } else {
    clearInterval(countdownInterval);
    isCountdownRunning = false;
    document.getElementById("clickGumb").disabled = true;
    zapišiScore(točke);
  }
}
function reset() {
  score = 0;
  timeLeft = 5000;
  document.getElementById("score").innerHTML = score;
  document.getElementById("clickGumb").innerHTML = (timeLeft / 1000).toFixed(3);
  document.getElementById("clickGumb").disabled = false;
  clearInterval(countdownInterval);
  isCountdownRunning = false;
}
function start() {
  if (!isCountdownRunning) {
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("clickGumb").disabled = false;
    startCountdown(score);
  }
}
function zapišiScore(točke) {
  const ime_tekmovalca = getCookie("name");
  console.log(točke);
  if (ime_tekmovalca === "") {;}
  else{
  preglejPrejšnjeRezultate(ime_tekmovalca, točke)
  .then(() =>{
    console.log("herer");
  } )
}
}
function getFormattedDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}


function preglejPrejšnjeRezultate(ime, točke_dobljene) {
  const date12 = new Date();
  const datum = getFormattedDate(date12);
  const docRef = db.collection("točke").doc(ime);

  return docRef.get().then((doc) => {
    if (doc.exists) {
      const točke = doc.data().score;

      if (isNaN(točke_dobljene)) {
        alert("Vnesi veljavno vrednost točk.");
      } else if (točke_dobljene <= točke) {
        alert("Nisi presegel svojega rekorda!");
      } else if (točke_dobljene > točke) {
        alert("Čestitam, presegel si svoj rekord!");
        docRef.set({
          name: ime,
          date: datum,
          score: točke_dobljene,
        })
        .then(() => {
          console.log("Results saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving results: ", error);
        });
      }
    } else {
      alert("No previous results found.");
      docRef.set({
        name: ime,
        date: datum,
        score: točke_dobljene,
      })
      .then(() => {
        console.log("Results saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving results: ", error);
      });
    }
  });
}


function pokažiNajvišjiRezultat() {
  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = ""; // Clear the existing content

  db.collection("točke")
    .orderBy("score", "desc")
    .limit(10)
    .get()
    .then((querySnapshot) => {
      let index = 1; // Initialize index to 1
      querySnapshot.forEach((doc) => {
        const name = doc.data().name;
        const score = doc.data().score;

        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.id = "tekmovalec_" + index;
        anchor.textContent = name + ": " + score;

        listItem.appendChild(document.createTextNode("\u00A0\u00A0\u00A0" + index + ". mesto:\u00A0"));
        listItem.appendChild(anchor);
        resultsList.appendChild(listItem);

        index++; // Increment index after each iteration
      });
    })
    .catch((error) => {
      console.log("Error getting highest results:", error);
    });
}
