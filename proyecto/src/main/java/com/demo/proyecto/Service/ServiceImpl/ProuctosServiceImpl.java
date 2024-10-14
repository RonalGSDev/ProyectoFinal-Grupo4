package com.demo.proyecto.Service.ServiceImpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.demo.proyecto.Common.CommonSvcImpl;
import com.demo.proyecto.Models.ProductosModel;
import com.demo.proyecto.Repository.ProductosRepository;
import com.demo.proyecto.Service.ProductosService;

@Service
public class ProuctosServiceImpl extends CommonSvcImpl<ProductosModel, ProductosRepository> implements ProductosService{
    
    @Override
    public void deleteById(int idProducto) {
        this.repository.deleteById(idProducto);
    }

    @Override
    public Iterable<ProductosModel> findAll() {      
        return this.repository.findAll();
    }

    @Override
    public Optional<ProductosModel> findById(int idProducto) {     
        return this.repository.findById(idProducto);
    }

    @Override
    public ProductosModel save(ProductosModel entity) {
        
        return this.repository.save(entity);
    }

    @Override
    public Iterable<ProductosModel> saveAll(Iterable<ProductosModel> entities) {
        
        return this.repository.saveAll(entities);
    }

}
