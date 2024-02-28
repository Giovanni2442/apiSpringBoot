package com.example.demo.dao;
import java.util.List;
import org.springframework.http.ResponseEntity;
import com.example.demo.models.*;


public interface UsuarioDao {

    //Get All Ussers
    ResponseEntity<?> getAllusu();
    //POST usser
    ResponseEntity<?> addUsu();
    //PUT usser
    ResponseEntity<?> UpdateUsu();
    //DELETE usser
    ResponseEntity<?> DeleteUsu();

}
