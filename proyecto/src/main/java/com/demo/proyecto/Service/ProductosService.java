package com.demo.proyecto.Service;

import java.util.Optional;

import com.demo.proyecto.Common.CommonSvc;
import com.demo.proyecto.Models.ProductosModel;

public interface ProductosService extends CommonSvc <ProductosModel>{
    
    public Iterable<ProductosModel> findAll();

    public Optional<ProductosModel> findById(int idProducto);

    public ProductosModel save(ProductosModel entity);

    public void deleteById(int idProducto);

    Iterable<ProductosModel> saveAll(Iterable<ProductosModel> entities);

}
