package com.example.intecap1.service.serviceimpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.intecap1.common.CommonSvcImpl;
import com.example.intecap1.models.ordenesModel;
import com.example.intecap1.repository.ordenesRepository;
import com.example.intecap1.service.ordenesService;

@Service
public class ordenesServiceImpl extends CommonSvcImpl<ordenesModel, ordenesRepository> implements ordenesService{

    @Override
    public void deleteById(int id) {
        this.repository.deleteById(id);
    }

    @Override
    public Iterable<ordenesModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public Optional<ordenesModel> findById(int id) {
        return this.repository.findById(id);
    }

    @Override
    public ordenesModel save(ordenesModel entity) {
        return this.repository.save(entity);
    }

    @Override
    public Iterable<ordenesModel> saveAll(Iterable<ordenesModel> entities) {
        return this.repository.saveAll(entities);
    }
    
}
