//Funcion para entrar a los usuarios ya registrados
const enter = () => {
    let emailSignIn = document.querySelector('.mail').value;
    let passwordSignIn = document.querySelector('.password').value;
    firebase
        .auth()
        .signInWithEmailAndPassword(emailSignIn, passwordSignIn)
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            console(errorCode);
            let errorMessage = error.message;
            // ...
            alert(errorMessage);
            console.log(errorMessage);
		});
		showContent(user);
};



//Funcion para verificar el correo electronico del usuario
const verification = () => {
    let user = firebase.auth().currentUser;
    user
        .sendEmailVerification()
        .then(function() {
            // Email sent.
            alert(
                'Te hemos enviado un código de verificación, por favor revisa tu bandeja para poder ingresar'
            );
            console.log('Enviando correo');
        })
        .catch(function(error) {
            // An error happened.
        });
};


//Funcion para registrar usuarios nuevos
const register = () => {
	let email = document.querySelector('.mailSignUp').value;
	let password = document.querySelector('.passwordSignUp').value;
	//	let name = document.querySelector('.name').value;

	console.log(email);
	console.log(password);

	firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(function() {
			verification();
			//showSignIn();
			//getProfile();
			//let displayName = name;
			console.log(displayName);
		})
		.catch(function(error) {
			// Handle Errors here.
            let errorCode = error.code;
            console(errorCode)
			let errorMessage = error.message;
			// ...
			alert(errorMessage);
			console.log(errorMessage);
		});
};





//Funcion para observar todo lo que esta haciendo el codigo, registro, entrada, salida, usuario, etc.
const observador = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Existe Usuario activo');
            showContent(user);
            // User is signed in.
            let displayName = user.displayName;
            let email = user.email;
            console.log(user);
            console.log(user.emailVerified);
            let emailVerified = user.emailVerified;
            let photoURL = user.photoURL;
            let isAnonymous = user.isAnonymous;
            let uid = user.uid;
            let providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            console.log('No existe usuario activo');
            // ...
        }
    });
};
observador();

//Funcion que muestra contenido a los usuarios registrados
const showContent = (user) => {
    let user1 = user;
    let content = document.querySelector('#content');
    if (user1.emailVerified) {
        content.innerHTML = `
		<p>Welcome to WoTravel!</p>
		<button class="profile-button">Profile</button>
		<section class="user-profile"></section>
		<br>
		<input type="text" name="" id="" class="post" placeholder="New post" />
        <button class="buttonPost" onclick="">Post</button>
        <table class="tablePost my-3">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Post</th>
                    <th scope="col">Eliminar</th>
                    <th scope="col">Editar</th>
                </tr>
            </thead>
            <tbody class="table"></tbody>
        </table>
        <button class="sign-out-button">Sign Out</button>

        `//Funcion de boton para postear
        document.querySelector('.buttonPost').addEventListener('click', post);
        const signOutButton = document.querySelector('.sign-out-button');
        signOutButton.addEventListener('click', close);
        let table = document.querySelector('.table');
        db.collection('table').onSnapshot(querySnapshot => {
            table.innerHTML = '';
            querySnapshot.forEach(doc => {
                console.log(`${doc.id} => ${doc.data().text}`);
                table.innerHTML += `
                <tr>
                    <th> ${doc.id}</th> 
                    <td> ${doc.data().text}</td>
                    <td><button class="buttonDelete" onclick="deletePost('${doc.id}')">Delete</button></td>
					<td><button class="buttonEdit" onclick="editPost('${doc.id}', '${doc.data().text}')">Edit</button></td>
					
                </tr> `;
            });
        });
        //document.querySelector(".buttonDelete").addEventListener("click", deletePost);
    }
};

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();
//Funcion para postear
function post() {
    let posts = document.querySelector('.post').value;
    db.collection('table').add({
            text: posts,
        })
        .then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
            document.querySelector(".post").value = '';
        })
        .catch(function(error) {
            console.error('Error adding document: ', error);
        });
}
 //Función de botón para postear
 //document.querySelector('.buttonPost').addEventListener('click', post);


//borrar datos
function deletePost(id) {
    db.collection('table')
        .doc(id)
        .delete()
        .then(function() {
            console.log('Document successfully deleted!');
        })
        .catch(function(error) {
            console.error('Error removing document: ', error);
        });
}


//editar datos
function editPost(id, text) {
    document.querySelector(".post").value = text;

    let btn = document.querySelector(".buttonPost");
    btn.innerHTML = "Editar";

    btn.onclick = function() {
        let washingtonRef = db.collection("table").doc(id);
        let posts = document.querySelector(".post").value;
        return washingtonRef.update({

                text: posts,
            })
            .then(function() {
                console.log("Document successfully updated!");
                btn.innerHTML = "Guardar";
                document.querySelector(".post").value = "";
                btn.innerHTML = ""

            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }
}
  

//Funcion de boton para cerrar sesion
const close = () => {
    firebase
        .auth()
        .signOut()
        .then(function() {
            signOutChange()
            console.log('Saliendo... :)');
        })
        .catch(function(error) {
            console.log(error);
        });
};