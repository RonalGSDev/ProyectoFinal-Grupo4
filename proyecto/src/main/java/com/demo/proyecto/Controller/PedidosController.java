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
import com.demo.proyecto.Models.PedidosModel;
import com.demo.proyecto.Service.PedidosService;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500"})
public class PedidosController {
    
    @Autowired
    private PedidosService pedidosService;

    @GetMapping("/listar")
    public Iterable<PedidosModel> getPedidos() {
        return this.pedidosService.findAll();
    }

    @PostMapping("/guardar")
    public ResponseEntity<PedidosModel> savePedidos(@RequestBody PedidosModel entity) {
        try {
            PedidosModel savedPedido = this.pedidosService.save(entity);
            return ResponseEntity.ok(savedPedido);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/eliminar/{idPedido}")
    public ResponseEntity<String> deletePedidos(@PathVariable int idPedido) {
        try {
            this.pedidosService.deleteById(idPedido);
            return ResponseEntity.ok("Pedido eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PutMapping("/editar")
    public ResponseEntity<String> updatePedidos(@RequestBody PedidosModel entity) {
        try {
            this.pedidosService.save(entity);
            return ResponseEntity.ok("Pedido editado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }
}
