package com.demo.proyecto.Service.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.proyecto.Models.PedidosModel;
import com.demo.proyecto.Repository.PedidosRepository;
import com.demo.proyecto.Service.PedidosService;

@Service
public class PedidosServiceImpl implements PedidosService{

    @Autowired
    private PedidosRepository repository;

    @Override
    public void deleteById(int idPedido) {
        repository.deleteById(idPedido);
        
    }

    @Override
    public Iterable<PedidosModel> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<PedidosModel> findById(int idPedido) {
        return repository.findById(idPedido);
    }

    @Override
    public PedidosModel save(PedidosModel entity) {
        return repository.save(entity);
    }
    

    @Override
    public Iterable<PedidosModel> saveAll(Iterable<PedidosModel> entities) {
        return repository.saveAll(entities);
    }
    
    
}
