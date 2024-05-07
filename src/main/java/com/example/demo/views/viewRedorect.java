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

    @GetMapping("pr")
    public String pr(){
        return "jijija";
    }

    @GetMapping("Index")
    public String index(){
        return "Index";
    }

    @GetMapping("Pruebas")
    public String pruebas(){
        return "Pruebas";
    }

    /*only RestController
    @GetMapping("hola")
    public String hola(){
        return "Hola";
    } */

}


