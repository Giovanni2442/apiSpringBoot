function addUsser(){
    const $input = document.querySelectorAll(".frm input"),
        $form = document.querySelector(".frm"),
        $btnSend = document.getElementById("request"),
        $tittle = document.querySelector(".cnt-tittle"),
        $template = document.getElementById("crud-template").content;

    let b1 = 0,
        id = "";
        
    //---SHOW USSERS IN TABLE---
    document.addEventListener("DOMContentLoaded",showUssers(`http://127.0.0.1:8080/usser`));
    
    //---SUBMIT---
    document.addEventListener("submit", async(e) =>{ 
        let data = e.target; //Optiene eñ id del json
        //console.log(id);
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
                            "name" : data.name.value,   //Valores de los input
                            "lstnF" : data.lstnF.value,
                            "lstnM" : data.lstnM.value,
                            "age" : data.age.value,
                            "email" : data.email.value,
                            "pass" : data.pass.value,
                            "tel" : data.tel.value
                        })
                    };

                    Swal.fire({
                        title: "Usuario Agregado!",
                        icon: "success"
                      }).then((isOk) => {
                        if(isOk){
                            ajax("http://127.0.0.1:8080/usser",POST_request);
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
                        "lstnF" : data.lstnF.value,
                        "lstnM" : data.lstnM.value,
                        "age" : data.age.value,
                        "email" : data.email.value,
                        "pass" : data.pass.value,
                        "tel" : data.tel.value
                    })
                };
                
                ajax(`http://127.0.0.1:8080/usser/${id}`,PUT_request);
                id = ""; //limpia la variable para dar paso a un nuevo id
            }           
        }
    });

    //---BUTTONS EVENT CLICK EDIT AND DELETE---
    document.addEventListener("click", (e)=>{
        let data = e.target,
            res;
        if(e.target.matches(".btn-edit")){
            //llenara el form con el dataset de la tabla
            $form.name.value = data.dataset.name;
            $form.lstnF.value = data.dataset.lstnF;
            $form.lstnM.value = data.dataset.lstnM;
            $form.age.value = data.dataset.age;
            $form.email.value = data.dataset.email;
            $form.pass.value = data.dataset.pass;
            $form.tel.value = data.dataset.tel;

            console.log(data.dataset.age);
            console.log(data.dataset.email);
            console.log(data.dataset.pass);

            //change states
            $tittle.textContent = "EDIT USSER";
            $btnSend.textContent = "Edit";
            id = data.dataset.id;
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
                  console.log(data.dataset.id);
                  ajax(`http://127.0.0.1:8080/usser/${data.dataset.id}`,DELETE_request)
                  //DltUssrs(`http://127.0.0.1:8080/usser/${data.dataset.id}`,DELETE_request);
                }
              });
        }
    });
    
}

//GET ussers in table
async function showUssers(url_api){
    try {
        let res = await fetch(url_api),
            json = await res.json();
        if(!res.ok) { throw { status: res.status, statusText: res.statusText }} 
        if(res.ok) {
            console.log(json);
            addDom(json);
        }
    } catch (err) {
        let msg = err.statusText || "Ocurrio un error";
            console.log("status : ",err.status,"-",msg);
    }
}

//Peticiónes ajax
function ajax(url_api,request){
    console.log("Hola");
    fetch(url_api,request)
    .then(res =>{ if(res.ok){ return "yes"; } else { Promise.reject() }})
    .then(json =>{
        console.log(json);
        location.reload();
    })
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";
        return console.log(`Error ${err.message} : ${msg}`);
    })
}


//Construcción de la tabla
function addDom(json){
    const $template = document.getElementById("crud-template").content,
        $table = document.querySelector(".crud-table tbody"),
        $input = document.querySelectorAll(".frm input"),
        $fragment = document.createDocumentFragment(); 

    json.forEach(el =>{

        console.log(el.id);
        //Elementos td
        $template.querySelector(".id").textContent = el.id;
        $template.querySelector(".name").textContent = el.name;
        $template.querySelector(".lstnF").textContent = el.lstnF;
        $template.querySelector(".lstnM").textContent = el.lstnM;
        $template.querySelector(".age").textContent = el.age;
        $template.querySelector(".email").textContent = el.email;
        $template.querySelector(".pass").textContent = el.pass;
        $template.querySelector(".tel").textContent = el.tel;
        //Elementos buttons
        // dataset : Colocar un nombre "dataset.any" seguido de la imformación que tomara el dataset, en este caso es el atributo del json

        //button editar
        $template.querySelector(".btn-edit").dataset.id = el.id;
        $template.querySelector(".btn-edit").dataset.name = el.name;
        $template.querySelector(".btn-edit").dataset.lstnF = el.lstnF; 
        $template.querySelector(".btn-edit").dataset.lstnM = el.lstnM;      
        $template.querySelector(".btn-edit").dataset.age = el.age;
        $template.querySelector(".btn-edit").dataset.email = el.email;
        $template.querySelector(".btn-edit").dataset.pass = el.pass;       
        $template.querySelector(".btn-edit").dataset.tel = el.tel;
        
        //button eliminar
        $template.querySelector(".btn-dlt").dataset.id = el.id;
        $template.querySelector(".btn-dlt").dataset.name = el.name;
        $template.querySelector(".btn-dlt").dataset.lastF = el.lstnF;

        //Style
        $template.querySelector(".btn-edit").classList.add("btns");
        $template.querySelector(".btn-dlt").classList.add("btns");
        let $clone = document.importNode($template,true);
        $fragment.appendChild($clone);
    });

    $table.appendChild($fragment);
}

/*function pruebas(){
    const PUT_request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "name" : data.name.value,
            "lstnF" : data.lstnF.value,
            "lstnM" : data.lstnM.value,
            "age" : data.age.value,
            "email" : data.email.value,
            "pass" : data.pass.value,
            "tel" : data.tel.value
        })
    };

    let url = "";

    fetch(url,PUT_request)
    .then(res => { if(res.ok) ? })
    .then()
    .catch()
}*/


addUsser();
//pruebas();