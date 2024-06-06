package com.example.demo.dao.Usuarios;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.models.Usuarios.usserModel;


public interface UsuarioDao {

    //Get All Ussers
    ResponseEntity<?> getAllusu();
    //Get One
    ResponseEntity<?> getUsser(@PathVariable("id") String id);
    //POST usser
    ResponseEntity<?> addUsu(@RequestBody usserModel usu);
    //PUT usser
    ResponseEntity<?> UpdateUsu(@PathVariable("id") String id, @RequestBody usserModel usu);
    //DELETE usser
    ResponseEntity<?> DeleteUsu(@PathVariable("id") String id);

}
