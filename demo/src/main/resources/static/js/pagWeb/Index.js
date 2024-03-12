function pruebas(){
    const $template = document.getElementById("template").content,
        $fragment = document.createDocumentFragment(),
        $content = document.querySelector(".cnt-cards");

    const url_clzd = `http://127.0.0.1:8080/calzado`;
    
    const addCards = ()=>{
        ajax(url_clzd)
        .then(json =>{
            for (let key in json) {
                console.log(json[key].name);
                let url_img = json[key].image,
                    name = json[key].name,
                    precio = json[key].price,
                    description = json[key].description;

                //set atributtes of card
                $template.querySelector("img").setAttribute("src",url_img);
                $template.querySelector("h2").textContent = name;
                $template.querySelector("figcaption").innerHTML = `
                <p>$${precio}</p>
                <button>Agregar al carrito!</button>`;
                //Styles
                $template.querySelector("figure").classList.add("tmplCard");
                $template.querySelector("img").classList.add("imgCard");
                $template.querySelector("figcaption").classList.add("figCard");

                //create card
                let $clone = document.importNode($template,true);
                $fragment.appendChild($clone);
                $content.appendChild($fragment);
            }
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

//const showClzd = () =>{

//}

pruebas();