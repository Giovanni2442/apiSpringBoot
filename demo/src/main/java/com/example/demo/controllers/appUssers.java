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

    //Get All
    //ResponseEntity<?> : metodo de tipo Http
    @GetMapping("allUsser")
    public ResponseEntity<?> getAllUsrs(){        //@RequestBody : Toma como parametro el request o info desde el lado del cliente, para despues almacenar en la clase ussers 
        try {
           List<usserModel> getAllUsers = db.findAll(); 
            return new ResponseEntity<List<usserModel>>(getAllUsers,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //POST
    @PostMapping
    public ResponseEntity<?> addUsser(@RequestBody usserModel usu){     //Resive el request del lado cliente
        try {
            usserModel addUsu = db.save(usu);             // Instancia de la clase usuarios
            return new ResponseEntity<usserModel>(addUsu,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsser(@PathVariable("id") String id){
        try {
            db.deleteById(id);
            return new ResponseEntity<String>("Delete Ok!",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getCause().toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("pr")
    public String pruebas(){
        return "Hola a la verga";
    }

    @Override
    public ResponseEntity<?> getAllusu() {
        try {
            List<usserModel> getAll = db.findAll();
            
        } catch (Exception e) {
            // TODO: handle exception
        }
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllusu'");
    }

    @Override
    public ResponseEntity<?> addUsu() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addUsu'");
    }

    @Override
    public ResponseEntity<?> UpdateUsu() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'UpdateUsu'");
    }

    @Override
    public ResponseEntity<?> DeleteUsu() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'DeleteUsu'");
    }
}
