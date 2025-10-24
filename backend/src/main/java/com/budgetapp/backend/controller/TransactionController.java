package com.budgetapp.backend.controller;

import com.budgetapp.backend.model.Transaction;
import com.budgetapp.backend.model.User;
import com.budgetapp.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // You can remove this, as it's global now
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Transaction> getAllTransactions(@AuthenticationPrincipal User user) {
        // Only return transactions for the currently logged-in user
        return transactionRepository.findAllByUserId(user.getId());
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction,
            @AuthenticationPrincipal User user) {
        
        // Assign the new transaction to the logged-in user
        transaction.setUser(user);
        
        // Ensure amount is positive
        if (transaction.getAmount().compareTo(BigDecimal.ZERO) < 0) {
             return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        Transaction savedTransaction = transactionRepository.save(transaction);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction transactionDetails,
            @AuthenticationPrincipal User user) {
        
        Optional<Transaction> optionalTransaction = transactionRepository.findById(id);
        
        if (optionalTransaction.isPresent()) {
            Transaction existingTransaction = optionalTransaction.get();

            // **SECURITY CHECK**: Ensure the user owns this transaction
            if (!existingTransaction.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            existingTransaction.setDescription(transactionDetails.getDescription());
            existingTransaction.setAmount(transactionDetails.getAmount());
            existingTransaction.setDate(transactionDetails.getDate());
            existingTransaction.setCategory(transactionDetails.getCategory());
            
            Transaction updatedTransaction = transactionRepository.save(existingTransaction);
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        // **SECURITY CHECK**: Ensure the user owns this transaction before deleting
        if (transactionRepository.existsByIdAndUserId(id, user.getId())) {
            transactionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            // Either it doesn't exist, or the user doesn't own it
            return ResponseEntity.notFound().build();
        }
    }
}