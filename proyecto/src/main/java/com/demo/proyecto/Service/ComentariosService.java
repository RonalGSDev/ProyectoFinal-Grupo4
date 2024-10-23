package com.demo.proyecto.Service;

import java.util.List;
import com.demo.proyecto.Models.ComentariosModel;

public interface ComentariosService {
    List<ComentariosModel> getAllComentarios();
    ComentariosModel saveComentario(ComentariosModel comentario);
    List<ComentariosModel> getComentariosByIdProducto(String idProducto);
    List<ComentariosModel> getMejoresCalificados(); // Nuevo método
}
