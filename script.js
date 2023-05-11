
function showHome() {
  // Update the page title and content
  window.location = "index.html";
}

function showAbout() {
  window.location = "/about.html";
}
function showNav() {
  var navLinks = document.getElementsByClassName("navbar")[1].getElementsByTagName("a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }
  navLinks[2].classList.add("active");
}

function showContact() {
  window.location = "contact.html";
}

function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function checkCookie() {
  var lastAccess = getCookie("lastAccess");
  var visitCount = getCookie("visitCount");
  var currentDate = new Date();
  var minutes = Math.floor((currentDate.getTime() - lastAccess) / 60000);
  if (minutes >= 5) {
    if (lastAccess != "") {
      document.getElementById("lastAccess").innerHTML = minutes;
      document.getElementById("lastAccess").innerHTML = minutes + " minutes ago";
      document.getElementById("accessCount").innerHTML = parseInt(visitCount) + 1;
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", parseInt(visitCount) + 1, 30);
    } else if (lastAccess = "") {
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", 1, 30);
    }
  } else {
    document.getElementById("accessCount").innerHTML = parseInt(visitCount)
    document.getElementById("lastAccess").innerHTML = minutes + " minutes ago";
  }
}

checkCookie();

function showPassword() {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission behavior
  });

  var passwordInput = document.getElementById("login-password");
  var showButton = document.getElementById("show-button");
  var passwordDisplay = document.getElementById("showed-password");

  if (showButton.getAttribute("type") === "show-button") {
    document.getElementById("showed-password").style.display = "block";
    passwordDisplay.textContent = passwordInput.value;
    passwordDisplay.type = "text";
    showButton.innerHTML = "Hide Password";
    showButton.setAttribute("type", "hide-button");
  } else {
    passwordDisplay.style.display = "none";
    passwordDisplay.type = "password";
    showButton.innerHTML = "Show Password";
    showButton.setAttribute("type", "show-button");
  }
}

function showMenu() {
  var menu = document.getElementById("menu-popup");

  if (menu.style.display === "none") {
    menu.style.display = "block";
  }
  else {
    menu.style.display = "none";
  }
}