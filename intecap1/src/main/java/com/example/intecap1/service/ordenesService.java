package com.example.intecap1.service;

import java.util.Optional;

import com.example.intecap1.common.CommonSvc;
import com.example.intecap1.models.ordenesModel;

public interface ordenesService extends CommonSvc<ordenesModel>{

    public Iterable<ordenesModel> findAll();

    public Optional<ordenesModel> findById(int id);

    public ordenesModel save(ordenesModel entity);

    public void deleteById(int id);

    Iterable<ordenesModel> saveAll(Iterable <ordenesModel> entities);
} 