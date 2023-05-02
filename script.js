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

// Get the cookie value for "accessCount" and parse it as an integer
var accessCount = parseInt(getCookieValue("accessCount"));

// Set the latestAccess variable to the current time
var latestAccess = new Date();

// Update the "accessCount" cookie with the new value
setCookieValue("accessCount", accessCount + 1);

// Update the HTML to display the access count and latest access time
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("accessCount").innerHTML = accessCount;
    document.getElementById("latestAccess").innerHTML = latestAccess.getMinutes();
});

// Function to get the value of a cookie by name
function getCookieValue(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        if (parts[0] === name) {
            return parts[1];
        }
    }
    return "";
}



// Function to set the value of a cookie
function setCookieValue(name, value) {
    var cookieString = name + "=" + value;
    document.cookie = cookieString;
}