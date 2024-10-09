package com.example.intecap1.service;

import java.util.Optional;

import com.example.intecap1.common.CommonSvc;
import com.example.intecap1.models.clientesModel;

//es interfaz para que solo se le tenga que hacer el llamado
public interface clientesService extends CommonSvc<clientesModel> {
                   
                    //se agrega un objeto o el Modelo
    public Iterable<clientesModel> findAll();

    public Optional<clientesModel> findById(int id);

    public clientesModel save(clientesModel entity);

    public void deleteById(int id);

    Iterable<clientesModel> saveAll(Iterable<clientesModel> entities);

}


