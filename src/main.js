// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

//Funcion para entrar a los usuarios ya registrados
const enter = () => {
    let user = firebase.auth().currentUser;
    let emailSignIn = document.querySelector('.mail').value;
    let passwordSignIn = document.querySelector('.password').value;
    firebase
        .auth()
        .signInWithEmailAndPassword(emailSignIn, passwordSignIn)
        .catch(function(error) {
            // Handle Errors here.
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
    user.updateProfile({
        displayName: document.querySelector('.name').value,
    });

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
    let user = firebase.auth().currentUser;
    let email = document.querySelector('.mailSignUp').value;
    let password = document.querySelector('.passwordSignUp').value;

    console.log(email);
    console.log(password);

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function() {
            verification();
        })
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
            alert(errorMessage);
            console.log(errorMessage);
        });
};

//Funcion para observar todo lo que esta haciendo el codigo, registro, entrada, salida, usuario, etc.
const observador = () => {
    let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Existe Usuario activo');
            showContent(user);
            // User is signed in.
            let displayName = user.displayName;
            let phoneNumber = user.phoneNumber;
            let email = user.email;
            console.log(user);
            console.log(user.emailVerified);
            console.log(user.phoneNumber);
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
		<section class="user-profile"></section>
		<br>
		<input type="text" name="" id="" class="post" placeholder="New post" />
        <button class="buttonPost" >Post</button>
        <button class="buttonShowEdit" >Save Edit</button>

        <table class="tablePost my-3">
            <thead>
                <tr>
                    <th scope="col">Nombre Usuario</th>
                    <th scope="col">Post</th>
                    <th scope="col">Eliminar</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Like</th>
                </tr>
            </thead>
            <tbody class="table"></tbody>
        </table>
        <button class="sign-out-button">Sign Out</button>
		`;


        let table = document.querySelector('.table');
        db.collection('table').onSnapshot(querySnapshot => {
            table.innerHTML = '';
            querySnapshot.forEach(doc => {
                console.log(`${doc.id} => ${doc.data().text}`);
                table.innerHTML += `
                <tr>
                    <th> ${doc.data().displayName}</th> 
                    <td> ${doc.data().text}</td>

                    <td><button class="buttonDelete" onclick="deletePost('${doc.id}')">Delete</button></td>
					<td><button class="buttonEdit" onclick="editPost('${doc.id}', '${doc.data().text}')">Edit</button></td>
					<td><button class="buttonLike" id='${doc.id}' onclick="likes('${doc.id}', '${doc.data().like}')">Like</button></td>
                    </tr> `;

            });

            document.querySelector('.buttonPost').addEventListener('click', post);
        });
        const signOutButton = document.querySelector('.sign-out-button');
        signOutButton.addEventListener('click', close);
    }

};

//Funcion para postear
const post = () => {
    let posts = document.querySelector('.post').value;
    let user = firebase.auth().currentUser;
    let like = 0;

    db.collection('table')
        .add({
            displayName: user.displayName,
            text: posts,
            like: like,
        })
        .then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
            document.querySelector('.post').value = '';
        })
        .catch(function(error) {
            console.error('Error adding document: ', error);
        });
};

//borrar datos
const deletePost = (id) => {
    let confirmDelete = confirm("Seguro que quieres eliminar este post?");
    if (confirmDelete == true) {
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
};

//editar datos
const editPost = (id, text) => {
    document.querySelector('.post').value = text;

    //  btn.innerHTML = "Editar";

    function editP() {
        let washingtonRef = db.collection('table').doc(id);
        let posts = document.querySelector('.post').value;
        return washingtonRef
            .update({
                text: posts,
            })
            .then(function() {
                console.log('Document successfully updated!');
                // btn.innerHTML = "Guardar Edición";
                document.querySelector('.post').value = '';
                //     btn.innerHTML = "Post";
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error('Error updating document: ', error);
            });
    }
    document.querySelector('.buttonShowEdit').addEventListener('click', editP);
};

const likes = (id, likes) => {
    likes++;

    likes = parseInt(likes);
    let washingtonRef = db.collection('table').doc(id);

    return washingtonRef
        .update({
            like: likes,
        })
        .then(function() {
            let washingtonRef = db.collection('table').doc(id).id;

            let buttonLike = document.getElementById(washingtonRef);
            buttonLike.innerHTML += ' ' + likes;
        })
        .then(function() {
            console.log('Document successfully updated!');
        })

    .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
    });
};

//Funcion de boton para cerrar sesion
const close = () => {
    firebase
        .auth()
        .signOut()
        .then(function() {
            signOutChange();
            console.log('Saliendo... :)');
        })
        .catch(function(error) {
            console.log(error);
        });
};