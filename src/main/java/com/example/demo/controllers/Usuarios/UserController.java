package com.example.demo.controllers.Usuarios;

import com.example.demo.models.Usuarios.usserModel;
import com.example.demo.repository.Usuario.UserRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<usserModel> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<usserModel> getUserById(@PathVariable int id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/users")
    public ResponseEntity<usserModel> createUser(@RequestBody usserModel user) {
        try {
            usserModel newUser = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody usserModel userDetails) {
        try {
            if (userRepository.existsById(id)) {
                userDetails.setId(id); // Suponiendo que tienes un método setId en la clase User para establecer el ID
                usserModel updatedUser = userRepository.save(userDetails);
                return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        usserModel user = userRepository.findByEmail(request.getEmail());
        if (user != null && user.getPass().equals(request.getPassword())) {
            session.setAttribute("user", user);
            return ResponseEntity.ok().body(user.getName());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/currentUser")
    public ResponseEntity<usserModel> getCurrentUser(HttpSession session) {
        usserModel user = (usserModel) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    

    // Clase interna para manejar el cuerpo de la solicitud de login
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters y Setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
