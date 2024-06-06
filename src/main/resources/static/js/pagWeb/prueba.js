function showCards() {
    //Contenedor para las Tarjetas
    const $cntCards = document.querySelector(".cnt-cards"),
        $templateCards = document.querySelector(".cardCnt"),
        $fragment = document.createDocumentFragment();
    const url_clzd = `http://127.0.0.1:8080/Calzado/`;
    console.log($templateCards);

    ajax(url_clzd)
    .then(json =>{
        //console.log(json);    
        for (let key in json) {
            let id = json[key].id, 
                    nombre = json[key].nombre,  
                    url_img = json[key].images,                         //Objeto : /images 
                    size = json[key].sizes,                             //Objeto : /sizes   
                    cant = json[key].cantidad,
                    clr =  json[key].color,
                    precio = json[key].price,               
                    charact = json[key].characteristics                 //Objeto : /characteristics
                        promo = json[key].characteristics.promo
                        dtls = json[key].characteristics.details  
        
            //Settear elementos de la tarjeta
            $templateCards.querySelector("img").setAttribute("src",url_img["1"]);
            $templateCards.querySelector("h2").textContent = nombre;
            $templateCards.querySelector("figcaption").innerHTML = `
                    <p id="crd-precio">$${precio}</p>
                    <button id="crd-buttn">Agregar al carrito!</button>`;

        
            // --- CONJUNTO DE DATASET´S PARA ALMACENAR INFORMACIÓN DEL JSON --- 
            $templateCards.querySelector(".cnt-elmnts").dataset.id = id;
            //Nombre del calzado
            $templateCards.querySelector(".cnt-elmnts").dataset.nombre = nombre;
            //Enlaces de imagenes
            $templateCards.querySelector(".cnt-elmnts").dataset.image = JSON.stringify(url_img);
            //Tamaños del calzado
            $templateCards.querySelector(".cnt-elmnts").dataset.sizes = JSON.stringify(size);   
            //Cantidad disponible del producto
            $templateCards.querySelector(".cnt-elmnts").dataset.cantidad = cant;     
            //Color del Calzado
            $templateCards.querySelector(".cnt-elmnts").dataset.color = JSON.stringify(clr);
            //Precio del calzado 
            $templateCards.querySelector(".cnt-elmnts").dataset.price = precio;
            //Caracteristicas del calzado
            $templateCards.querySelector(".cnt-elmnts").dataset.charact = JSON.stringify(charact);   //Acepta arreglos
            //Colocar etiquetado de promoción
            $templateCards.querySelector(".cnt-elmnts").dataset.promo = promo;   //Acepta arreglos
                //detalles del calzado
            $templateCards.querySelector(".cnt-elmnts").dataset.details = JSON.stringify(dtls);      //Acepta arreglos
        
            //Styles
            $templateCards.classList.add("tmplCard");
            $templateCards.querySelector("div").classList.add("pru");
            $templateCards.querySelector("img").classList.add("imgCard");
            $templateCards.querySelector("figcaption").classList.add("figCard");
            
            let $clone = document.importNode($templateCards,true);
            $fragment.appendChild($clone); 
        }
        //Add cards
        $cntCards.appendChild($fragment);
        const r =  $cntCards.querySelectorAll(".cnt-elmnts");

        r.forEach(i =>{
            //console.log(i.getAttribute("data-id"));
        })

        //pru($cntCards);

    });
}

//Elementos tarjeta
function pru(ji){
    const jr = document.querySelectorAll(".cnt-elmnts")
    console.log(jr);
    //const $cntCards = document.querySelectorAll(".cnt-cards");
    //const r = ji.document.querySelectorAll("div");
    r.forEach(i =>{
       // console.log(i.getAttribute("data-id"));
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

document.addEventListener("DOMContentLoaded", ()=>{
    showCards();
})
pru();