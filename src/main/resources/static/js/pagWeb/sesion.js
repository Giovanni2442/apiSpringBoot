const auth = firebase.auth();

// Obtiene una referencia a la colección "usuarios" en Firestore
const usuariosCollection = firebase.firestore().collection('usuarios');

//################################################################################################
//REGISTRO NUEVO
const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const Nombre = document.querySelector('#nombre').value;
  const ApellidoP = document.querySelector('#lstnF').value;
  const ApellidoM = document.querySelector('#lstnM').value;
  const Edad = document.querySelector('#age').value;
  const Telefono = document.querySelector('#tel').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#pass').value;

  // Para Agregar a Firestore
  const nuevoUsuario = {
    nombre: Nombre,
    lastP: ApellidoP,
    lastM: ApellidoM,
    age: Edad,
    tel: Telefono,
    correo: email,
    contra: password
  }
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {

      usuariosCollection.add(nuevoUsuario)
        .then((docRef) => {
          console.log('Documento agregado con ID:', docRef.id);
          alert(`Registro exitoso, Bienvenido ${Nombre}`)
          window.location = 'home'
        })
        .catch((error) => {
          console.log('Error al agregar documento:', error);
        });

      // Después de crear el usuario, puedes actualizar su información con el nombre
      return userCredential.user.updateProfile({
        displayName: Nombre
      });

    })
    .catch(function (error) {
      // Manejar errores de registro
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      console.error(errorMessage);
    });
});

//################################################################################################
//INICIO DE SESION
const signInForm = document.querySelector('#signin-form');

signInForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const pass = document.querySelector('#login-pass').value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(userCredential => {
      // La autenticación fue exitosa
      const user = userCredential.user;
      const userName = user.displayName; // Obtener el nombre del usuario
      alert(`Bienvenido ${userName}`);
      console.log('Inicio de sesión exitoso');
      window.location = 'home';
    })
    .catch(error => {
      // Manejar errores de autenticación
      alert('Error de autenticación: ' + error.message);
    });
});
