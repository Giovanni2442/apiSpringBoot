document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById('tabla-body');
    const urlPedidos = 'http://127.0.0.1:8003/pedidos/mostrar-estado/';
    const urlPedidosCancelar = 'http://127.0.0.1:8003/pedidos/actualizar/';
    const urlPedidosAgendar = 'http://127.0.0.1:8003/pedidos/actualizar-entrega/';
    const urlProductos = 'http://127.0.0.1:8080/Calzado/';
    const urlDirecciones = 'http://127.0.0.1:8002/direccion/mostrar/';

    const titulo = document.getElementById('pedidos-titulo');
    const btnPendientes = document.getElementById('pendientes');
    const btnEnviados = document.getElementById('enviados');
    const btnCancelados = document.getElementById('cancelados');

    let pedidos = {};
    let pedidosPendientes = {};
    let pedidosEnviados = {};
    let pedidosCancelados = {};

    btnPendientes.addEventListener("click", event => {
        titulo.innerHTML = "Pedidos pendientes";
        
        esconderPedidos(pedidosEnviados, true);
        esconderPedidos(pedidosCancelados, true);
        if(Object.keys(pedidosPendientes).length == 0){
            cargarPedidos("Cancelado", pedidosPendientes);
        } else {
            esconderPedidos(pedidosPendientes, false);
        }
    });

    btnEnviados.addEventListener("click", event => {
        titulo.innerHTML = "Pedidos enviados";

        esconderPedidos(pedidosPendientes, true);
        esconderPedidos(pedidosCancelados, true);
        if(Object.keys(pedidosEnviados).length == 0){
            cargarPedidos("Enviado", pedidosEnviados);
        } else {
            esconderPedidos(pedidosEnviados, false);
        }
    });

    btnCancelados.addEventListener("click", event => {
        titulo.innerHTML = "Pedidos cancelados";

        esconderPedidos(pedidosPendientes, true);
        esconderPedidos(pedidosEnviados, true);
        if(Object.keys(pedidosCancelados).length == 0){
            cargarPedidos("Cancelado", pedidosCancelados);
        } else {
            esconderPedidos(pedidosCancelados, false);
        }
    });

    function esconderPedidos(pedidos, esconder) {
        for(let pedido in pedidos){
            if (esconder) {
                document.getElementById(pedido).style.display = "none";
            } else {
                document.getElementById(pedido).style.display = "table-row";
            }
        } 
    }

    const productos = {};
    const direcciones = {};

    cargarPedidos("Pendiente", pedidosPendientes);

    function cargarPedidos(estado, pedidosEstado) {
        fetch(urlPedidos + estado).then((response) => {
            return response.json();
        }).then(async (pedidosApi) => {
            for (let i = 0; i < pedidosApi.length; i++) {
                pedidos[pedidosApi[i].id] = pedidosApi[i];
                pedidosEstado[pedidosApi[i].id] = pedidosApi[i];
            }
            await agregarFilas(pedidosApi);
            configurarDetalles();
            configurarEliminar();
            configurarAgendar();
        }).catch((error) => {
            console.log('Error en consulta a api pedidos: ', error);
        });
    }

    async function agregarFilas(pedidos) {
        for (let i = 0; i < pedidos.length; i++) {
            //Consultar api de calzado para los productos del pedido
            if (pedidos[i].productos != null) {
                for (let j = 0; j < pedidos[i].productos.length; j++) {
                    if (!(pedidos[i].productos[j].id in productos)) {
                        // await cargarProducto(6);
                        await cargarProducto(pedidos[i].productos[j].idProducto);
                        await cargarDirecciones(pedidos[i].idDireccion); //TODO: cuando no hay productos xd
                    }
                }
            }

            let fila = `<tr id="${pedidos[i].id}">
                            <td>${pedidos[i].id}</td>
                            <td>${pedidos[i].productos[0] != null ? productos[pedidos[i].productos[0].idProducto].nombre : ''}...</td>
                            <td>${convertirFecha(pedidos[i].fechaCreacion)}</td>
                            <td>${pedidos[i].fechaEntrega == null ? '-' : convertirFecha(pedidos[i].fechaEntrega)}</td>
                            <td>$${pedidos[i].monto}</td>
                            <td>${pedidos[i].metodoPago}</td>
                            <td>${pedidos[i].estadoEnvio}</td>
                            <td>
                                <div class="d-flex flex-column flex-md-row gap-2 justify-content-center" data-pedido="${pedidos[i].id}">
                                    <button class="btn btn-sm fw-bold btn-secondary btn-detalles-pedido" data-bs-toggle="modal"
                                        data-bs-target="#modal-detalles">Ver detalles</button>
                                    <button class="btn btn-sm fw-bold btn-primary btn-cancelar-pedido" data-bs-toggle="modal"
                                        data-bs-target="#modal-cancelar" data-pedido="${pedidos[i].id}">Modificar</button>
                                    ${pedidos[i].estadoEnvio == 'Enviado' ?
                                    `<button class="btn btn-sm fw-bold btn-success btn-agendar-pedido" data-bs-toggle="modal"
                                        data-bs-target="#modal-agendar" data-pedido="${pedidos[i].id}">Agendar</button>`
                                    : ''}
                                </div>
                            </td>
                        </tr>`;
            tabla.innerHTML += fila;
        }
    }

    async function cargarProducto(idProducto) {
        return fetch(urlProductos + idProducto).then((response) => {
            return response.json();
        }).then((producto) => {
            productos[producto.id] = producto;
        }).catch((error) => {
            console.log('Error en consulta a api calzado: ', error)
        });
    }

    async function cargarDirecciones(idDireccion) {
        return fetch(urlDirecciones + idDireccion + "/").then((response) => {
            return response.json();
        }).then((direccion) => {
            direcciones[idDireccion] = direccion;
        }).catch((error) => {
            console.log('Error en consulta a api direcciones: ', error)
        });
    }

    function convertirFecha(fechaStr) {
        let fecha = new Date(fechaStr);
        return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`;
    }

    function configurarDetalles() {
        const botonesDetalles = document.querySelectorAll(".btn-detalles-pedido");

        const numPedido = document.getElementById("num-pedido");
        const estado = document.getElementById("estado");
        const realizacion = document.getElementById("realizacion");
        const prevista = document.getElementById("prevista");

        const ciudad = document.getElementById("ciudad");
        const direccion = document.getElementById("direccion");
        const receptor = document.getElementById("receptor");
        const contacto = document.getElementById("contacto");

        const tablaProductos = document.getElementById("tabla-productos");
        const totalPedido = document.getElementById("total");

        botonesDetalles.forEach(btn => {
            btn.addEventListener('click', event => {
                let idPedido = btn.parentElement.dataset.pedido;
                numPedido.innerHTML = pedidos[idPedido].id;
                estado.innerHTML = pedidos[idPedido].estadoEnvio;
                realizacion.innerHTML = convertirFecha(pedidos[idPedido].fechaCreacion);
                prevista.innerHTML = pedidos[idPedido].fechaEntrega != null ? convertirFecha(pedidos[idPedido].fechaEntrega) : '-';

                let dir = direcciones[pedidos[idPedido].idDireccion];
                ciudad.innerHTML = dir.ciudad + ", " + dir.estado;
                direccion.innerHTML = dir.calle + " " + dir.numExterior
                    + ", " + dir.colonia + ", " + dir.codigoPostal;
                receptor.innerHTML = dir.nombre + " " + dir.apellidos;
                contacto.innerHTML = dir.celular;

                tablaProductos.innerHTML = "";
                let total = 0;
                for (let i = 0; i < pedidos[idPedido].productos.length; i++) {
                    let producto = productos[pedidos[idPedido].productos[i].idProducto];
                    let detallesProducto = pedidos[idPedido].productos[i];
                    // let producto = productos[6];
                    console.log(detallesProducto)
                    let fila = `<tr class="text-center">
                                    <td>${producto.nombre}</td>
                                    <td>${detallesProducto.tamaño}</td>
                                    <td>${detallesProducto.cantidad}</td>
                                    <td>$${detallesProducto.precio}</td>
                                    <td>$${detallesProducto.cantidad * detallesProducto.precio}</td>
                                </tr>`
                    tablaProductos.innerHTML += fila;
                    total += detallesProducto.cantidad * detallesProducto.precio;
                }
                totalPedido.innerHTML = "$" + total;
            });
        });
    }

    function configurarEliminar() {
        const botonesCancelar = document.querySelectorAll(".btn-cancelar-pedido");
        const btnModalCancelar = document.getElementById("btn-modal-cancelar");
        const selectEstado = document.getElementById("select-estado");

        botonesCancelar.forEach(btn => {
            btn.addEventListener("click", event => {
                let idPedido = btn.dataset.pedido;
                btnModalCancelar.setAttribute('data-pedido', idPedido);
            });
        });

        btnModalCancelar.addEventListener("click", event => {
            let actualizacion = {
                idPedido: btnModalCancelar.dataset.pedido,
                estadoEnvio: selectEstado.value
            }

            fetch(urlPedidosCancelar, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actualizacion)
            }).then(response => {
                if (!response.ok) {
                    console.log("Problema para actualizar el estado del pedido.");
                    return;
                }
                if (!alert("Pedido modificado exitosamente.")) {
                    window.location.reload();
                };
            }).catch(error => {
                console.log("Error con la api pedido ", error);
            });
        });
    }

    function configurarAgendar() {
        const botonesAgendar = document.querySelectorAll(".btn-agendar-pedido");
        const btnModalAgendar = document.getElementById("btn-modal-agendar");
        const fecha = document.getElementById("fecha");

        botonesAgendar.forEach(btn => {
            btn.addEventListener("click", event => {
                let idPedido = btn.dataset.pedido;
                btnModalAgendar.setAttribute('data-pedido', idPedido);
            });
        });

        btnModalAgendar.addEventListener("click", event => {
            let tiempo= new Date();
            let actualizacion = {
                idPedido: btnModalAgendar.dataset.pedido,
                fechaEntrega: fecha.value + "T" + tiempo.getHours().toString().padStart(2, '0') + ":" + tiempo.getMinutes().toString().padStart(2, '0')
            }
            fetch(urlPedidosAgendar, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(actualizacion)
            }).then(response => {
                if (!response.ok) {
                    console.log("Problema para actualizar la fecha prevista del pedido.");
                    return;
                }
                if (!alert("Pedido agendado exitosamente.")) {
                    window.location.reload();
                };
            }).catch(error => {
                console.log("Error con la api pedido ", error);
            });
        });
    }
});