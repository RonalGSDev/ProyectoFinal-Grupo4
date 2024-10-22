package com.demo.proyecto.Service.ServiceImpl;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demo.proyecto.Models.AdministradoresModel;
import com.demo.proyecto.Repository.AdministradoresRepository;
import com.demo.proyecto.Service.AdministradoresService;

@Service
public class AdministradoresServiceImpl implements AdministradoresService {

    @Autowired
    private AdministradoresRepository repository;

    @Override
    public Iterable<AdministradoresModel> findAll() {      
        return repository.findAll();
    }

    @Override
    public Optional<AdministradoresModel> findById(int idAdministrador) {     
        return repository.findById(idAdministrador);
    }

    @Override
    public AdministradoresModel save(AdministradoresModel entity) {
        // Se eliminó la verificación de correo
        return repository.save(entity);
    }

    @Override
    public void deleteById(int idAdministrador) {
        repository.deleteById(idAdministrador);
    }

    @Override
    public Iterable<AdministradoresModel> saveAll(Iterable<AdministradoresModel> entities) {
        return repository.saveAll(entities);
    }

    @Override
    public Optional<AdministradoresModel> findByCorreoAndPassword(String correo, String password) {
        return repository.findByCorreoAndPassword(correo, password);
    }
}
