package com.demo.proyecto.Controller;

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

import com.demo.proyecto.Models.DetallesPedidosModel;
import com.demo.proyecto.Service.DetallesPedidosService;


@RestController
@RequestMapping("/detallepedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class DetallesPedidosController {
    
    @Autowired
    private DetallesPedidosService detallePedidosService;

    @GetMapping("/listar")
    public Iterable<DetallesPedidosModel> getDetalles() {
        return this.detallePedidosService.findAll();
    }

    @PostMapping("/guardar")
    public ResponseEntity<String> saveDetalles(@RequestBody DetallesPedidosModel entity) {
        try{
            this.detallePedidosService.save(entity);
            return ResponseEntity.ok("Detalle del Pedido guardado correctamente");
        }catch(Exception e){
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }  

    @DeleteMapping("/eliminar/{idDetalle}")
    public ResponseEntity<String> deletePedidos(@PathVariable int idDetalle) {
        try {
            this.detallePedidosService.deleteById(idDetalle);
            return ResponseEntity.ok("Pedido eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PutMapping("/editar")
    public ResponseEntity<String> updatePedidos(@RequestBody DetallesPedidosModel entity) {
        try {
            this.detallePedidosService.save(entity);
            return ResponseEntity.ok("Detalle del Pedido editado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

}
