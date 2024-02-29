package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.dao.CalzadoDao;
import com.example.demo.models.calzadoModel;
import com.example.demo.repository.appMongo;
import com.example.demo.repository.appMongoClzd;


@RequestMapping("calzado")
public class appCalzado implements CalzadoDao{

    @Autowired
    appMongoClzd db;

    @Override
    @GetMapping("get")
    public ResponseEntity<?> getAll() {
        try { 
           // List<calzadoModel> getClzd = db.findAll(); 
            return new ResponseEntity<List<calzadoModel>>(HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @PostMapping("addCld")
    public ResponseEntity<?> addClzd(@RequestBody calzadoModel calMod) {
        try {
            calzadoModel addCld = db.save(calMod);             // Instancia de la clase usuarios
            return new ResponseEntity<calzadoModel>(addCld,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> updateClzd(calzadoModel calMod) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateClzd'");
    }

    @Override
    public ResponseEntity<?> deltClzd(String name) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deltClzd'");
    }
    
}
