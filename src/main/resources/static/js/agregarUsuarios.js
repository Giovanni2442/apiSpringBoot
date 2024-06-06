function submitForm() {
    const formData = {
        name: document.getElementById('nombre').value,
        lstnF: document.getElementById('lstnF').value,
        lstnM: document.getElementById('lstnM').value,
        age: parseInt(document.getElementById('age').value),
        email: document.getElementById('email').value,
        pass: document.getElementById('pass').value,
        tel: document.getElementById('tel').value
    };

    fetch('http://localhost:8080/users/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario registrado exitosamente');
            // document.getElementById('signup-form').reset(); // Limpiar el formulario después de enviar
            window.location.href = '/home';
        } else {
            alert('Ocurrió un error al registrar el usuario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar el usuario catch 2');
    });
}

function login() {
    const formData = {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-pass').value
    };

    fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Bienvenido a MarielaShoes')
            let email = document.getElementById('login-email').value;
            let separado = email.split("@");
            // Redireccionar al usuario a la página de inicio
            if(separado[1] == "marielashoes.com"){
                window.location.href = '/home/1';
            } else {
                window.location.href = '/home/2';
            }
        } else {
            // Mostrar un mensaje de error al usuario
            alert('Credenciales incorrectas');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al iniciar sesión');
    });
}
