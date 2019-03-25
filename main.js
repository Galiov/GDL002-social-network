const registrar = () => {
	let email = document.getElementById('mail').value;
	let password = document.getElementById("password").value;

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.catch(function(error) {
 	 	// Handle Errors here.
 		 let errorCode = error.code;
 		 let errorMessage = error.message;
 		 // ...
		});
};