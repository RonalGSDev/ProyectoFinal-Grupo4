package com.demo.proyecto.Controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.demo.proyecto.Models.ClientesModel;
import com.demo.proyecto.Models.LoginResponse;
import com.demo.proyecto.Service.ClientesService;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientesController {
    
    @Autowired
    private ClientesService clientesService; 

    @GetMapping("/listar")
    public Iterable<ClientesModel> getClientes() {
        return this.clientesService.findAll();
    }

    @PostMapping("/guardar")
    public ResponseEntity<String> saveClientes(@RequestBody ClientesModel entity) {
        try {
            this.clientesService.save(entity);
            return ResponseEntity.ok("Cliente guardado correctamente");
        } catch (RuntimeException e) {
            System.out.println(e.getMessage()); 
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestParam String correo, @RequestParam String password) {
        Optional<ClientesModel> cliente = clientesService.findByCorreoAndPassword(correo, password);
        if (cliente.isPresent()) {
            LoginResponse response = new LoginResponse(cliente.get().getId(), "Inicio de sesión exitoso");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(new LoginResponse(-1, "Credenciales incorrectas"));
        }
    }

    @DeleteMapping("/eliminar/{idCliente}")
    public ResponseEntity<String> deleteClientes(@PathVariable int idCliente) {
        try {
            this.clientesService.deleteById(idCliente);
            return ResponseEntity.ok("Cliente eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PutMapping("/editar")
    public ResponseEntity<String> updateCliente(@RequestBody ClientesModel entity) {
        try {
            this.clientesService.save(entity);
            return ResponseEntity.ok("Cliente editado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }
}
