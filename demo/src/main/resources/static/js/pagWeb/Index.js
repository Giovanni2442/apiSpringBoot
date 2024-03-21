function pruebas(){
    const $template = document.getElementById("template").content,
        $fragment = document.createDocumentFragment(),
        $content = document.querySelector(".cnt-cards");

    const url_clzd = `http://127.0.0.1:8080/calzado`;
    
    //Agregar tarjetas al Index de la pagina
    const addCards = ()=>{
        let num = 4;
        ajax(url_clzd)                  //promesa a la peticion
        .then(json =>{                  //Devuelve el json con la info de la bd
            for (let key in json) {     //Accede mediante un ciclo a las llaves del json de la db y toma sus valores
               // console.log(json[key].name);
                let url_img = json[key].image,
                    name = json[key].name,
                    precio = json[key].price,
                    description = json[key].description;

                //set atributtes of card
                $template.querySelector("img").setAttribute("src",url_img);
                $template.querySelector("h2").textContent = name;
                $template.querySelector("figcaption").innerHTML = `
                <p id="crd-precio">$${precio}</p>
                <button id="crd-buttn">Agregar al carrito!</button>`;
                
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
        });
    }

    addCards();    
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

function prModal(){
    const $cards = document.querySelector(".cnt-cards"),    //Referencia al contenido de las cards
        $modal = document.querySelector(".modal");
    let r,r2,cards;

    document.addEventListener("click", (e)=>{               //Evento clickleable
        r = Array.from($cards.children);
        r2 = Array.from(e.target.children);
    
       // console.log(r2);
        console.log(e.target.className);
        if(e.target.className === "cnt-elmnts pru"){
            //console.log("true jer");
            $modal.style.visibility = "visible";
 
        }
        /*r.forEach(el =>{
            const $h2Elmnt = el.querySelector("h2");
            console.log($h2Elmnt.textContent);
        })*/
        //console.log($cards.children);
    });
}

prModal();
pruebas();