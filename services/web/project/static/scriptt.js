document.getElementById("btn__panel").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrar").addEventListener("click", register);


//declaracion de variables
var contenedor_login_register = document.querySelector(".container__login-register");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__registrer");
var caja_trasera_login = document.querySelector(".box__camion");
var caja_trasera_register = document.querySelector(".box__camion2");
var exampleEl = document.getElementById('example')
var popover = new bootstrap.Popover(exampleEl, options)
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
//const open = document.getElementById("Ubicacion");
//const modal_container = document.getElementById("contenedor_popup");
//const close = document.getElementById("cerrar");


//open.addEventListener('click', () => {
//	modal_container.classList.add('show');
//});
//close.addEventListener('click', () => {
//	modal_container.classList.remove('show');
//});


function iniciarSesion(){
	formulario_register.style.display = "none";
	contenedor_login_register.style.left = "10px";
	formulario_login.style.display = "block";
	caja_trasera_register.style.opacity = "1";
	caja_trasera_login.style.opacity = "0";
	
}

function register(){
	formulario_register.style.display = "block";
	contenedor_login_register.style.left = "410px";
	formulario_login.style.display = "none";
	caja_trasera_register.style.opacity = "0";
	caja_trasera_login.style.opacity = "1";
	
}

