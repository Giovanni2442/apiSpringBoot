package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.UsuarioDao;
import com.example.demo.models.usserModel;
import com.example.demo.repository.appMongo;

@RestController
@RequestMapping("usser")
public class appUssers implements UsuarioDao {

    @Autowired
    appMongo db; //Acceso bd

    //GET all
    @Override
    @GetMapping("/get")
    public ResponseEntity<?> getAllusu() {
        try { 
            List<usserModel> getAllUsers = db.findAll(); 
            return new ResponseEntity<List<usserModel>>(getAllUsers,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //POST 
    @Override
    @PostMapping("addUsu")
    public ResponseEntity<?> addUsu(@RequestBody usserModel usu) {
        try {
            usserModel addUsu = db.save(usu);             // Instancia de la clase usuarios
            return new ResponseEntity<usserModel>(addUsu,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //PUT 
    @Override
    public ResponseEntity<?> UpdateUsu() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'UpdateUsu'");
    }

    //DELETE
    @Override
    @DeleteMapping("dltUsu/{id}")
    public ResponseEntity<?> DeleteUsu(@PathVariable("id") String id) {
        try {
            db.deleteById(id);
            return new ResponseEntity<String>("Delete Ok!",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
