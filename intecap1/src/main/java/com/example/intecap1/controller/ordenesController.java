package com.example.intecap1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.intecap1.models.ordenesModel;
import com.example.intecap1.service.ordenesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/ordenes")
@CrossOrigin(origins = "http://localhost:3000")

public class ordenesController {
    @Autowired
    private ordenesService ordenesService;

    @GetMapping("/listar")
    public Iterable<ordenesModel> getOrdenes() {
        return this.ordenesService.findAll();    
    }
    
    @PostMapping("/guardar")
    public ResponseEntity<String> saveOrdenes(@RequestBody ordenesModel entity) {
        try{
            this.ordenesService.save(entity);
            return ResponseEntity.ok("Orden guardada correctamente");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

     
    @DeleteMapping("/eliminar/{idOrden}")
    public ResponseEntity<String> deleteOrden(@PathVariable int idOrden){
        try{
            this.ordenesService.deleteById(idOrden);
            return ResponseEntity.ok("Orden eliminada correctamente");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PutMapping("/editar")
    public ResponseEntity<String> updateCliente(@RequestBody ordenesModel entities) {
        try {
            this.ordenesService.save(entities);
            return ResponseEntity.ok("Orden editada correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    
    }
    
}
