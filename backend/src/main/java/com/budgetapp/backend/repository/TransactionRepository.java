package com.budgetapp.backend.repository;

import com.budgetapp.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Find all transactions for a specific user ID
    List<Transaction> findAllByUserId(Long userId);
    
    // Check if a transaction belongs to a specific user
    boolean existsByIdAndUserId(Long id, Long userId);
}