package com.example.demo.controllers;

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
        return "Index";
    }

    @GetMapping("pr")
    public String pr(){
        return "jijija";
    }

    /*only RestController
    @GetMapping("hola")
    public String hola(){
        return "Hola";
    } */

}


