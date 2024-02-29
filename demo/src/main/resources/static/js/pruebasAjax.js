function addUsser(){
    const $input = document.querySelectorAll(".frm input"),
        $form = document.querySelector(".frm"),
        $btnSend = document.getElementById("request"),
        $tittle = document.querySelector(".cnt-tittle"),
        $template = document.getElementById("crud-template").content;

    let b1 = 0,
        id = 0;
        

    //---SHOW USSERS IN TABLE---
    document.addEventListener("DOMContentLoaded",showUssers(`http://127.0.0.1:4000/usser`));
    
    //---SUBMIT---
    document.addEventListener("submit", async(e) =>{ 
        let data = e.target;
        console.log(id);
        if(e.target === $form){
            e.preventDefault();
            if( $btnSend.textContent === "SEND" ){
                
                $input.forEach(el => { if(el.value === '') b1 = 1; });
                if(b1!=0){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Falta llenar el formulario!",
                      });
                }
                else{
                    console.log(data.name.value);
                    const POST_request = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "name" : data.name.value,
                            "lastnF" : data.lastF.value,
                            "lastnM" : data.lastM.value,
                            "age" : data.age.value,
                            "city" : data.cty.value,
                            "email" : data.eml.value
                        })
                    };

                    Swal.fire({
                        title: "Usuario Agregado!",
                        icon: "success"
                      }).then((isOk) => {
                        if(isOk){
                            sendUsser("http://127.0.0.1:8080/usser/addUsu",POST_request);
                        }
                      })
                };
                b1 = 0;
            }else{
                const PUT_request = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "name" : data.name.value,
                        "lastnF" : data.lastF.value,
                        "lastnM" : data.lastM.value,
                        "age" : data.age.value,
                        "city" : data.cty.value,
                        "email" : data.eml.value
                    })
                };
                
                modifUssrs(`http://127.0.0.1:4000/usser/${id}`,PUT_request);
                id = 0;
            }           
        }
    });

    //---BUTTONS EVENT CLICK---
    document.addEventListener("click", (e)=>{
        let data = e.target,
            res;
        if(e.target.matches(".btn-edit")){
            $form.name.value = data.dataset.name;
            $form.lastF.value = data.dataset.lastnF;
            $form.lastM.value = data.dataset.lastnM;
            $form.age.value = data.dataset.age;
            $form.cty.value = data.dataset.city;
            $form.eml.value = data.dataset.email;
            //change states
            $tittle.textContent = "EDIT USSER";
            $btnSend.textContent = "Edit";
            id = data.dataset.id;
            console.log(data.dataset.name);
        }
        if(e.target.matches(".btn-dlt")){
            const DELETE_request = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };
            //libreria de efectos
            Swal.fire({
                title: `Estas seguro de eliminar ha ${data.dataset.name} ?`,
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
                    icon: "success"
                  });
                  DltUssrs(`http://127.0.0.1:4000/usser/dltUsu/${id}`,DELETE_request);
                }
              });
            
              /*
            do {
                res = prompt(`¿Seguro que desea eliminar ha (y/n): ${data.dataset.name}  ${data.dataset.lastnF}`);
                if(res !== "n" && res !== "y"){
                    alert("Ingrese (y/n)");
                }         
            } while ( res !== "y" && res !== "n");

            if(res != "n"){
                id = data.dataset.id;
                DltUssrs(`http://127.0.0.1:4000/usser/${id}`,DELETE_request);
            }*/
        }
    });
    
}

//POST ussers
async function sendUsser(url,request){
    try {
        let res = await fetch(url,request),
            json = await res.json();
                          //location.reload :  hace que se recargue de manera automatica la pagina al receibir una petición
        console.log("-->",request.method);
        if(!res.ok) { throw { status: res.status, statusText: res.statusText } } 
        if(res.ok) 
        location.reload();
    } catch (err) {
        let msg = err.statusText || "Ocurrio un error";
            console.log("status : ",err.status,"-",msg);
    }
}

//GET ussers in table
async function showUssers(url_api){
    try {
        let res = await fetch(url_api),
            json = await res.json();
        if(!res.ok) { throw { status: res.status, statusText: res.statusText }} 
        if(res.ok) console.log("ok");
        addDom(json);
    } catch (err) {
        let msg = err.statusText || "Ocurrio un error";
            console.log("status : ",err.status,"-",msg);
    }
}

//PUT ussers
async function modifUssrs(url_api,request){
    try {
        let res = await fetch(url_api,request),
            json = await res.json();   
        if(!res.ok) { throw { status: res.status, statusText: res.statusText }} 
        if(res.ok) console.log("editado ok");
        location.reload();
    } catch (err) {
        let msg = err.statusText || "Ocurrio un error";
            console.log("status : ",err.status,"-",msg);
    }
}

//Delete ussers
async function DltUssrs(url_api,request){
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

//Construcción de la tabla
function addDom(json){
    const $template = document.getElementById("crud-template").content,
        $table = document.querySelector(".crud-table tbody"),
        $input = document.querySelectorAll(".frm input"),
        $fragment = document.createDocumentFragment(); 

    json.forEach(el =>{
        //Elementos td
        $template.querySelector(".id").textContent = el.id;
        $template.querySelector(".name").textContent = el.name;
        $template.querySelector(".lstnF").textContent = el.lastnF;
        $template.querySelector(".lstnM").textContent = el.lastnM;
        $template.querySelector(".age").textContent = el.age;
        $template.querySelector(".city").textContent = el.city;
        $template.querySelector(".email").textContent = el.email;
        //Elementos buttons
        // dataset : Colocar un nombre "dataset.any" seguido de la imformación que tomara el dataset, en este caso es el atributo del json

        //button editar
        $template.querySelector(".btn-edit").dataset.id = el.id;
        $template.querySelector(".btn-edit").dataset.name = el.name;
        $template.querySelector(".btn-edit").dataset.lastnF = el.lastnF;
        $template.querySelector(".btn-edit").dataset.lastnM = el.lastnM;
        $template.querySelector(".btn-edit").dataset.age = el.age;
        $template.querySelector(".btn-edit").dataset.city = el.city;
        $template.querySelector(".btn-edit").dataset.email = el.email;
        
        //button eliminar
        $template.querySelector(".btn-dlt").dataset.id = el.id;
        $template.querySelector(".btn-dlt").dataset.name = el.name;
        $template.querySelector(".btn-dlt").dataset.lastF = el.lastF;

        //Style
        $template.querySelector(".btn-edit").classList.add("btns");
        $template.querySelector(".btn-dlt").classList.add("btns");
        let $clone = document.importNode($template,true);
        $fragment.appendChild($clone);
    });

    $table.appendChild($fragment);
}

function pruebas(){
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
            icon: "success"
          });
        }
      });
}

addUsser();