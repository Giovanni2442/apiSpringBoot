package com.example.demo.dao.Calzado;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.models.Calzado.ModelClzd;


public interface CalzadoDao {
    ResponseEntity<?> getAll();
    ResponseEntity<?> addClzd(@RequestBody ModelClzd calzMod);
    ResponseEntity<?> updateClzd(@PathVariable("id") int id,@RequestBody ModelClzd calMod);
    ResponseEntity<?> deltClzd(@PathVariable("id") int id);
}