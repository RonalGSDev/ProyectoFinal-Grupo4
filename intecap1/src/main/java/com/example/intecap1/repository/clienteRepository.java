package com.example.intecap1.repository;

//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.intecap1.models.clientesModel;

/*se cambia el class por un interface*/

//va a heredar CrudRepository y se agrega <modelo de la capeta Models y retorna un objeto>
public interface clienteRepository extends CrudRepository <clientesModel, Object> {

    //como esta herendando funcionalidades ya no es necesario  
    //utilizarlo, salvo que se necesita un consulta con inneer join

    //ejemplo
    /* 
    @Query(value = "SELECT * FROM clientes WHERE nombre = ?1nombre", nativeQuery = True)
    clientesModel findByName(String nombre);*/
} 