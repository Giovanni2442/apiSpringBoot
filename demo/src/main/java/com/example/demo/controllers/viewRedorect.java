package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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

    @GetMapping("hola")
    public String hola(){
        return "Hola";
    }
}


