package com.example.intecap1.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter //metodo get
@Setter //metodo set
@Entity //va a ser un modelo de una tabla de una base de datos --> objeto para recibir informacion o mapear una tabla
@Table(name = "clientes")

                                      //permite convertir los objetos de la clase a bytes  
public class clientesModel implements Serializable {

    //hay que importar --> import jakarta.persistence.Column; --> import jakarta.persistence.GenerationType;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name = "id")
    private int id;
   
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;
}
