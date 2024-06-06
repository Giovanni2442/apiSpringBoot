package com.example.demo.models.Calzado;

import java.util.Map;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity                     //Especifica que esta clase sera una entidad lo que manejara la tabla de "Clazado"
@Getter @Setter             //Genera Setters y Getters en todos los elementos de la tabla

//@ElementCollection : Especificas que el atributo va a ser una colleción de datos
//@Embedded          : Es una tabla la cual contiene sus propios atributos u o listas en la cual va a ser incrustada en una tabla "padre" o un join "union"
//@Embeddable        : Especificas la tabla que va a ser incrustada en la tabla padre en este caso la de calzado

public class ModelClzd {      
    //String key | String value
    @Id 
    private int id;
    private String nombre;
    private int cantidad;
    private float price;
    @ElementCollection @Getter @Setter             
    private Map<String,String> images;
    @ElementCollection @Getter @Setter
    private Map<String,String> sizes;
    @ElementCollection @Getter @Setter
    private Map<String,String> color;
    @Embedded
    private Characteristics characteristics;

    @Embeddable @Setter @Getter
    public static class Characteristics{
        private String marca;
        private String material;
        private String promo;
        private String category;
        private String sex;
        private String leyenda;
        @ElementCollection
        private Map<String,String> details;
    }
}