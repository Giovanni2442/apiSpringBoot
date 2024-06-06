document.addEventListener("DOMContentLoaded", () => {
    const urlCarrito = 'http://127.0.0.1:8080/Carrito/';
    const urlDireccion = '  http://127.0.0.1:8003/direccion/crear/';
    const urlMostrarDireccion = 'http://127.0.0.1:8002/direccion/mostrar-todas/';
    const urlPedidos = 'http://127.0.0.1:8003/pedidos/crear/';
 
    const idCliente = 2;
    const pais = document.getElementById("pais");
    const estado = document.getElementById("estado");
    const ciudad = document.getElementById("ciudad");
    const codigoPostal = document.getElementById("codigo_postal");
    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const calle = document.getElementById("calle");
    const colonia = document.getElementById("colonia");
    const numeroExterior = document.getElementById("numero_exterior");
    const referencia = document.getElementById("referencia");
    const celular = document.getElementById("celular");
    const metodo = document.getElementById("metodo");
    
    const btnEnviar = document.getElementById("btn-confirmar-pedido");
    let direccionPedido;
    let carritoCliente;

    btnEnviar.addEventListener("click", async event =>{
        await registrarDireccion();
        await cargarDireccion();
        await cargarCarrito();
        await registrarPedido();
        // await vaciarCarrito();
    });

    async function registrarDireccion() {
        let POST_request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'idCliente': idCliente,
                'pais': `${pais.value}`,
                'ciudad': `${ciudad.value}`,
                'estado': `${estado.value}`,
                'codigoPostal': `${codigoPostal.value}`,
                'nombre': `${nombre.value}`,
                'apellidos': `${apellidos.value}`,
                'calle': `${calle.value}`,
                'colonia': `${colonia.value}`,
                'numExterior': numeroExterior.value,
                'referencia': referencia.value,
                'celular': `${celular.value}`
            })
        };    

        ajax(urlDireccion,POST_request)
        .then(res =>{
            console.log("---",res);
        })

        /*return fetch(urlDireccion, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(direccion)
        }).then(response => {
            if (!response.ok) {
                console.log("Problema para registrar dirección.");
                return;
            } 
        }).catch(error => {
            let msg = error.statusText;
            console.log("Error con la api direcciones ", error.message , "--" , msg);
        });*/
    }

    function cargarDireccion(){
        return fetch(urlMostrarDireccion + idCliente + "/").then((response) => {
            return response.json();
        }).then(async (direcciones) => {
            direccionPedido = direcciones[direcciones.length-1];
        }).catch((error) => {
            console.log('Error en consulta a api calzado: ', error);
        });
    }

    function cargarCarrito(){
       return fetch(urlCarrito).then((response) => {
            return response.json();
        }).then(async (carrito) => {
            carritoCliente = carrito;
        }).catch((error) => {
            console.log('Error en consulta a api calzado: ', error);
        });
    }

    async function registrarPedido() {
        let productos = {};
        for(let i = 0; i<carritoCliente.length; i++){
            productos[i] = {
                idProducto: carritoCliente["id"],
                cantidad: carritoCliente["cantidad"],
                precio: carritoCliente["precioProd"],
                tamaño: carritoCliente["talla"]
            }
        }

        let pedido = {
            idCliente: idCliente,
            idDireccion: direccionPedido.id,
            metodoPago: metodo.value,
            ultimosDigitos: "132",
            monto: productos[0].precio,
            productos: productos
        };    
        
        return fetch(urlPedidos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        }).then(response => {
            if (!response.ok) {
                console.log("Problema para registrar pedido.");
                return;
            } 
        }).catch(error => {
            console.log("Error con la api pedidos ", error);
        });
    }


    // function vaciarCarrito(){
    //     for(let i = 0; i<carritoCliente.length;i++){

    //     }
    //     return fetch(urlCarrito, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(pedido)
    //     }).then(response => {
    //         if (!response.ok) {
    //             console.log("Problema para registrar pedido.");
    //             return;
    //         } 
    //     }).catch(error => {
    //         console.log("Error con la api pedidos ", error);
    //     });
    // }
});

const ajax = async (api_url,request) =>{
    return fetch(api_url,request)
    .then(res =>{ if(res.ok){ return "POST OK"; } else { Promise.reject() }})
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    });
}