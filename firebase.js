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
}); 
    console.log("email")
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log("found email")
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log("loged in")
        document.getElementById("login-form").style.display = "none";
            document.getElementById("profile").style.display = "block";
            document.getElementById("user-email").innerHTML = "Logged in as: " + email;
            if (email === "maj.mohar4@gmail.com") {
                document.getElementById("users").style.display = "block";
                getUsers();
            } else {
                document.getElementById("users").style.display = "none";
            }
        })
        .catch(error => {
            alert(error.message);
        });
}

// Sign up function
function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
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
function signInWithGitHub() {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // prevent default form submission behavior
    }); 
    const clientId = 'eee8e5694fcd93a98188'; // Replace with your own client ID
    const redirectUri = 'https://majmohar.me/login.html'; // Replace with your own redirect URI
    const scope = 'read:user'; // Replace with the scopes you need

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=STATE`;
    window.location.href = url;
  }

  function getUserProfile(accessToken) {
    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("user-login").innerHTML = data.login;
      document.getElementById("user-id").innerHTML = data.id;
      document.getElementById("user-avatar").src = data.avatar_url;
      document.getElementById("profile").style.display = "block";
    })
    .catch(error => {
      alert(error.message);
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  if (code) {
    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: 'eee8e5694fcd93a98188', // Replace with your own client ID
        client_secret: 'd4c88530da139d6b919115072bed31cb5223b198', // Replace with your own client secret
        code: code,
        redirect_uri: 'https://majmohar.me/login.html' // Replace with your own redirect URI
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      const accessToken = new URLSearchParams(data).get('access_token');
      getUserProfile(accessToken);
    })
    .catch(error => {
      alert(error.message);
    });
}