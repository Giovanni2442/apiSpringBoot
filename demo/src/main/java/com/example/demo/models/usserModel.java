package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "ussers")        //Definir que representa una collección en la bd de mongodb 
public class usserModel {

    //Define los Setters y Getters
    @Id @Getter
    private String id;
    @Getter @Setter
    private String name;
    @Getter @Setter  
    private String lstnF; 
    @Getter @Setter 
    private String lstnM;
    @Getter @Setter
    private int age;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String pass;
    @Getter @Setter
    private String tel;

    
    public usserModel(String name, String lstnF, String lstnM, int age, String email, String pass, String tel) {
        this.name = name;
        this.lstnF = lstnF;
        this.lstnM = lstnM;
        this.age = age;
        this.email = email;
        this.pass = pass;
        this.tel = tel;
    }
}