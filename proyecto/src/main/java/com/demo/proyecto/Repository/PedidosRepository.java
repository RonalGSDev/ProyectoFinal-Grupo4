package com.demo.proyecto.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.demo.proyecto.Models.PedidosModel;

import java.sql.Date;
import java.util.List;

@Repository
public interface PedidosRepository extends CrudRepository<PedidosModel, Integer> {
    
    @Query(value = "CALL obtenerpedidos(:clienteid, :productoid, :fechainicio, :fechafin)", nativeQuery = true)
    List<Object[]> obtenerPedidos(Integer clienteid, Integer productoid, Date fechainicio, Date fechafin);
}
