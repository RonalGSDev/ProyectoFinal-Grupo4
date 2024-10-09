package com.example.intecap1.service.serviceimpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.intecap1.common.CommonSvcImpl;
import com.example.intecap1.models.productosModel;
import com.example.intecap1.repository.productoRepository;
import com.example.intecap1.service.productosService;

@Service
public class productosServiceImpl extends CommonSvcImpl<productosModel, productoRepository> implements productosService{

    @Override
    public void deleteById(int id) {
        this.repository.deleteById(id);
    }

    @Override
    public Iterable<productosModel> findAll() {
        return this.repository.findAll();
    }

    @Override
    public Optional<productosModel> findById(int id) {
        return this.repository.findById(id);
    }

    @Override
    public productosModel save(productosModel entity) {
        return this.repository.save(entity);
    }

    @Override
    public Iterable<productosModel> saveAll(Iterable<productosModel> entities) {
        return this.repository.saveAll(entities);
    }
    
}
