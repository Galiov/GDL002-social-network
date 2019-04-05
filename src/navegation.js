//window.onload = () => {location.hash ="#homepage"};

let routes = {
    '': homepage,
    'index.html':homepage,
    '#homepage': homepage,
    '#signUp': signUp,
    '#showContent':showContent,
  };

  let contentDiv = document.querySelector('#content');

window.addEventListener("hashchange", () => {
    contentDiv.innerHTML = routes[window.location.hash];
});

contentDiv.innerHTML = routes[window.location.hash];

window.onpopstate = () => {
    contentDiv.innerHTML = routes[window.location.hash];
    setTimeout(() => {
        document.querySelector("#changeTimeline") && document.querySelector("#changeTimeline").addEventListener("click",showContentChange);
        document.querySelector("#changeSignUp") && document.querySelector("#changeSignUp").addEventListener("click", signUpChange);
        callRegisterButton();
        callHomepageChange ();
    }, 0); 
}
//Llamando funciones de enter y register ubicadas en el main.js
const signInButton = document.querySelector('.sign-in-button');
signInButton.addEventListener('click', enter);

function callRegisterButton () {
    document.querySelector('.register-button').addEventListener('click', register);
    console.log("Probando boton enviar datos de registro")
};
//



function showContentChange () {
    window.location.hash = "showContent" 
}
document.querySelector("#changeTimeline").addEventListener("click",showContentChange);


function signUpChange () {
    window.location.hash = "signUp"
}

document.querySelector("#changeSignUp").addEventListener("click", signUpChange);


function homepageChange (){
    window.location.hash = "homepage"
}

function callHomepageChange () {
    document.querySelector("#changeHomepage").addEventListener("click", homepageChange); 
}

function signOutChange (){
    console.log("Hola3")
    window.location.hash = "homepage"
}
