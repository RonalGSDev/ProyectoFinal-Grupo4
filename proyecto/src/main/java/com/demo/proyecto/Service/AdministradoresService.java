package com.demo.proyecto.Service;

import java.util.Optional;
import com.demo.proyecto.Models.AdministradoresModel;

public interface AdministradoresService {
    Iterable<AdministradoresModel> findAll();
    Optional<AdministradoresModel> findById(int idAdmin);
    AdministradoresModel save(AdministradoresModel entity);
    void deleteById(int idAdmin);
    Iterable<AdministradoresModel> saveAll(Iterable<AdministradoresModel> entities);
    Optional<AdministradoresModel> findByCorreoAndPassword(String correo, String password);
}
