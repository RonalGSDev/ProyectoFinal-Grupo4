package com.demo.proyecto.Service;

import java.util.Optional;
import com.demo.proyecto.Models.ClientesModel;

public interface ClientesService {
    Iterable<ClientesModel> findAll();
    Optional<ClientesModel> findById(int idCliente);
    ClientesModel save(ClientesModel entity);
    void deleteById(int idCliente);
    Iterable<ClientesModel> saveAll(Iterable<ClientesModel> entities);
    Optional<ClientesModel> findByCorreoAndPassword(String correo, String password);
}
