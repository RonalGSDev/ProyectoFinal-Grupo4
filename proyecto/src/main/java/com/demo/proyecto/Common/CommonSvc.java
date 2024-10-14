package com.demo.proyecto.Common;

import java.util.Optional;

public interface CommonSvc <E> {

    public Iterable<E> findAll();
    public Optional<E> findById(int id);
    public E save(E entity);
    public void deleteById(int id);
    Iterable<E> saveAll(Iterable<E> entities);
    
} 
