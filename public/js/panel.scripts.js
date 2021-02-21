document.getElementById("preloader").visible = true;
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("preloader").visible = false;

  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });

  function CreatePopup(type, title, text) {
    let id = Math.floor(Math.random() * (99999 - 1) + 1).toString(36)
    let img, color
    switch (type) {
      case 0: // Error
        color = '#dc3545'
        img = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-patch-exclamation-fill popup-icon mr-1" viewBox="0 0 16 16">
        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>`
        break
      case 1: // Succses
        color = '#198754'
        img = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-patch-exclamation-fill popup-icon mr-1" viewBox="0 0 16 16">
        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
      </svg>`

        break
      case 2: //Warning
        color = '#ffc107'
        img = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-patch-exclamation-fill popup-icon mr-1" viewBox="0 0 16 16">
        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>`
        break
    }

    let str = `
    <div id="${id}" class="toast mt-2" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
    	<div class="toast-header">
        <div class="first-part-popup">
  				${img}
  				<strong class="mr-auto">${title}</strong>
				</div>
				<div class="second-part-popup">
  				<small class="text-muted mr-2" id='${id}'></small>
  				<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
    				<span aria-hidden="true">&times;</span>
  				</button>
				</div>
    	</div>
    	<div class="toast-body">
        ${text}
    	</div>
	</div>`

    $("#popup").append(str)
    $(`#${id}`).toast('show')
    setTimeout(() => {
      $(`#${id}`).remove();
    }, 5000)

  }

  function Copy(text, obj) {
    let input = document.createElement("input");
    document.body.appendChild(input)
    input.value = text
    input.select()
    try {
      document.execCommand("copy")
      CreatePopup(1, obj.header, obj.body)

    } catch (err) {
      alert("unable to copy text");
      CreatePopup(0, 'Ошибка', 'Что-то пошло не так.')
    }
    document.body.removeChild(input)
  }
  //Login/password copy function
  let arr = Array.from(document.querySelectorAll('.acc-item-data'))
  Array.from(document.querySelectorAll('#user_login')).forEach((e)=>{
    arr.push(e)
  })
  Array.from(document.querySelectorAll('#user_password')).forEach((e)=>{
    arr.push(e)
  })
  arr.forEach((e)=>{
    e.addEventListener("dblclick", function (event) {
    obj = {
      header: 'Успешно',
      body: 'Данные успешно скопированны!'
    }
    if (event.target.id == "user_login" || event.target.id == "user_password") {
      Copy(event.target.parentElement.children[0].textContent.substr(7) + ":" + event.target.parentElement.children[2].textContent.substr(10), obj)
    } else {
    //  Copy(event.target.children[0].textContent.substr(7) + ":" + event.target.children[2].textContent.substr(10), obj)
    }
  })})

  //Name copy function
  document.querySelectorAll('#user_name').forEach((e)=>{
    e.addEventListener("dblclick", function (event) {
    obj = {
      header: 'Успешно',
      body: 'Имя успешно скопированно!'
    }
    console.log(event.target.textContent)
    //Copy(event.target.textContent, obj)
  })})

  //ID copy function
  document.querySelectorAll('#user_id').forEach((e)=>{
    e.addEventListener("dblclick", function (event) {
    obj = {
      header: 'Успешно',
      body: 'ID успешно скопированно!'
    }
    Copy(`https://vk.com/${event.target.textContent.substr(3).trim()}/`, obj)
  })})

  //Token copy function
  document.querySelectorAll('.acc-item-token').forEach((e) => {
    e.addEventListener("dblclick", function (event) {
      obj = {
        header: 'Успешно',
        body: 'Токен успешно скопирован!'
      }
      Copy(event.target.value.trim(), obj)
      if (document.selection && document.selection.empty) {
        document.selection.empty()
        event.target.click()
      } else if (window.getSelection) {
        window.getSelection().removeAllRanges()
        event.target.click()
      }
    })
  })

  //Main checkbox
  document.getElementById('main-checkbox').addEventListener('click', function () {
    if (document.getElementById('main-checkbox').checked !== false) {
      Array.from(document.getElementsByClassName('acc-item-checkbox')).forEach((e) => {
        console.log(e.children[0])
        e.style.display = 'flex'
        e.children[0].checked = true
      })
    } else {
      Array.from(document.getElementsByClassName('acc-item-checkbox')).forEach((e) => {
        console.log(e.children[0])
        e.style.display = 'none'
        e.children[0].checked = false
      })
    }
  })
  document.querySelectorAll('.acc-item').forEach((e) => {
      e.addEventListener('dblclick', function (event) {
        if(event.target.classList.contains('acc-item')){
          event.target.children[0].style.display = 'flex'
          event.target.children[0].children[0].checked = true
        }
      })
  })
});