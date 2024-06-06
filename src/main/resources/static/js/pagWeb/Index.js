function pruebas(){
    const $template = document.getElementById("template").content,
        $tmplModl = document.getElementById("tmpl_mdl").content,
        $modal = document.querySelector(".modalCnt"),
        $fragment = document.createDocumentFragment(),
        $contentMdl = document.querySelector(".cnt-modal"),
        $content = document.querySelector(".cnt-cards");
        

    const url_clzd = `http://127.0.0.1:8080/Calzado/`;
    
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
            let id = e.target.dataset.id,
                name = e.target.dataset.nombre,
                Image = JSON.parse(e.target.dataset.image),         //Imagenes del Producto
                tam = JSON.parse(e.target.dataset.sizes),
                cant = e.target.dataset.cantidad,
                precio = e.target.dataset.price,
                color = JSON.parse(e.target.dataset.color);
                charact = JSON.parse(e.target.dataset.charact),       //caracteristicas del producto
                    promo = charact["promo"],
                    leyenda = charact["leyenda"],         // caracteristicas/leyenda
                    detls = charact["details"];

                    console.log(promo);
                    //---Set atributtes of modal---
            //Lado izquierdo del Modal
            document.addEventListener("DOMContentLoaded",lftSizeMdl($tmplModl,name,Image,leyenda,detls)); 

            //Lado derecho del Modal
            document.addEventListener("DOMContentLoaded",rightSizeMdl($tmplModl,id,name,tam,cant,precio,color,Image));

            //filterCard($template,promo);
                
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
                let id = json[key].id, 
                    nombre = json[key].nombre,  
                    url_img = json[key].images,                         //Objeto : /images 
                    size = json[key].sizes,                             //Objeto : /sizes   
                    cant = json[key].cantidad,
                    clr =  json[key].color,
                    precio = json[key].price,               
                    charact = json[key].characteristics                 //Objeto : /characteristics
                        promo = json[key].characteristics.promo
                        dtls = json[key].characteristics.details        //Object : /characteristics/details

                console.log(promo);
                //console.log(etiquetapromo);
                //set atributtes of card
                //Establecer la portada de la imagen principal de producto
                //Determinar si cuenta con promoción o no
                $template.querySelector(".jeje").innerHTML = ``;
                if(promo != "N/A"){
                    $template.querySelector(".jeje").innerHTML = `
                        <div class="etiquetaProm">DESCUENTO DEL : ${promo}</div>
                    `;
                }   
                
                $template.querySelector("img").setAttribute("src",url_img["1"]);
                $template.querySelector("h2").textContent = nombre;
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
                $template.querySelector(".cnt-elmnts").dataset.id = id;
                //Nombre del calzado
                $template.querySelector(".cnt-elmnts").dataset.nombre = nombre;
                //Enlaces de imagenes
                $template.querySelector(".cnt-elmnts").dataset.image = JSON.stringify(url_img);
                //Tamaños del calzado
                $template.querySelector(".cnt-elmnts").dataset.sizes = JSON.stringify(size);   
                //Cantidad disponible del producto
                $template.querySelector(".cnt-elmnts").dataset.cantidad = cant;     
                //Color del Calzado
                $template.querySelector(".cnt-elmnts").dataset.color = JSON.stringify(clr);
                //Precio del calzado 
                $template.querySelector(".cnt-elmnts").dataset.price = precio;
                //Caracteristicas del calzado
                $template.querySelector(".cnt-elmnts").dataset.charact = JSON.stringify(charact);   //Acepta arreglos
                //Colocar etiquetado de promoción
                $template.querySelector(".cnt-elmnts").dataset.promo = promo;   //Acepta arreglos
                    //detalles del calzado
                $template.querySelector(".cnt-elmnts").dataset.details = JSON.stringify(dtls);      //Acepta arreglos
                //Styles
                $template.querySelector("figure").classList.add("tmplCard");
                $template.querySelector("div").classList.add("pru");
                $template.querySelector("img").classList.add("imgCard");
                $template.querySelector("figcaption").classList.add("figCard");
                //$template.querySelector("figcaption p").classList.add("precio");
               
                //filterCard(promo,$template);
                //create card
                let $clone = document.importNode($template,true);
                $fragment.appendChild($clone); 
            }
            $content.appendChild($fragment);
            
            const e = $content.querySelectorAll(".cardCnt");
            console.log(e);

            //Filtrado por header
            filterCard($content);
            //Filtrado por busqueda
            filterSearch($content);
        });
    }

   // addCards();    
}


    // --- FUNCIÓNES PARA LA CREACIÓN DEL MODAL ---

//---Left Size Modal---
// *Recibe el template del modal para acceder a sus datasets
function lftSizeMdl(tmplf,name,Image,leyenda,detls){
    // ---  left side  ---
        //--Imagen Principal del Producto--
        const $mainCarrucel = tmplf.querySelector("#left-Img-main");

        console.log( tmplf.getElementById("carru-img-1"));

        //--Imagenes del Carrucel--
        tmplf.querySelector("#carru-img-1").setAttribute("src",Image["1"]);
        tmplf.querySelector("#carru-img-2").setAttribute("src",Image["2"]);     
        tmplf.querySelector("#carru-img-3").setAttribute("src",Image["3"]);                 
        
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
            <h2 id="leyend-tittle">LEYENDA</h2>
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
                    ulCnt += `<li id="dtl-li">${detls[key]}</li>`;
                }
            }
            return ulCnt +="</ul>";
        };

        tmplf.querySelector("#lft-Dtls").innerHTML =
         `<h2 id="details-tittle">DETALLES</h2>
         ${addList()}
         `;
}

//$tmplModl,name,tam,cant,precio
function rightSizeMdl(tmplf,id,name,tam,cnt,prc,clr,Img){
    //Definir los contenedores
    let cont1 = tmplf.querySelector(".rght-cnt-1"),
        cont2 = tmplf.querySelector(".rght-cnt-2"),
        cont3 = tmplf.querySelector(".rght-cnt-3"),
        cont4 = tmplf.querySelector(".rght-cnt-4"),
        cont5 = tmplf.querySelector(".rght-cnt-5");

    //Variables para obtener el valor del modal
    let valTalla = 0,       //Valor de la talla
        valColor = "",      //Valor del Color
        valCant = 1;        //Valor de la cantidad de pares

        //--Items para el ciclo for--
    //*Tamaños del Producto
    let addSize = (item,key)=>{
        let sizes = `
            <div class="btn">
                ${item[key]}
            </div>
            `;
        return sizes;
    } 
    //*Colores del producto
    let colors = (clr,key)=>{
        let addColor = `
            <div class="color" id="${clr[key]}" style="background-color: ${clr[key]};"></div>
        `;
        return addColor;
    } 

        //---FUNCION REACTIVA---
    let addItems = (value,item)=>{  //Funcion que construye elementos dependiendo de los tamaños de la tarjeta seleccionada
        let boxCnt = ""; 
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                boxCnt += item(value,key);
            }
        }
        return boxCnt;
    };

    //--Establecer elementos del contenido DERECHO--

    //----Nombre y precio----
    cont1.innerHTML = 
    `
        <h2>${name}</h2>
        <h3>$${prc}</h3>
    `;
    //-----------------------

    //--------Tallas------------
    cont2.innerHTML = 
    `
        <p id="talls-tittle">TALLAS</p>
        <div class="Tallas">
            ${addItems(tam,addSize)}
        </div>
    `;
        //--Marcar el Objeto seleccionado--
        let lastClickTlls = null;   //Ultimo elemento cliqueado para colocar el border
        let valTlls = (e)=>{
            if(e.target.className === "btn"){
                if(lastClickTlls){
                    lastClickTlls.style.border = ``;
                }
                //Cambia el fondo actual
                e.target.style.border = `2px solid blue`;

                //Actuliza el ultimo elemento
                lastClickTlls = e.target
                valTalla = parseInt(e.target.textContent);
                console.log("talla",valTalla);
            } 
        }

       evntClick("btn",valTlls);    
    //--------------------------------------

    //------Colores Disponibles-------
    cont3.innerHTML = 
    `
        <p id="color-tittle">COLORES DISPONIBLES :</p>
        <div class="Colors"> 
           ${addItems(clr,colors)}
        </div>
    `;

    let lastClickClrs = null;
    let valClrs = (e)=>{
        if(e.target.className === "color"){
            if(lastClickClrs){
                lastClickClrs.style.border = ``;
            }
            //Cambia el fondo actual
            e.target.style.border = `2px solid blue`;

            //Actuliza el ultimo elemento
            lastClickClrs = e.target
            valColor = e.target.id;
            console.log("color",valColor);
        } 
    }

    evntClick("color",valClrs);

    //--------------------------------

    //-------CANTIDAD---------
    cont4.innerHTML = `
        <p id="cant-tittle">CANTIDAD</p>
        <div class="addCar">
            <form class="fmr-cant">
                <select name="cantidad" class="Cant" id="selct">
                    <option class="op">1</option>
                    <option class="op">2</option>
                    <option class="op">3</option>
                    <option class="op">4</option>
                </select>
            </form>
            <div class="btn-carrito">VER PRODUCTO!</div>
        </div>
    `;

    //-------------------------------------------------------------

    //--- POLITICA DE COMPRA --- 
    cont5.innerHTML = `
        <div class="plt-envio">
            <div id="cnt-img">
                <img src="assets/Simbolos/envio.png" alt="">
                <p id="encabezado">ENVIO GRATIS</p>
            </div>

            <div id="descr">
                <p id="txt-descr">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem dolorem unde illo iste sunt! Ad, aliquid consequatur
                    in corrupti voluptate fugit optio, veritatis sunt voluptas
                    perferendis necessitatibus? Similique, eveniet at!
                </p>
            </div>
        </div>

        <div class="plt-Dev">
            <div id="cnt-img">
                <img src="assets/Simbolos/Devoluciones.png" alt="">
                <p id="encabezado">DEVOLUCIONES GRATIS</p>
            </div>
            
            <div id="descr">
                <p id="txt-descr">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem dolorem unde illo iste sunt! Ad, aliquid consequatur
                    in corrupti voluptate fugit optio, veritatis sunt voluptas
                    perferendis necessitatibus? Similique, eveniet at!
                </p>
            </div>
        </div>

        <div class="plt-pago">
            <div id="cnt-img">
                <img src="assets/Simbolos/pago.png" alt="">
                <p id="encabezado">PAGO SEGURO</p>
            </div>
            
            <div id="descr">
                <p id="txt-descr">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem dolorem unde illo iste sunt! Ad, aliquid consequatur
                    in corrupti voluptate fugit optio, veritatis sunt voluptas
                    perferendis necessitatibus? Similique, eveniet at!
                </p>
            </div>
        </div>

        <div class="plt-Intrs">            
            <div id="cnt-img">
                <img src="assets/Simbolos/meses_intereses.png" alt="">
                <p id="encabezado">MESES SIN INTERESES</p>
            </div>

            <div id="descr">
                <p id="txt-descr">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem dolorem unde illo iste sunt! Ad, aliquid consequatur
                    in corrupti voluptate fugit optio, veritatis sunt voluptas
                    perferendis necessitatibus? Similique, eveniet at!
                </p>
            </div>
        </div>
    `;

    let ele = cont4.querySelector(".Cant");
    console.log(ele);

    let valCnt = (e) =>{
        valCant = e.target.value;
        console.log("Cantidad",valCant);
    }

    let btnCar = (e)=>{
        let total = valCant*prc; //El total a pagar por la cantidad
        if(e.target.className === "btn-carrito"){
            console.log("agrga");
            //Inserta en el carrito
            addCar(id,name,valCant,prc,valTalla,valColor,total,Img[1]);

            //Modal Carrito
            Swal.fire({
                html: `
                    <h2 class="mdlCar-msgAdd">Elemento Agregado!</h2>
                    <div class="mdlCar">
                        <div class="mdlCarImg">

                            <div class="cntImg">
                                <img id="mdlCar-Img" src="${Img[1]}">
                            </div>

                            <div class="mdlCar-Dtls">
                                <p id="nameProd">${name}</p>
                                <p id="tallaProd">TALLA : ${valTalla}</p>
                                <p id="clrProd">COLOR : ${valColor}</p>
                                <p id="cntProd">TOTAL : $${total}</p>
                            </div>
                        </div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "IR AL CARRITO"
              }).then((result) => { 
                if (result.isConfirmed) {
                  window.location.href = `/Carrito`;
                } else {
                    location.reload();
                }
              });
        }
    }

    //Botton con modal del producto
    evntClick("btn-carrito",btnCar);
    evntClick("Cant",valCnt);

    //----------------------------------------
  
    document.addEventListener("click",(e)=>{
        /*if(e.target.id === "btn-add-car"){
            console.log("-x",valCant,
                    "-x",valTalla,
                    "-x",valColor
            );
        }*/
        console.log(e.target.className);

    });
}

//---Evento de Click para los valores del Modal---
    //Parche para el bug para obtener el valor 
const evntClick = (nameObj,fnct)=>{
    document.addEventListener('click',(e)=> {
        if(e.target.className === nameObj){
            fnct(e);
        }
    }); 
}

//Agregar elementos al carrito
const addCar = (id,name,cnt,price,tll,clr,total,img)=>{
    const url_carr = `http://127.0.0.1:8080/Carrito/`;
    //POST REQUEST CARRITO
    const POST_request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "id" : id,
            "nameProd" : `${name}`,
            "cantidad" : cnt,
            "precioProd" : price,
            "talla" : tll,
            "color" : `${clr}`,
            "total" :  total,
            "imgProd" : `${img}`
        })
    };

    ajaxCarr(url_carr,POST_request)
    .then(res =>{
        console.log(res);
    })
}

//Peticiones Fetch Calzado
const ajax = async (api_url) =>{
    return fetch(api_url)
    .then(res =>{ if(res.ok){ return res.json(); } else { Promise.reject() }})
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    });
}

//Peticiones Fetch Carrito
const ajaxCarr = async (api_url,request) =>{
    return fetch(api_url,request)
    .then(res =>{ if(res.ok){ return "POST OK!";   } else { Promise.reject() }})
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    });
}

// --- FUNCIONES AUXILIARES ---

//Modulo para hacer el contador del carrito
function contadorCarr(){
    const url_carr = `http://127.0.0.1:8080/Carrito/`;
    const $contCar = document.querySelector(".cnt-numElmnts");

    let numElmnts = 0;
    //POST REQUEST CARRITO
    ajax(url_carr)
    .then(json =>{
        for (const key in json) {
            console.log("--",key);
            numElmnts = Number(key) + 1;
        }

        if(numElmnts === 0){
            $contCar.classList.toggle("showCnt");
        } else{
            $contCar.innerHTML = `<p>${numElmnts}</p> `;
        }
        
    })
}

//Filtra las tarjetas por busqueda
const filterSearch = (tmpl)=>{
    const card = tmpl.querySelectorAll(".cnt-elmnts"),
        cardCnt = tmpl.querySelectorAll(".cardCnt"),
        $input = document.querySelector(".d-flex input");
        //console.log(l);
    let r,cards;
    $input.addEventListener("keydown", (e)=>{
          
            cardCnt.forEach(el =>{
                let $h2elmnt = el.querySelector("h2");
                //console.log($h2elmnt.textContent);    
                $h2elmnt.textContent.includes(e.target.value.toLocaleLowerCase())
                ?  el.classList.remove("filterCard")
                : el.classList.add("filterCard")
            });
            //console.log(e.target.value);
    });

}


//Filtra las tarjetas por busqueda
const filterCard = (tmpl)=>{
    const card = tmpl.querySelectorAll(".cnt-elmnts");
    const cardCnt = tmpl.querySelectorAll(".cardCnt");
    let conditional,atbt;

    //Apartado de Pruebas
    /*card.forEach(i =>{
       let ele = JSON.parse(i.getAttribute("data-charact"));
        console.log("...",ele.sex);
    })*/

    document.addEventListener("click", (e)=>{
        console.log(e.target.id);
        
        //Hombre
        if(e.target.id === "HOMBRE"){
            //console.log("---HOMBRE");
            conditional = (i,j)=>{
                let atbt = JSON.parse(i.getAttribute("data-charact"));
                console.log(atbt.sex);
                if(atbt.sex !== "hombre"){
                    i.style.backgroundColor = "yellow";
                    cardCnt[j].style.display = "none";
                }
            }
            conditionJson(conditional);
        }

        //MUJER
        if(e.target.id === "MUJER"){
            //console.log("---MUJER");
            conditional = (i,j) =>{
                atbt = JSON.parse(i.getAttribute("data-charact"));  
                console.log(atbt.sex);
                if(atbt.sex !== "mujer"){
                    i.style.backgroundColor = "yellow";
                    cardCnt[j].style.display = "none";
                }
            } 
            conditionJson(conditional);
        } 
        if(e.target.id === "PROMO"){
            conditional = (i,j)=>{
                atbt = JSON.parse(i.getAttribute("data-charact"));
                if(atbt.promo === "N/A"){
                    i.style.backgroundColor = "yellow";
                    cardCnt[j].style.display = "none";
                }  
            }
            conditionJson(conditional);
        }

            //MARCAS
            if(e.target.id === "MARCA 1"){
                conditional = (i,j)=>{
                    atbt = JSON.parse(i.getAttribute("data-charact"));
                    if(atbt.marca !== "mariela"){
                        i.style.backgroundColor = "yellow";
                        cardCnt[j].style.display = "none";
                    }  
                }
                conditionJson(conditional);
            }

            if(e.target.id === "MARCA 2"){
                conditional = (i,j)=>{
                    atbt = JSON.parse(i.getAttribute("data-charact"));
                    if(atbt.marca !== "flexi"){
                        i.style.backgroundColor = "yellow";
                        cardCnt[j].style.display = "none";
                    }  
                }
                conditionJson(conditional);
            }

            if(e.target.id === "MARCA 3"){
                conditional = (i,j)=>{
                    atbt = JSON.parse(i.getAttribute("data-charact"));
                    if(atbt.marca !== "versace"){
                        i.style.backgroundColor = "yellow";
                        cardCnt[j].style.display = "none";
                    }  
                }
                conditionJson(conditional);
            }

            //MATERIAL
            if(e.target.id === "MATERIAL 1"){
                console.log("--mat");
                conditional = (i,j)=>{
                    atbt = JSON.parse(i.getAttribute("data-charact"));
                    console.log(atbt.marca);
                    if(atbt.material !== "cuero"){
                        i.style.backgroundColor = "yellow";
                        cardCnt[j].style.display = "none";
                    }  
                }
                conditionJson(conditional);
            }

            if(e.target.id === "MATERIAL 2"){
                conditional = (i,j)=>{
                    atbt = JSON.parse(i.getAttribute("data-charact"));
                    if(atbt.material !== "caucho"){
                        i.style.backgroundColor = "yellow";
                        cardCnt[j].style.display = "none";
                    }  
                }
                conditionJson(conditional);
            }

            if(e.target.id === "MATERIAL 3"){
                conditional = (i,j)=>{
                    atbt = JSON.parse(i.getAttribute("data-charact"));
                    if(atbt.material !== "plastico"){
                        i.style.backgroundColor = "yellow";
                        cardCnt[j].style.display = "none";
                    }  
                }
                conditionJson(conditional);
            }

            if(e.target.id === "MATERIAL 4"){
                conditional = (i,j)=>{
                    atbt = JSON.parse(i.getAttribute("data-charact"));
                    if(atbt.material !== "corcho"){
                        i.style.backgroundColor = "yellow";
                        cardCnt[j].style.display = "none";
                    }  
                }
                conditionJson(conditional);
            }
    })

    //dataset simple
    let condition = (data)=>{
        card.forEach((i,j) =>{
            if(i.getAttribute(data) === "N/A"){
                i.style.backgroundColor = "yellow";
                //cardCnt[j].style.display = "none";
            }
        }) 
    }

    //dataset compuesto
    // data     : id del objeto
    // cndt     : condiciónal que tomara el if
    let conditionJson = (cndt)=>{
        card.forEach((i,j) =>{
            cardCnt[j].style.display = "flex";
            i.style.backgroundColor = "";
            cndt(i,j);
        }) 
    }
           
}

//Modulo para etiquetar a los productos con promoción
function prdctPromo(){
    const url_clzd = `http://127.0.0.1:8080/Calzado/`;
    ajax(url_clzd)
    .then(json =>{
        for (const key in json) {
            console.log("--",key);
            numElmnts = Number(key) + 1;
        }
    })
}

pruebas();
contadorCarr();
filterSearch();
//filterCard();
//prModal();