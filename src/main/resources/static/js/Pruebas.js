function pr(){
    $inpt = document.querySelector(".input");
    
    let val = parseInt($inpt.value);
    val = 1;
    $inpt.value= val;

    document.addEventListener("click", (e)=>{
        console.log($inpt.value);
        val +=1;
        $inpt.value = val;
    });

}

pr();