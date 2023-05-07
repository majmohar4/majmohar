
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
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
  
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
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
    if (lastAccess != "") {
      document.getElementById("lastAccess").innerHTML = minutes;
      document.getElementById("lastAccess").innerHTML = minutes + " minutes ago";
      document.getElementById("accessCount").innerHTML = parseInt(visitCount) + 1;
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", parseInt(visitCount) + 1, 30);
    } else {
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", 1, 30);
    }
  }
  
  checkCookie();

  function showPassword() {
    var passwordInput = document.getElementById("login-password");
    var passwordDisplay = document.getElementById("login-password");
    var showButton = document.getElementById("show-button");
    
    setTimeout(function() {
      // Do something after 3 seconds
      console.log("3 seconds have passed!");
    }, 3000);
    if (passwordInput.type === "password") {
      passwordDisplay.innerHTML = passwordInput.value;
      passwordInput.type = "text";
      showButton.innerHTML = "Hide Password";
    } else {
      passwordDisplay.innerHTML = "*".repeat(passwordInput.value.length);
      passwordInput.type = "password";
      showButton.innerHTML = "Show Password";
    }
  }