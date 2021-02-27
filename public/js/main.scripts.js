document.getElementById("preloader").visible = true;
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("preloader").visible = false;

  function hello() {
    document.getElementById("username").innerText = localStorage.getItem(
      "UserData"
    );
  }
  
  function removecol() {
    if (document.getElementById("col").classList.contains("remove-col")) {
      document.getElementById("main-col").classList.remove("col-lg-11");
      document.getElementById("main-col").classList.add("col-lg-10");
      document.getElementById("col").classList.remove("remove-col");
      document.getElementById("list").style.display = "block";
      document.getElementById("icon-list").style.display = "none";
      document.getElementById("arrow-bar").src = "././media/arrow-bar-left.svg";
    } else {
      document.getElementById("main-col").classList.remove("col-lg-10");
      document.getElementById("main-col").classList.add("col-lg-11");
      document.getElementById("col").classList.add("remove-col");
      document.getElementById("list").style.display = "none";
      document.getElementById("icon-list").style.display = "block";
      document.getElementById("arrow-bar").src =
        "././media/arrow-bar-right.svg";
    }
  }
  function resize() {
    if (window.innerWidth <= 1665) {
      Array.from(document.getElementsByClassName("list-item")).forEach(e => {
        e.style.width = "180px";
      });
    } else {
      Array.from(document.getElementsByClassName("list-item")).forEach(e => {
        e.style.width = "250px";
      });
    }
  }

  function arrow() {
    requestAnimationFrame(arrow);
    if (
      document
        .getElementById("dropdownMenuButton")
        .classList.contains("show") == true
    ) {
      document.getElementById("arrow").classList.add("arrow-rev");
    }
    if (
      document
        .getElementById("dropdownMenuButton")
        .classList.contains("show") == false
    ) {
      document.getElementById("arrow").classList.remove("arrow-rev");
    }
  }

  //Start functions
  document.getElementById("remove-col").addEventListener("click", removecol);
  window.onresize = resize;
 
  arrow();
  
  if(localStorage.getItem("UserData")){
     hello();
  }else{
    location.replace('/logout')
  }
});
