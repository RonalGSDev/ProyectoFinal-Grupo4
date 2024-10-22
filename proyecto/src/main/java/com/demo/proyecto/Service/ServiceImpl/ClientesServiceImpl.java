package com.demo.proyecto.Service.ServiceImpl;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demo.proyecto.Models.ClientesModel;
import com.demo.proyecto.Repository.ClientesRepository;
import com.demo.proyecto.Service.ClientesService;

@Service
public class ClientesServiceImpl implements ClientesService {

    @Autowired
    private ClientesRepository repository;

    @Override
    public Iterable<ClientesModel> findAll() {      
        return repository.findAll();
    }

    @Override
    public Optional<ClientesModel> findById(int idCliente) {     
        return repository.findById(idCliente);
    }

    @Override
    public ClientesModel save(ClientesModel entity) {
        if (entity.getId() == 0) { // Si es un nuevo cliente (id == 0)
            if (repository.existsByCorreo(entity.getCorreo())) {
                throw new RuntimeException("El correo ya está registrado");
            }
        } else { // Si es una edición
            Optional<ClientesModel> existingClient = repository.findById(entity.getId());
            if (existingClient.isPresent()) {
                ClientesModel currentClient = existingClient.get();
                // Solo verifica si el correo ha cambiado
                if (!currentClient.getCorreo().equals(entity.getCorreo()) &&
                    repository.existsByCorreo(entity.getCorreo())) {
                    throw new RuntimeException("El correo ya está registrado");
                }
            }
        }
        return repository.save(entity);
    }

    @Override
    public void deleteById(int idCliente) {
        repository.deleteById(idCliente);
    }

    @Override
    public Iterable<ClientesModel> saveAll(Iterable<ClientesModel> entities) {
        return repository.saveAll(entities);
    }

    @Override
    public Optional<ClientesModel> findByCorreoAndPassword(String correo, String password) {
        return repository.findByCorreoAndPassword(correo, password);
    }
}
