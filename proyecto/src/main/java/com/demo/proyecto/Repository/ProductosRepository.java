package com.demo.proyecto.Repository;

import org.springframework.data.repository.CrudRepository;

import com.demo.proyecto.Models.ProductosModel;

public interface ProductosRepository extends CrudRepository <ProductosModel, Object>{
    
}
