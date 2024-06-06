document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById('tabla-almacen');
    const urlProductos = 'http://127.0.0.1:8080/Calzado/';

    const productos = {};

    cargarProductos();

    function cargarProductos() {
        fetch(urlProductos).then((response) => {
            return response.json();
        }).then(async (almacen) => {
            for (let i = 0; i < almacen.length; i++) {
                productos[almacen[i].id] = almacen[i];
            }
            await agregarFilas(almacen);
        }).catch((error) => {
            console.log('Error en consulta a api calzado: ', error);
        });
    }

    async function agregarFilas(almacen) {
        for (let i = 0; i < almacen.length; i++) {
            let fila = `<tr>
            <td>${almacen[i].id}</td>
            <td><img class="img-thumbnail" src="${"../" + almacen[i].images[1]}" style="height:100px;width:100px;min-height:50px;min-width:50px;"></td>
            <td>${almacen[i].nombre}</td>
            <td>${almacen[i].characteristics["category"]}</td>
            <td>${almacen[i].cantidad}</td>
            <td>$${almacen[i].price}</td>
                        <td id="${almacen[i].id}">
                            <div class="d-flex flex-column gap-2 justify-content-center">
                                <!-- <a class="btn btn-sm fw-bold btn-success" href="almacen/${almacen[i].id}">Detalles</a> -->
                                <a class="btn btn-sm fw-bold btn-primary" href="almacen/editar/${almacen[i].id}">Modificar</a>
                            </div>
                        </td>
                    </tr>`;
            tabla.innerHTML += fila;
        }
    }
});