package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "ussers")        //Definir que representa una collección en la bd de mongodb 
public class usserModel {

    @Id
    @Getter @Setter     //Define los Setters y Getters
    private int id;
    @Getter @Setter
    private String name;
    @Getter @Setter  
    private String lstnF; 
    @Getter @Setter 
    private String lstnM;
    @Getter @Setter
    private int ege;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String pass;
    @Getter @Setter
    private String tel;

    
    public usserModel(int id, String name, String lstnF, String lstnM, int ege, String email, String pass, String tel) {
        this.id = id;
        this.name = name;
        this.lstnF = lstnF;
        this.lstnM = lstnM;
        this.ege = ege;
        this.email = email;
        this.pass = pass;
        this.tel = tel;
    }

    
}