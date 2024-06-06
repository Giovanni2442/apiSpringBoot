package com.example.demo.views;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("admin")
@Controller
public class Admin {
    @GetMapping("/pedidos")
    public String pedidos(Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "PedidosAdmin");
        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if(admin == null){
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "pedidosAdmin";
    }

    @GetMapping("/almacen")
    public String almacen(Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "Almacen");
        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if(admin == null){
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "almacen";
    }

    @GetMapping("/almacen/{id}")
    public String productoIndividual(@PathVariable("id") int id, Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "Almacen");
        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if(admin == null){
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "almacenProducto";
    }

    @GetMapping("/almacen/nuevo")
    public String productoNuevo(Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "Almacen");

        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if(admin == null){
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "almacenNuevo";
    }

    @GetMapping("/almacen/editar/{id}")
    public String productoEditar(@PathVariable("id") int id, Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "Almacen");
        model.addAttribute("idProducto", id);

        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if(admin == null){
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "almacenEditar";
    }
}
