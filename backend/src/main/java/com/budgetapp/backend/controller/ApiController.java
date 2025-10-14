package com.budgetapp.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;

@RestController
public class ApiController {

    // This annotation is crucial for allowing requests from your React app
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/greeting")
    public Map<String, String> getGreeting() {
        // Spring Boot automatically converts this Map to JSON
        return Map.of("message", "Hello from the Spring Boot server! 👋");
    }
}