package com.example.demo.controllers.Calzado;


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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.dao.Calzado.CalzadoDao;
import com.example.demo.models.Calzado.ModelClzd;
import com.example.demo.repository.Calzado.RepoClzd;


@RestController
@RequestMapping("Calzado")
@CrossOrigin(origins = "*")
public class appCalzado implements CalzadoDao{

    @Autowired
    RepoClzd db;

    //Pruebas
    @GetMapping
    public String index(){
        return "Conectado";
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        try { 
            List<ModelClzd> getAllClzd = db.findAll(); 
            return new ResponseEntity<List<ModelClzd>>(getAllClzd,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id){
        try {
            Optional<ModelClzd> getCldId = db.findById(id);
            return new ResponseEntity<Optional<ModelClzd>>(getCldId,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<?> addClzd(ModelClzd calzMod) {
        try {
            ModelClzd addCld = db.save(calzMod);             // Instancia de la clase usuarios  
            return new ResponseEntity<ModelClzd>(addCld,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<?> updateClzd(int id, ModelClzd calMod) {
        try {
            if(db.existsById(id)){
                calMod.setId(id);
                ModelClzd updateClzd = db.save(calMod);             // Instancia de la clase usuarios
                return new ResponseEntity<ModelClzd>(updateClzd,HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("Elemento No Encontrado",HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deltClzd(int id) {
        try {
            db.deleteById(id);             // Instancia de la clase usuarios
            return new ResponseEntity<String>("Delete Ok!",HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}