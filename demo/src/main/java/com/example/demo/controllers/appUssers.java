package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    //@Autowired
    //usserModel usu;
    
    //GET all
    @Override
    @GetMapping
    public ResponseEntity<?> getAllusu() {
        try { 
            List<usserModel> getAllUsers = db.findAll(); 
            return new ResponseEntity<List<usserModel>>(getAllUsers,HttpStatus.CREATED);   
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Get by Id
    @Override
    @GetMapping("/{id}")
    public ResponseEntity<?> getUsser(@PathVariable("id") String id) {
        try {
            List<usserModel> getAllUsers = db.findAll();
            return new ResponseEntity<List<usserModel>>(getAllUsers,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //POST 
    @Override
    @PostMapping
    public ResponseEntity<?> addUsu(@RequestBody usserModel usu) {
        try {
            usserModel addUsu = db.insert(usu);             // Instancia de la clase usuarios
            return new ResponseEntity<usserModel>(addUsu,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //PUT 
    @Override
    @PutMapping("/{id}")
    public ResponseEntity<?> UpdateUsu(@PathVariable("id") String id, @RequestBody usserModel usuPut) {
        try {
            if(!db.existsById(id)){
                return new ResponseEntity<String>("No se encontro el Id!",HttpStatus.NOT_FOUND);
            } else{
                usserModel modUsu = db.insert(usuPut);             // Instancia de la clase usuarios
                return new ResponseEntity<usserModel>(modUsu,HttpStatus.CREATED);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //DELETE
    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> DeleteUsu(@PathVariable("id") String id) {
        try {
            db.deleteById(id);
            return new ResponseEntity<String>("Delete Ok!",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
