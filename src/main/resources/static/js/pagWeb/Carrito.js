//Mostrar productos del Carrito
function addProductCar(){
    const $productos = document.querySelector(".cnt-prdcts");
    
    //console.log($productos);

    const url_Carrito = `http://127.0.0.1:8080/Carrito/`;
     //--Load and Show Cards--
     document.addEventListener("DOMContentLoaded",addPrdct());

    //Agregar productos al carrito
    async function addPrdct(){
        ajax(url_Carrito)
        .then(json =>{
            for(let key in json){
                let id = json[key].id,
                    name = json[key].nameProd,
                    cant = json[key].cantidad,
                    precio = json[key].precioProd,
                    talla = json[key].precioProd,
                    color = json[key].talla,
                    total = json[key].total,
                    img = json[key].imgProd
                //console.log("---------i",key);
                //Agregar elementos con inner
                $productos.innerHTML += `
                    <tr class="tr-prdct">
                        <th scope="row">${key}</th>
                        <td id="td-img">
                            <img src="${img}">
                        </td>   
                        <td>
                            <p class="name">${name}</p>
                            <p>${color}</p>
                            <p>${talla}</p>
                            <p>${id}</p>
                        </td>
                        <td>$${precio}</td>
                        <td>${cant}</td>
                        <td>$${total}</td>
                        <td id="td-delete">   
                            <img data-id="${id}" class="imgDelt" src="assets/logo/delete.png">
                        </td>
                    </tr>
                `;
            }

            const $dltBtn = document.querySelectorAll(".imgDelt"); 
            $dltBtn.forEach(i => {
                let request = peticiones(),
                    id = i.getAttribute('data-id');
                i.addEventListener("click", (e) => {
                    //console.log(i.getAttribute('data-id'));
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                          //Request Delete product
                          request["DELETE"](id);
                          location.reload();
                        }
                      });

                    //let id = e.target.getAttribute('data-id');
                    //let request = peticiones();
                    //console.log(request["DELETE"](id));
                    //console.log(peticiones(id));
                
                    //console.log(e.target.getAttribute('data-id'));
                });
            });
 
            
            
        });
    }
}

function peticiones(){
    let url_request = ``;
    let request = {
        "DELETE": (id)=>{
            url_request = `http://127.0.0.1:8080/Carrito/${id}`;
            const DELETE_request = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            ajaxMod2(url_request,DELETE_request);
        },
        "2":"tal",
        "3":"hola"
    }

    return request;
}

//Peticiones ajax
const ajax = async (api_url)=>{
    return fetch(api_url)
    .then(res =>{ if(res.ok){ return res.json();} else { Promise.reject() }  location.reload();})
    
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    });
}

/*//Peticiones ajax modificar product del carrito
const ajaxMod = async (api_url,request)=>{
    return fetch(api_url,request)
    .then(res =>{ if(res.ok){ return "Ok";  } else { Promise.reject() } location.reload();})
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    });
}*/

async function ajaxMod2(url_api,request){
    try {
        let res = await fetch(url_api,request),
            json = await res.json();
        if(!res.ok) { throw { status: res.status, statusText: res.statusText }} 
        if(res.ok) console.log("Delete ok!");
        location.reload();
    } catch (err) {
        let msg = err.statusText || "Ocurrio un error";
            console.log("status : ",err.status,"-",msg);
    }
}



//peticiones();
addProductCar();

