package com.demo.proyecto.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import com.demo.proyecto.Models.PedidosModel;

public interface PedidosService {
    Iterable<PedidosModel> findAll();
    Optional<PedidosModel> findById(int idCliente);
    PedidosModel save(PedidosModel entity);
    void deleteById(int idCliente);
    Iterable<PedidosModel> saveAll(Iterable<PedidosModel> entities);
    
    // Actualizado para usar el repositorio
    List<Object[]> obtenerPedidos(Integer clienteid, Integer productoid, Date fechainicio, Date fechafin);
}
