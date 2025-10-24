package com.budgetapp.backend.dto;

import com.budgetapp.backend.model.User;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private UserData user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = new UserData(user.getId(), user.getName(), user.getEmail());
    }

    // Inner class to safely expose only the user data we need
    @Data
    class UserData {
        private Long id;
        private String name;
        private String email;

        UserData(Long id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }
    }
}