package com.example.demo.models.Carrito;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity                     //Especifica que esta clase sera una entidad lo que manejara la tabla de "Clazado"
@Getter @Setter             //Genera Setters y Getters en todos los elementos de la tabla
public class ModelCarrito {
    @Id
    private int id;
    private String nameProd;
    private int cantidad;
    private float precioProd;
    private float talla;
    private String color;
    private float total;
    private String imgProd;
}
