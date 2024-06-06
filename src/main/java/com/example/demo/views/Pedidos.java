package com.example.demo.views;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.client.RestTemplate;

// @RestController
@Controller
public class Pedidos {
    @GetMapping("/pedidos")
    public String pedidos(Model model) {
        // ver donde sacar el id de cliente
        // String uri = "http://192.168.0.11:8003/mostrar-todos/2/";
        // String uri = "http://localhost:8003/pedidos/mostrar-todos/2/";
        // RestTemplate restTemplate = new RestTemplate();
        // String resultado = restTemplate.getForObject(uri, String.class);
        
        return "pedidos";
    }
}
