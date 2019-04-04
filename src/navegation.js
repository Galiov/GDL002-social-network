//window.onload = () => {location.hash ="#homepage"};

let routes = {
    ' ': homepage,
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
    }, 0); 
}

// PRUEBA ADDEVENTLISTENER
const signInButton = document.querySelector('.sign-in-button');
signInButton.addEventListener('click', enter);

const registerButton = document.querySelector('.register-button');
registerButton.addEventListener('click', register);

document.querySelector('.buttonPost').addEventListener('click', post);


////
function showContentChange () {
    console.log("Hola")
    window.location.hash = "showContent" 
}
document.querySelector("#changeTimeline").addEventListener("click",showContentChange);


function signUpChange () {
    console.log("Hola2")
    window.location.hash = "signUp"
}
document.querySelector("#changeSignUp").addEventListener("click", signUpChange);