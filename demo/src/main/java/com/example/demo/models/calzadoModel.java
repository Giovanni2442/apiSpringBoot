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
    private String name;
    @Getter @Setter
    private String model;
    @Getter @Setter
    private String image;
    @Getter @Setter
    private String size;
    @Getter @Setter
    private int color;
    @Getter @Setter
    private float price;
    @Getter @Setter
    private String brand;
    @Getter @Setter
    private String description;
    @Getter @Setter
    private String category;
    @Getter @Setter
    private int material;
    @Getter @Setter
    private String suela;
    @Getter @Setter
    private String sex;

    public calzadoModel(int id, String name, String model, String image, String size, int color, float price,
            String brand, String description, String category, int material, String suela, String sex) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.image = image;
        this.size = size;
        this.color = color;
        this.price = price;
        this.brand = brand;
        this.description = description;
        this.category = category;
        this.material = material;
        this.suela = suela;
        this.sex = sex;
    } 
}
