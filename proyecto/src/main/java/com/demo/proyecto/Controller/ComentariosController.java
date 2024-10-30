package com.demo.proyecto.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.proyecto.Models.ComentariosModel;
import com.demo.proyecto.Service.ComentariosService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/comentarios")
public class ComentariosController {
    @Autowired
    private ComentariosService comentariosService;

    @GetMapping("/listar")
    public ResponseEntity<List<ComentariosModel>> getAllComentarios() {
        List<ComentariosModel> comentarios = comentariosService.getAllComentarios();
        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }

    @PostMapping("/guardar")
    public ResponseEntity<ComentariosModel> saveComentario(@RequestBody ComentariosModel comentario) {
        ComentariosModel savedComentario = comentariosService.saveComentario(comentario);
        return new ResponseEntity<>(savedComentario, HttpStatus.CREATED);
    }

    @GetMapping("/listar/{idProducto}")
    public ResponseEntity<List<ComentariosModel>> getComentariosByIdProducto(@PathVariable String idProducto) {
        List<ComentariosModel> comentarios = comentariosService.getComentariosByIdProducto(idProducto);
        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }

    @GetMapping("/recomendados")
    public ResponseEntity<List<ComentariosModel>> getMejoresCalificados() {
        List<ComentariosModel> mejoresCalificados = comentariosService.getMejoresCalificados();
        return new ResponseEntity<>(mejoresCalificados, HttpStatus.OK);
    }
}
