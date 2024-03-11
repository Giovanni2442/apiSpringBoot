function pruebas(){
    const $template = document.getElementById("template").content,
        $fragment = document.createDocumentFragment(),
        $content = document.querySelector("cnt-cards");

    
    const result = ()=>{
        ajax()
        .then(json =>{
            console.log(json);
        });
    }
}

//Peticiones Fetch
const ajax = async (api_url) =>{
    return fetch()
    .then(res =>{ if(res.ok){ return res.json(); } else { Promise.reject() }})
    .catch(err =>{
        let msg = err.statusText || "Ocurrio un error";                     // "||" : Se le conoce como "coalecencia nula" y se aplica al que le sigue de las barras si cumple con : "(undefined, null, false, 0, "" o NaN)"
        return console.log(`Error ${err.message} : ${msg}`);
    })
}

pruebas();