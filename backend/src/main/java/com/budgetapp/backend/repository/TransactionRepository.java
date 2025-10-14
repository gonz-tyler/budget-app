package com.budgetapp.backend.repository;

import com.budgetapp.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Spring Data JPA automatically creates CRUD methods for us!
}