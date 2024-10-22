package com.demo.proyecto.Controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.demo.proyecto.Models.AdministradoresModel;
import com.demo.proyecto.Service.AdministradoresService;

@RestController
@RequestMapping("/administradores")
@CrossOrigin(origins = "http://localhost:3000")
public class AdministradoresController {
    
    @Autowired
    private AdministradoresService administradoresService; 

    @GetMapping("/listar")
    public Iterable<AdministradoresModel> getAdministradores() {
        return this.administradoresService.findAll();
    }

    @PostMapping("/guardar")
    public ResponseEntity<String> saveAdministradores(@RequestBody AdministradoresModel entity) {
        try {
            this.administradoresService.save(entity);
            return ResponseEntity.ok("Administrador guardado correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String correo, @RequestParam String password) {
        Optional<AdministradoresModel> administrador = administradoresService.findByCorreoAndPassword(correo, password);
        if (administrador.isPresent()) {
            return ResponseEntity.ok("Inicio de sesión exitoso");
        } else {
            return ResponseEntity.badRequest().body("Credenciales incorrectas");
        }
    }

    @DeleteMapping("/eliminar/{idAdministrador}")
    public ResponseEntity<String> deleteAdministradores(@PathVariable int idAdministrador) {
        try {
            this.administradoresService.deleteById(idAdministrador);
            return ResponseEntity.ok("Administrador eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @PutMapping("/editar")
    public ResponseEntity<String> updateAdministrador(@RequestBody AdministradoresModel entity) {
        try {
            this.administradoresService.save(entity); // No hay verificación de correo
            return ResponseEntity.ok("Administrador editado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }
}
    