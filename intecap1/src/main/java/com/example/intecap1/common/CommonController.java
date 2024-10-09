package com.example.intecap1.common;

import org.springframework.beans.factory.annotation.Autowired;

public class CommonController <E, S extends CommonSvc<E>> {

    @Autowired
    protected S service;
    
}
