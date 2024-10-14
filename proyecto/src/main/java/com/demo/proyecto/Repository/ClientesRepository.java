package com.demo.proyecto.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.demo.proyecto.Models.ClientesModel;

public interface ClientesRepository extends CrudRepository<ClientesModel, Object> {
    boolean existsByCorreo(String correo);
    Optional<ClientesModel> findByCorreoAndPassword(String correo, String password);
}
