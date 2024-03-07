package com.example.demo.models;
import lombok.Getter;
import lombok.Setter;

public class Apimsg {
    @Getter @Setter
    private String message;

    public Apimsg(String message) {
        this.message = message;
    }
}
