package com.example.demo.models.pedido;

import com.example.demo.models.producto.Producto;

public class Pedido {
    private int id;
    private int idCliente;
    private int idDireccion;
    private String metodoPago;
    private String ultimosDigitos;
    private String estadoEnvio;
    private String fechaCreacion;
    private String fechaEntrega;
    private String monto;
    private Producto[] productos;
}
