package com.demo.proyecto.Service;

import java.util.Optional;

import com.demo.proyecto.Models.PedidosModel;

public interface PedidosService {

    Iterable<PedidosModel> findAll();
    Optional<PedidosModel> findById(int idCliente);
    PedidosModel save(PedidosModel entity);
    void deleteById(int idCliente);
    Iterable<PedidosModel> saveAll(Iterable<PedidosModel> entities);
    
}