document.getElementById("preloader").visible = true
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("preloader").visible = false

  function hello() {
    document.getElementById("hello-h3").innerText =
      document.getElementById("hello-h3").textContent +
      localStorage.getItem("UserData")
  }
  
  function getData() {
    $.post("https://" + location.host + "/getData", function(data) {
      localStorage.setItem("UserData", data.login)
      hello()
    })
  }
  
  if (document.referrer == "https://" + location.host + "/login") {
    getData()
  }else{
    if(localStorage.getItem("UserData")){
       hello() 
    }
  }
  
});
