package com.example.intecap1.service;

import java.util.Optional;

import com.example.intecap1.common.CommonSvc;
import com.example.intecap1.models.productosModel;

public interface productosService extends CommonSvc <productosModel>{
    
    public Iterable<productosModel> findAll();
    public Optional<productosModel> findById(int id);
    public productosModel save(productosModel entity);
    public void deleteById(int id);
    Iterable<productosModel> saveAll(Iterable<productosModel> entities);

}
