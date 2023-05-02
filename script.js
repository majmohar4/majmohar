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

function setCookie(cname, cvalue, exminutes) {
    var d = new Date();
    d.setTime(d.getTime() + (exminutes * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = parseInt(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  function checkCookie() {
    var lastAccess = getCookie("last_access");
    var visitCount = getCookie("visit_count");
  
    if (lastAccess != "") {
      var minutes = Math.floor((new Date() - new Date(lastAccess)) / 1000 / 60);
      document.getElementById("last_access").innerHTML = minutes + " minutes ago";
    } else {
      document.getElementById("last_access").innerHTML = "Never";
    }
  
    if (visitCount != "") {
      visitCount = parseInt(visitCount) + 1;
    } else {
      visitCount = 1;
    }
  
    setCookie("last_access", new Date(), 60*24);
    setCookie("visit_count", visitCount, 60*24);
  
    document.getElementById("visit_count").innerHTML = visitCount + " times";
  }
  
  checkCookie();
  