package com.demo.proyecto.Repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.demo.proyecto.Models.ComentariosModel;

public interface ComentariosRepository extends MongoRepository<ComentariosModel, String> {
    List<ComentariosModel> findByIdProducto(String idProducto);
}
