package com.example.demo.repository.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Usuarios.usserModel;

public interface UserRepository extends JpaRepository<usserModel, Integer> {
    usserModel findByEmail(String email);
}
