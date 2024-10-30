package com.demo.proyecto.Service.ServiceImpl;

import java.util.*;

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
        // Obtener todos los comentarios
        List<ComentariosModel> comentarios = comentariosRepository.findAll();

        // Crear un mapa para almacenar la suma de calificaciones y el conteo de
        // comentarios por idProducto
        Map<String, Double> sumaCalificaciones = new HashMap<>();
        Map<String, Integer> conteoComentarios = new HashMap<>();

        // Iterar sobre cada comentario
        for (ComentariosModel comentario : comentarios) {
            String idProducto = comentario.getIdProducto();
            double calificacion = comentario.getCalificacion();

            // Sumar las calificaciones
            sumaCalificaciones.put(idProducto, sumaCalificaciones.getOrDefault(idProducto, 0.0) + calificacion);

            // Contar el número de comentarios
            conteoComentarios.put(idProducto, conteoComentarios.getOrDefault(idProducto, 0) + 1);
        }

        // Crear una lista para almacenar los promedios y el conteo de comentarios
        List<Map.Entry<String, Double>> promediosConConteo = new ArrayList<>();
        for (String idProducto : sumaCalificaciones.keySet()) {
            int conteo = conteoComentarios.get(idProducto);
            if (conteo > 0) { // Solo considerar productos con comentarios
                double promedio = sumaCalificaciones.get(idProducto) / conteo;
                promediosConConteo.add(new AbstractMap.SimpleEntry<>(idProducto, promedio));
            }
        }

        // Ordenar por cantidad de comentarios en primer lugar, y luego por promedio
        promediosConConteo.sort((a, b) -> {
            int conteoA = conteoComentarios.get(a.getKey());
            int conteoB = conteoComentarios.get(b.getKey());
            if (conteoB != conteoA) {
                return Integer.compare(conteoB, conteoA); // Ordenar por cantidad de comentarios
            }
            return Double.compare(b.getValue(), a.getValue()); // Ordenar por promedio
        });

        // Obtener los primeros 4 productos
        List<ComentariosModel> mejoresCalificados = new ArrayList<>();
        for (int i = 0; i < Math.min(4, promediosConConteo.size()); i++) {
            String idProducto = promediosConConteo.get(i).getKey();
            // Obtener un comentario asociado para el producto
            ComentariosModel comentarioEjemplo = comentarios.stream()
                    .filter(comentario -> comentario.getIdProducto().equals(idProducto))
                    .findFirst()
                    .orElse(null);
            if (comentarioEjemplo != null) {
                mejoresCalificados.add(comentarioEjemplo);
            }
        }

        return mejoresCalificados;
    }

}
