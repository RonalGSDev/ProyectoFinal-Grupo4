package com.demo.proyecto.Service.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.proyecto.Models.DetallesPedidosModel;
import com.demo.proyecto.Repository.DetallesPedidoRepository;
import com.demo.proyecto.Service.DetallesPedidosService;

@Service
public class DetallesPedidosServiceImpl implements DetallesPedidosService{

    @Autowired
    private DetallesPedidoRepository repository;

    @Override
    public void deleteById(int idDetalle) {
        repository.deleteById(idDetalle);
        
    }

    @Override
    public Iterable<DetallesPedidosModel> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<DetallesPedidosModel> findById(int idDetalle) {
        return repository.findById(idDetalle);
    }

    @Override
    public DetallesPedidosModel save(DetallesPedidosModel entity) {
        return repository.save(entity);
    }

    @Override
    public Iterable<DetallesPedidosModel> saveAll(Iterable<DetallesPedidosModel> entities) {
        return repository.saveAll(entities);
    }
    
}
