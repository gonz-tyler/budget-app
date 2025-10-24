package com.budgetapp.backend.controller;

import com.budgetapp.backend.dto.AuthResponse;
import com.budgetapp.backend.dto.LoginRequest;
import com.budgetapp.backend.dto.SignUpRequest;
import com.budgetapp.backend.model.User;
import com.budgetapp.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// We don't need @CrossOrigin because it's set globally in SecurityConfig
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            AuthResponse authResponse = authService.signup(signUpRequest);
            return ResponseEntity.ok(authResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    // This is the endpoint AuthContext.jsx uses to check if user is logged in
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        // If the token is valid, @AuthenticationPrincipal will be populated
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Not Authenticated");
        }
        // Return user data (excluding password, which is handled by @JsonIgnore)
        return ResponseEntity.ok(currentUser);
    }
}