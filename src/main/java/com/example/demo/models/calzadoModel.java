package com.example.demo.models;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "calzado")
public class calzadoModel {
    
    //String key | String value
    @Id @Setter @Getter 
    private int id;
    @Getter @Setter
    private String name;
    @Getter @Setter
    private Map<String,String> images;
    @Getter @Setter
    private Map<String,String> sizes;
    @Getter @Setter
    private int cantidad;
    @Getter @Setter
    private String color;
    @Getter @Setter
    private float price;
    @Getter @Setter
    private String brand;
    @Getter @Setter
    private Characteristics characteristics;

    public calzadoModel(int id, String name, Map<String,String>images, Map<String,String> sizes, int cantidad ,String color, float price,
            String brand, Characteristics characteristics) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.sizes = sizes;
        this.cantidad = cantidad;
        this.color = color;
        this.price = price;
        this.brand = brand;
        this.characteristics = characteristics;
    }

    protected Characteristics characteristics(){
        return characteristics();
    }

    @Setter @Getter
    public static class Characteristics{
        private String category;
        private String sex;
        private String leyenda;
        private Map<String,String> details;
    }

}
