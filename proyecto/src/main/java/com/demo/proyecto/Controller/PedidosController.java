package com.demo.proyecto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.demo.proyecto.Models.PedidosModel;
import com.demo.proyecto.Service.PedidosService;

import java.sql.Date;
import java.util.List;

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

    @GetMapping("/obtener")
    public ResponseEntity<List<Object[]>> obtenerPedidos(
            @RequestParam(required = false) Integer clienteid,
            @RequestParam(required = false) Integer productoid,
            @RequestParam(required = false) Date fechainicio,
            @RequestParam(required = false) Date fechafin) {
        List<Object[]> resultados = this.pedidosService.obtenerPedidos(clienteid, productoid, fechainicio, fechafin);
        return ResponseEntity.ok(resultados);
    }
}
