document.getElementById("preloader").visible = true;
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("preloader").visible = false;
  //Initialize variables
  let login = document.getElementById("login_input");
  let password = document.getElementById("password_input");
  let button = document.getElementById("login_btn");
  
  //Check length login/password input (observer)
  function update() {
    if (login.value.trim().length >= 1 && password.value.trim().length >= 1) {
      button.style.color = "#ffffff";
      button.style.border = "2px solid ";
      button.style.borderColor = "#4447E2";
      button.classList.add("login-button2");
      button.disabled = false;
    } else {
      button.style.color = "#2D2D3A";
      button.style.border = "2px solid ";
      button.style.borderColor = "#2D2D3";
      button.classList.remove("login-button2");
      button.disabled = true;
    }
  }
  
  if (location.search == "?wrongData=true") {
    document.getElementById("error-login").innerText = "Неверные данные";
    login.style.border = "1px solid #E24444";
    login.classList.add("animate");
    password.style.border = "1px solid #E24444";
    password.classList.add("animate");
    setTimeout(function remove() {
      login.classList.remove("animate");
      password.classList.remove("animate");
    }, 420);
  }
  login.addEventListener('input', update)
  password.addEventListener('input', update)
});
