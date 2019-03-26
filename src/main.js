const registrar = () => {
	let email = document.querySelector("#mailSignUp").value;
	let password = document.querySelector("#passwordSignUp").value;

	console.log(email);
	console.log(password);

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		console.log(errorCode);
		console.log(errorMessage);
	  });
};

const ingresar = () => {
	let emailSignIn = document.querySelector("#mail").value;
	let passwordSignIn = document.querySelector("#password").value;

	console.log(emailSignIn);
	console.log(passwordSignIn);

	firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		console.log(errorCode);
		console.log(errorMessage);
	  });
}

function observador () {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Existe Usuario activo")
		  // User is signed in.
		  var displayName = user.displayName;
		  var email = user.email;
			console.log(user)
		  var emailVerified = user.emailVerified;
		  var photoURL = user.photoURL;
		  var isAnonymous = user.isAnonymous;
		  var uid = user.uid;
		  var providerData = user.providerData;
		  // ...
		} else {
		  // User is signed out.
		  console.log("No existe usuario activo")
		  // ...
		}
	  });
}

observador();