package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "calzado")
public class calzadoModel {
    @Id
    @Getter @Setter
    private int id;
    @Getter @Setter
    private String nombre;
    @Getter @Setter
    private String modelo;
    @Getter @Setter
    private String material;
    @Getter @Setter
    private String talla;

    
    public calzadoModel(String nombre, String modelo, String material, String talla) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.material = material;
        this.talla = talla;
    }
    
}
