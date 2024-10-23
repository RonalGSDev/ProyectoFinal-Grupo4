package com.demo.proyecto.Models;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import org.springframework.data.annotation.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "comentarios")
public class ComentariosModel {
    @Id
    private String id;
    private String idCliente; 
    private String nombres;        
    private String idProducto;    
    private double calificacion;    
    private String comentario;     
    private Date fecha;
}
