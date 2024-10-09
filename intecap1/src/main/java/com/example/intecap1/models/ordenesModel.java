package com.example.intecap1.models;

import java.io.Serializable;
import java.sql.Date;

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
@Table(name = "ordenes")
public class ordenesModel implements Serializable{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private int id;

    @Column(name = "cliente_id")
    private int cliente_id;

    @Column(name = "producto_id")
    private int producto_id;

    @Column(name = "cantidad")
    private int cantidad;

    @Column(name = "fecha")
    private Date fecha;
}
