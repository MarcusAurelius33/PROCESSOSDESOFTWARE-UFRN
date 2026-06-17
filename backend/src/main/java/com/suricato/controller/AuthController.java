package com.suricato.controller;

import com.suricato.service.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;

    @Value("${dashboard.senha}")
    private String senhaMestra;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String senha = body.get("senha");

        if (senha == null || !senha.equals(senhaMestra)) {
            return ResponseEntity.status(401).body(Map.of("erro", "Senha incorreta"));
        }

        String token = jwtService.gerarToken("dashboard");
        return ResponseEntity.ok(Map.of("token", token));
    }
}