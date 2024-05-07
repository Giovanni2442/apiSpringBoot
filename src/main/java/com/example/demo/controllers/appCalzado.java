package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.CalzadoDao;
import com.example.demo.models.calzadoModel;
import com.example.demo.repository.appMongoClzd;

@RestController
@RequestMapping("calzado")
public class appCalzado implements CalzadoDao{

    @Autowired
    appMongoClzd db;

    @Override
    @GetMapping
    public ResponseEntity<?> getAll() {
        try { 
            List<calzadoModel> getAllClzd = db.findAll(); 
            return new ResponseEntity<List<calzadoModel>>(getAllClzd,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") String id){
        try {
            Optional<calzadoModel> getCldId = db.findById(id);
            return new ResponseEntity<Optional<calzadoModel>>(getCldId,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    @PostMapping
    public ResponseEntity<?> addClzd(@RequestBody calzadoModel calMod) {
        try {
            calzadoModel addCld = db.insert(calMod);             // Instancia de la clase usuarios  
            return new ResponseEntity<calzadoModel>(addCld,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PutMapping
    public ResponseEntity<?> updateClzd(calzadoModel calMod) {
        try {
            calzadoModel addCld = db.save(calMod);             // Instancia de la clase usuarios
            return new ResponseEntity<calzadoModel>(addCld,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deltClzd(int id) {
        try {
            db.deleteById(String.valueOf(id));;             // Instancia de la clase usuarios
            return new ResponseEntity<String>("Delete Ok!",HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
