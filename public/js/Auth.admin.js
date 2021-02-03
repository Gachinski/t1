document.getElementById('preloader').visible = true
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('preloader').visible = false
    //Initialize variables
    let login = document.getElementById('login_input')
    let password =document.getElementById('password_input')
    let button = document.getElementById('login_btn')
    
    //Check length login/password input (observer)
    function update() {
        requestAnimationFrame(update);
        if (login.value.trim().length >= 1 && password.value.trim().length >= 1) {
            button.style.color = '#ffffff'
            button.style.border = '2px solid '
            button.style.borderColor ="#4447E2"
            button.classList.add('login-button2')
            button.disabled = false;
        } else {
            button.style.color = '#2D2D3A'
            button.style.border = '2px solid '
            button.style.borderColor ="#2D2D3"
            button.classList.remove('login-button2')
            button.disabled = true;
        }
    }
    update();

    //Send request to server with user data
    button.addEventListener('click', function Auth() {
        let url = 'http://localhost:'+location.port+'/auth';
        fetch(url, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                login: login.value.trim(),
                password: password.value.trim()
            })
        }).then(function (response) {
            return response.json()
        }).then(function (data) {
            if (data.error == 'no') {
                localStorage.setItem('UserData', data.login)
                document.location.replace('/profile')
            }
            if (data.error == 'Invalid login/password') {
                document.getElementById('error-login').innerText = 'Неверные данные'
                login.style.border = '1px solid #E24444'
                login.classList.add('animate')
                password.style.border = '1px solid #E24444'
                password.classList.add('animate')
                setTimeout(function remove() {
                    login.classList.remove('animate')
                    password.classList.remove('animate')
                }, 420);
            }
        })
    })
});