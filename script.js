
function showHome() {
    // Update the page title and content
    document.getElementById("pageTitle").innerHTML = "Home";
    document.getElementById("pageContent").innerHTML = "Welcome to my home page! This site is still under construction, but I hope to have more content soon.";

    // Update the active tab
    var navLinks = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[0].classList.add("active");
}

function showAbout() {
    // Update the page title and content
    document.getElementById("pageTitle").innerHTML = "About";
    document.getElementById("pageContent").innerHTML = "I am a web developer who enjoys building responsive and user-friendly websites. I have experience with HTML, CSS, JavaScript, and Python.";

    // Update the active tab
    var navLinks = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[1].classList.add("active");
}

function showContact() {
document.getElementById("pageTitle").innerHTML = "Contact";
document.getElementById("pageContent").innerHTML = "You can reach me by email at <a href='mailto:maj.mohar4@gmail.com'>maj.mohar4@gmail.com</a>.";
var navLinks = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
}
navLinks[2].classList.add("active");
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
      document.getElementById("accessCount").innerHTML = parseInt(visitCount) + 1;
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", parseInt(visitCount) + 1, 30);
    } else {
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", 1, 30);
    }
  }
  
  checkCookie();