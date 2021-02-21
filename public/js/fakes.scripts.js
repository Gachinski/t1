document.getElementById('preloader').visible = true
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('preloader').visible = false

    function hello(){
      document.getElementById('hello-h3').innerText = document.getElementById('hello-h3').textContent + localStorage.getItem('UserData')
    }




    //Start functions 
    hello();
})