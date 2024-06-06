package com.example.demo.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/*
    * Controllaer : Devuelve Vistas de un template, maneja modelo MVC
    * RestController : Crea Servicios RestFul para devolcer json o información
 
 Nota: Actualizar navegador : cntrl + shift + R
    */

@Controller
public class viewRedorect {
    @GetMapping("form")
    public String form(){
        return "form";
    }

    @GetMapping("jeje")
    public String jeje(){
        return "jeje";
    }

    @GetMapping("/Carrito")
    public String carrito(){
        return "productos/Carrito";
    }

    //Productos
    @GetMapping("/Index")
    public String index(){
        return "productos/Index";
    }

    @GetMapping("/Prueba")
    public String pruebas(){
        return "productos/prueba";
    }

    /*only RestController
    @GetMapping("hola")
    public String hola(){
        return "Hola";
    } */

}


