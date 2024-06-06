document.addEventListener("DOMContentLoaded", () => {
    const urlProducto = 'http://127.0.0.1:8080/Calzado/';
    const urlImagen = 'http://127.0.0.1:8080/Imagen/subir';

    const img1Pre = document.getElementById("img1-pre");
    const img2Pre = document.getElementById("img2-pre");
    const img3Pre = document.getElementById("img3-pre");
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
    let producto;

    cargarProducto();

    function cargarProducto() {
        return fetch(urlProducto + id.value).then((response) => {
            return response.json();
        }).then(productoApi => { 
            producto = productoApi;
            llenarCampos(producto);
        }).catch((error) => {
            console.log('Error en consulta a api calzado: ', error);
        });
    }

    function llenarCampos(producto){
        img1Pre.src = "/../../" + producto.images[1];
        img2Pre.src = "/../../" + producto.images[2];
        img3Pre.src = "/../../" + producto.images[3];
        nombre.value = producto.nombre;
        cantidad.value = producto.cantidad;
        precio.value = producto.price;
        categoria.value = producto.characteristics.category;
        leyenda.value = producto.characteristics.leyenda;
        genero.value = producto.characteristics.sex;
        size1.value = producto.sizes[1];
        size2.value = producto.sizes[2];
        size3.value = producto.sizes[3];
        color1.value = producto.color[1];
        color2.value = producto.color[2];
        color3.value = producto.color[3];
        detalle1.value = producto.characteristics.details[1];
        detalle2.value = producto.characteristics.details[2];
        detalle3.value = producto.characteristics.details[3];
    }

    btnEnviar.addEventListener("click", event => {
        registrarProducto(producto);
    });

    async function registrarImagen(img) {
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

    async function registrarProducto(producto) {
        let images = {}
        if(img1.files[0] != null){
            await registrarImagen(img1);
            images[1] = "assets/img/" + img1.files[0].name;
        } else {
            images[1] = producto.images[1]
        }
        if(img2.files[0] != null){
            await registrarImagen(img2);
            images[2] = "assets/img/" + img2.files[0].name;
        } else {
            images[2] = producto.images[2]
        }
        if(img3.files[0] != null){
            await registrarImagen(img3);
            images[3] = "assets/img/" + img3.files[0].name;
        } else {
            images[3] = producto.images[3]
        }

        let productoData = {
            id: id.value,
            nombre: nombre.value,
            cantidad: cantidad.value,
            price: precio.value,
            images: images,
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

        fetch(urlProducto + id.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        }).then(response => {
            if (!response.ok) {
                console.log("Problema para modificar producto.");
                return;
            }
            if (!alert("Producto actualizado exitosamente.")) {
                window.location.href = "/admin/almacen";
            };
        }).catch(error => {
            console.log("Error con la api productos ", error);
        });
    }
});