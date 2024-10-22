package com.demo.proyecto.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name= "detallepedido")
public class DetallesPedidosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private int id;

    @Column(name = "idpedido")
    private int idpedido;

    @Column(name = "idproducto")
    private int idproducto;

    @Column(name = "cantidad")
    private int cantidad;

}
