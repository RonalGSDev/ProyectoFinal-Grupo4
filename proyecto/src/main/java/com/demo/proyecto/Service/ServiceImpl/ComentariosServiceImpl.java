package com.demo.proyecto.Service.ServiceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.proyecto.Models.ComentariosModel;
import com.demo.proyecto.Repository.ComentariosRepository;
import com.demo.proyecto.Service.ComentariosService;

@Service
public class ComentariosServiceImpl implements ComentariosService {

    @Autowired
    private ComentariosRepository comentariosRepository;

    @Override
    public List<ComentariosModel> getAllComentarios() {
        return comentariosRepository.findAll();
    }

    @Override
    public ComentariosModel saveComentario(ComentariosModel comentario) {
        return comentariosRepository.save(comentario);
    }

    @Override
    public List<ComentariosModel> getComentariosByIdProducto(String idProducto) {
        return comentariosRepository.findByIdProducto(idProducto);
    }

    @Override
    public List<ComentariosModel> getMejoresCalificados() {
        // Obtiene los comentarios únicos por idProducto con la calificación más alta y limita a 4
        return comentariosRepository.findAll().stream()
            .collect(Collectors.groupingBy(ComentariosModel::getIdProducto)) // Agrupa por idProducto
            .values().stream()
            .map(comentarios -> comentarios.stream().max((c1, c2) -> Double.compare(c1.getCalificacion(), c2.getCalificacion())).orElse(null)) // Obtiene el mejor comentario por grupo
            .filter(comentario -> comentario != null) // Filtra comentarios nulos
            .sorted((c1, c2) -> Double.compare(c2.getCalificacion(), c1.getCalificacion())) // Ordena por calificación descendente
            .limit(4) // Limita a los primeros 5
            .collect(Collectors.toList()); // Recoge en una lista
    }
}
