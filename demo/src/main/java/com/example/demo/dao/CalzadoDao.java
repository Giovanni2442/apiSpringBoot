package com.example.demo.dao;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import com.example.demo.models.calzadoModel;

public interface CalzadoDao {
    ResponseEntity<?> getAll();
    ResponseEntity<?> addClzd(@RequestBody calzadoModel calMod);
    ResponseEntity<?> updateClzd(@RequestBody calzadoModel calMod);
    ResponseEntity<?> deltClzd(@PathVariable("id") int id);
}
