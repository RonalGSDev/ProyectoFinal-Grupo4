package com.demo.proyecto.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.proyecto.Models.ProductosModel;
import com.demo.proyecto.Service.ProductosService;


@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductosController {
    
    @Autowired
    private ProductosService ProductosService; 

    @GetMapping("/listar")
    public Iterable <ProductosModel> getProductos() {
        return this.ProductosService.findAll();
    }

    @PostMapping("/guardar")
    public ResponseEntity<String> saveProductos(@RequestBody ProductosModel entity) {
        try{
            this.ProductosService.save(entity);
            return ResponseEntity.ok("Producto guardado correctamente");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @DeleteMapping("/eliminar/{idProducto}")
    public ResponseEntity<String> deleteClientes(@PathVariable int idProducto){
        try{
            this.ProductosService.deleteById(idProducto);
            return ResponseEntity.ok("Producto eliminado correctamente");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PutMapping("/editar")
    public ResponseEntity<String> updateCliente(@RequestBody ProductosModel entities) {
        try {
            this.ProductosService.save(entities);
            return ResponseEntity.ok("Producto editado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    
    }

    @GetMapping("/buscar/{idProducto}")
    public ResponseEntity<ProductosModel> getProductoPorId(@PathVariable int idProducto) {
        Optional<ProductosModel> producto = ProductosService.findById(idProducto);
        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
}
