function pruebas(){
    const $template = document.getElementById("template").content,
        $tmplModl = document.getElementById("tmpl_mdl").content,
        $modal = document.querySelector(".modal"),
        $fragment = document.createDocumentFragment(),
        $contentMdl = document.querySelector(".cnt-modal"),
        $content = document.querySelector(".cnt-cards");

    const url_clzd = `http://127.0.0.1:8080/calzado`;
    
    //--Load and Show Cards--
    document.addEventListener("DOMContentLoaded",addCards());

    //--Click Event Modal--
    document.addEventListener("click", (e)=>{               //Evento clickleable
        //r = Array.from($cards.children);
        r2 = Array.from(e.target.children);
        let data = e.target;

        //article Modal
        if(e.target.matches(".cnt-elmnts")){
            $modal.classList.toggle("openModl");       //Abre la ventana del Modal
            
            //Definir las variables a los datasets para obtener su información
            let name = e.target.dataset.name,
              Image = JSON.parse(e.target.dataset.image),         //Imagenes del Producto
              tam = JSON.parse(e.target.dataset.sizes),
              cant = e.target.dataset.cantidad,
              precio = e.target.dataset.price,
              color = e.target.dataset.color;
              charact = JSON.parse(e.target.dataset.charact),       //caracteristicas del producto
                leyenda = charact["leyenda"],         // caracteristicas/leyenda
                detls = charact["details"];

                    //---Set atributtes of modal---
            //Lado izquierdo del Modal
            lftSizeMdl($tmplModl,name,Image,leyenda,detls);

            //Lado derecho del Modal
            rightSizeMdl($tmplModl,name,tam,cant,precio,color);
            
            
            //create modal
            let $clone = document.importNode($tmplModl,true);
            $fragment.appendChild($clone);
            $contentMdl.appendChild($fragment);    
        }
 
        //Btn Cerrar Modal
        if(e.target.matches(".btn-close")){
             $modal.classList.toggle("openModl");
             $contentMdl.innerHTML = '';
            }

    });

    //GET Cards
    async function addCards(){
        let num = 4;
        ajax(url_clzd)                  //promesa a la peticion
        .then(json =>{                  //Devuelve el json con la info de la bd
            console.log(json);
            for (let key in json) {     //Accede mediante un ciclo a las llaves del json de la db y toma sus valores
                //url_img : Resivira un conjunto de imagenes
                let name = json[key].name,  
                    url_img = json[key].images,                         //Objeto : /images 
                    size = json[key].sizes,                             //Objeto : /sizes   
                    cant = json[key].cantidad,
                    clr =  json[key].color,
                    precio = json[key].price,               
                    charact = json[key].characteristics                 //Objeto : /characteristics
                        dtls = json[key].characteristics.details        //Object : /characteristics/details


                //set atributtes of card
                //Establecer la portada de la imagen principal de producto
                $template.querySelector("img").setAttribute("src",url_img["1"]);
                $template.querySelector("h2").textContent = name;
                $template.querySelector("figcaption").innerHTML = `
                <p id="crd-precio">$${precio}</p>
                <button id="crd-buttn">Agregar al carrito!</button>`;
                

                //JSON.stringify(
                //establecer dataset al template

                 //El dataset de "dataset.image" resive
                 //un conjunto de urls donde convertiremos
                 //la respuesta de la promesa en un json ya que
                 //los dataset solo almacenan información limitada

                // --- CONJUNTO DE DATASET´S PARA ALMACENAR INFORMACIÓN DEL JSON --- 
                //Nombre del calzado
                $template.querySelector(".cnt-elmnts").dataset.name = name;
                //Enlaces de imagenes
                $template.querySelector(".cnt-elmnts").dataset.image = JSON.stringify(url_img);
                //Tamaños del calzado
                $template.querySelector(".cnt-elmnts").dataset.sizes = JSON.stringify(size);   
                //Cantidad disponible del producto
                $template.querySelector(".cnt-elmnts").dataset.cantidad = cant;     
                //Color del Calzado
                $template.querySelector(".cnt-elmnts").dataset.color = clr;
                //Precio del calzado 
                $template.querySelector(".cnt-elmnts").dataset.price = precio;
                //Caracteristicas del calzado
                $template.querySelector(".cnt-elmnts").dataset.charact = JSON.stringify(charact);   //Acepta arreglos
                    //detalles del calzado
                $template.querySelector(".cnt-elmnts").dataset.details = JSON.stringify(dtls);      //Acepta arreglos

                //Styles
                $template.querySelector("figure").classList.add("tmplCard");
                $template.querySelector("div").classList.add("pru");
                $template.querySelector("img").classList.add("imgCard");
                $template.querySelector("figcaption").classList.add("figCard");
                //$template.querySelector("figcaption p").classList.add("precio");
               
                //create card
                let $clone = document.importNode($template,true);
                $fragment.appendChild($clone); 
            }
            $content.appendChild($fragment);
            //limpiar contenido
            //$fragment = "";
        });
    }
   // addCards();    
}

//---Left Size Modal---
// *Recibe el template del modal para acceder a sus datasets
function lftSizeMdl(tmplf,name,Image,leyenda,detls){
    // ---  left side  ---
        //--Imagen Principal del Producto--
        tmplf.querySelector("#left-Img-main").setAttribute("src",Image["1"]);            
        
        //--Galeria de Imagenes del Producto--
        tmplf.querySelector("#left-Img-1").setAttribute("src",Image["1"]);
        tmplf.querySelector("#left-Img-2").setAttribute("src",Image["2"]);
        tmplf.querySelector("#left-Img-3").setAttribute("src",Image["3"]);

        // --- Info Product ---
        //product name
        tmplf.querySelector("#left-name").textContent = name;
        
        //---calzado leyenda---
        tmplf.querySelector("#lft-leyend").innerHTML = 
            `
            <h2>LEYENDA</h2>
            <p>${leyenda}</p>
            `;

        //---Listado Calzado Detalles---
        let tam = Object.keys(detls).length;
        console.log(tam);

        let addList = ()=>{
            let ulCnt = "<ul>"; 
            for (const key in detls) {
                if (detls.hasOwnProperty(key)) {
                    //console.log(`value ${detls[key]}`);
                    ulCnt += `<li>${detls[key]}</li>`;
                }
            }
            return ulCnt +="</ul>";
        };

        tmplf.querySelector("#lft-Dtls").innerHTML =
         `<h2>DETALLES</h2>
         ${addList()}
         `;
}

//$tmplModl,name,tam,cant,precio
function rightSizeMdl(tmplf,name,tam,cnt,prc,clr){
    //Definir los contenedores
    let cont1 = tmplf.querySelector(".rght-cnt-1"),
        cont2 = tmplf.querySelector(".rght-cnt-2"),
        cont3 = tmplf.querySelector(".rght-cnt-3"),
        cont4 = tmplf.querySelector(".rght-cnt-3");

    //---Listado Calzado Tallas---
    let Tallas = Object.keys(tam).length;
    //console.log(Tallas);
    //console.log(tam);

    let addTam = ()=>{
        let boxCnt = ""; 
        for (const key in tam) {
            if (tam.hasOwnProperty(key)) {
                boxCnt += `
                    <div>
                        <p>${tam[key]}</p>
                    </div>
                `;
            }
        }
        return boxCnt;
    };

    //--Establecer sus elementos--
    cont1.innerHTML = 
    `
        <h2>${name}</h2>
        <h3>${prc}</h3>
    `;

    cont2.innerHTML = 
    `
        <p>TALLAS</p>
        <div class="Tallas">
            ${addTam()}
        </div>
    `;

    cont3.innerHTML = 
    `
        <p>COLOR</p>
        <div style="color: ${clr};">Texto en rojo y negrita-</div>`
    `;  
}   


//Peticiones Fetch
const ajax = async (api_url) =>{
    return fetch(api_url)
    .then(res =>{ if(res.ok){ return res.json(); } else { Promise.reject() }})
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    })
}

function prue(){
    const url_clzd = `http://127.0.0.1:8080/calzado`;
    let url_img;
    ajax(url_clzd)
    .then(json =>{

       let charact = json["0"].characteristics.details;
        console.log(charact);
        
        /*console.log(url_img);
        for (let key in json) {
            charact = json[key].characteristics;
        }*/

    })
}

pruebas();
//prue();
//prModal();