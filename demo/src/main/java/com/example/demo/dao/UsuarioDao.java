package com.example.demo.dao;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.models.*;


public interface UsuarioDao {

    //Get All Ussers
    ResponseEntity<?> getAllusu();
    //POST usser
    ResponseEntity<?> addUsu(@RequestBody usserModel usu);
    //PUT usser
    ResponseEntity<?> UpdateUsu();
    //DELETE usser
    ResponseEntity<?> DeleteUsu(@PathVariable("id") String id);

}
