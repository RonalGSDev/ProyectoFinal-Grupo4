package com.demo.proyecto.Service;

import java.util.List;
import java.util.Optional;

import com.demo.proyecto.Models.DetallesPedidosModel;

public interface DetallesPedidosService {
    
    Iterable<DetallesPedidosModel> findAll();
    Optional<DetallesPedidosModel> findById(int idDetalle);
    DetallesPedidosModel save(DetallesPedidosModel entity);
    void deleteById(int idDetalle);
    Iterable<DetallesPedidosModel> saveAll(Iterable<DetallesPedidosModel> entities);

    List<Object[]> obtenerDetallesPedido(Integer idPedido);

}
