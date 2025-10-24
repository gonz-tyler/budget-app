package com.budgetapp.backend.repository;

import com.budgetapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find a user by their email (which we use as the username)
    Optional<User> findByEmail(String email);

    // Check if a user with this email already exists
    Boolean existsByEmail(String email);
}