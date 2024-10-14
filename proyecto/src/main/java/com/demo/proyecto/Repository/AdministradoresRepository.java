package com.demo.proyecto.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.demo.proyecto.Models.AdministradoresModel;

public interface AdministradoresRepository extends CrudRepository<AdministradoresModel, Object> {
    boolean existsByCorreo(String correo);
    Optional<AdministradoresModel> findByCorreoAndPassword(String correo, String password);
}
