package com.demo.proyecto.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.demo.proyecto.Models.DetallesPedidosModel;

public interface DetallesPedidoRepository extends CrudRepository<DetallesPedidosModel, Integer>{

    @Query(value = "CALL listardetallespedido(:idpedido)", nativeQuery = true)
    List<Object[]> obtenerDetallesPedido(Integer idpedido);
}