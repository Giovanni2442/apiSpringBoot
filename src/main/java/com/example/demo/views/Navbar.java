package com.example.demo.views;

import java.lang.ProcessBuilder.Redirect;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class Navbar {
    @GetMapping("/home")
    public String home(Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "Inicio");
        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if (admin == null) {
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "home";
    }

    @RequestMapping("/home/{id}")
    public RedirectView homeFirst(Model model, @PathVariable int id, HttpServletRequest request,
            HttpServletResponse response) {
        model.addAttribute("menuActivo", "Inicio");
        HttpSession sesion = request.getSession();
        if (id == 1) {
            sesion.setAttribute("admin", true);
        } else {
            sesion.setAttribute("admin", false);
        }
         return new RedirectView("/home");
    }

    @GetMapping("/acerca")
    public String acerca(Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "Acerca");
        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if (admin == null) {
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "acerca";
    }

    @GetMapping("/contacto")
    public String contacto(Model model, HttpServletRequest request) {
        model.addAttribute("menuActivo", "Contacto");
        HttpSession sesion = request.getSession();
        Object admin = sesion.getAttribute("admin");
        if (admin == null) {
            admin = "false";
        } else {
            admin = admin.toString();
        }
        model.addAttribute("admin", admin);
        return "contact";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }

    @GetMapping("/confirmar")
    public String direccion(Model model) {
        return "formulario";
    }
}
