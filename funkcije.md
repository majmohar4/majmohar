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