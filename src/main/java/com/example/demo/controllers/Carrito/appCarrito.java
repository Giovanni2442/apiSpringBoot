package com.example.demo.controllers.Carrito;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.Carrito.CarritoDao;
import com.example.demo.models.Carrito.ModelCarrito;
import com.example.demo.repository.Carrito.RepoCarrito;

@RestController
@RequestMapping("Carrito")
@CrossOrigin(origins = "*")
public class appCarrito implements CarritoDao{

    @Autowired
    RepoCarrito db;

    //Obtener Todos los productos del Carrito
    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        try { 
            List<ModelCarrito> getAllCarr = db.findAll(); 
            return new ResponseEntity<List<ModelCarrito>>(getAllCarr,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Obtener el producto del carrito por su id
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id){
        try {
            Optional<ModelCarrito> getCarriId = db.findById(id);
            return new ResponseEntity<Optional<ModelCarrito>>(getCarriId,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Agregar un producto al Carrito
    @Override
    @PostMapping("/")
    public ResponseEntity<?> addCarri(ModelCarrito carriMod) {
        try {
            ModelCarrito addCarri = db.save(carriMod);             // Instancia de la clase usuarios  
            return new ResponseEntity<ModelCarrito>(addCarri,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @DeleteMapping("/{id}")
    //Eliminar elemento del carrito
    public ResponseEntity<?> deltCarri(int id) {
        try {
            db.deleteById(id);             // Instancia de la clase usuarios
            return new ResponseEntity<String>("Delete Ok!",HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


