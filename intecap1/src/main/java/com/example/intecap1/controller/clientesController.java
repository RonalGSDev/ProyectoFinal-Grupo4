package com.example.intecap1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.intecap1.models.clientesModel;
import com.example.intecap1.service.clientesService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
// http://localhost:8080/clientes
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:3000")

public class clientesController {

    @Autowired
    private clientesService clientesService;

    // http://localhost:8080/clientes/listar
    @GetMapping("/listar")
    public Iterable<clientesModel> getClientes() {
        return this.clientesService.findAll();
    }
    
    @PostMapping("/guardar")
    public ResponseEntity<String> saveClientes(@RequestBody clientesModel entity) {
        try{
            this.clientesService.save(entity);
            return ResponseEntity.ok("Cliente guardado correctamente");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
        
    }
    
    @DeleteMapping("/eliminar/{idCliente}")
    public ResponseEntity<String> deleteClientes(@PathVariable int idCliente){
        try{
            this.clientesService.deleteById(idCliente);
            return ResponseEntity.ok("Cliente eliminado correctamente");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }
    
    @PutMapping("/editar")
    public ResponseEntity<String> updateCliente(@RequestBody clientesModel entities) {
        try {
            this.clientesService.save(entities);
            return ResponseEntity.ok("Cliente editado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    
    }
    

}
