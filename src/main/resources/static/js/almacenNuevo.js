document.addEventListener("DOMContentLoaded", () => {
    const urlProducto = 'http://127.0.0.1:8080/Calzado/';
    const urlImagen = 'http://127.0.0.1:8080/Imagen/subir';

    const img1 = document.querySelector("#img1");
    const img2 = document.querySelector("#img2");
    const img3 = document.querySelector("#img3");
    const id = document.getElementById("id-num");
    const nombre = document.getElementById("id-producto");
    const cantidad = document.getElementById("id-cantidad");
    const precio = document.getElementById("id-precio");
    const categoria = document.getElementById("id-categoria");
    const leyenda = document.getElementById("id-leyenda");
    const genero = document.getElementById("id-genero");
    const size1 = document.getElementById("id-size1");
    const size2 = document.getElementById("id-size2");
    const size3 = document.getElementById("id-size3");
    const color1 = document.getElementById("id-color1");
    const color2 = document.getElementById("id-color2");
    const color3 = document.getElementById("id-color3");
    const detalle1 = document.getElementById("id-detalle1");
    const detalle2 = document.getElementById("id-detalle2");
    const detalle3 = document.getElementById("id-detalle3");
    
    const btnEnviar = document.getElementById("btn-enviar-nuevo");

    btnEnviar.addEventListener("click", event =>{
        registrarProducto();
    });

    async function registrarImagen(img){
        let data = new FormData()
        data.append('file', img.files[0]) 
        return fetch(urlImagen, {
            method: 'POST', 
            body: data
        }).then(response => {
            if (!response.ok) {
                console.log("Problema para registrar imagen.");
                return;
            }
        }).catch(error => {
            console.log("Error con la api imagenes ", error);
        });
    }

    async function registrarProducto() {
        await registrarImagen(img1);
        await registrarImagen(img2);
        await registrarImagen(img3);

        let producto = {
            id: id.value,
            nombre: nombre.value,
            cantidad: cantidad.value,
            price: precio.value,
            images: {
                1: "assets/img/"+ img1.files[0].name,
                2: "assets/img/"+ img2.files[0].name,
                3: "assets/img/"+ img3.files[0].name
            },
            sizes: {
                1: size1.value,
                2: size2.value,
                3: size3.value
            },
            color: {
                1: color1.value,
                2: color2.value,
                3: color3.value
            },
            characteristics: {
                category: categoria.value,
                sex: genero.value,
                leyenda: leyenda.value,
                details: {
                    1: detalle1.value,
                    2: detalle2.value,
                    3: detalle3.value
                }
            }
        };    
        
        fetch(urlProducto, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        }).then(response => {
            if (!response.ok) {
                console.log("Problema para registrar producto.");
                return;
            }
            if (!alert("Producto registrado exitosamente.")) {
                window.location.href = "/admin/almacen";
            };
        }).catch(error => {
            console.log("Error con la api productos ", error);
        });
    }
});