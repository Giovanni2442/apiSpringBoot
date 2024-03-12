package com.example.demo.models;

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
    private String model;
    @Getter @Setter
    private String image;
    @Getter @Setter
    private String size;
    @Getter @Setter
    private String color;
    @Getter @Setter
    private float price;
    @Getter @Setter
    private String brand;
    @Getter @Setter
    private String description;
    @Getter @Setter
    private Characteristics characteristics;

    public calzadoModel(int id, String name, String model, String image, String size, String color, float price,
            String brand, String description, Characteristics characteristics) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.image = image;
        this.size = size;
        this.color = color;
        this.price = price;
        this.brand = brand;
        this.description = description;
        this.characteristics = characteristics;
    }

    protected Characteristics characteristics(){
        return characteristics();
    }

    @Setter @Getter
    public static class Characteristics{
        private String category;
        private String material;
        private String gender;
        private String suela;
    }

}
