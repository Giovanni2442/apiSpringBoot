package com.example.demo.dao.Carrito;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.models.Carrito.ModelCarrito;

public interface CarritoDao {
    ResponseEntity<?> getAll();                                            
    ResponseEntity<?> addCarri(@RequestBody ModelCarrito carriMod);
    ResponseEntity<?> deltCarri(@PathVariable("id") int id);
}