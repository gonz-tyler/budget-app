package com.budgetapp.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data; // From Lombok
import java.math.BigDecimal;
import java.time.LocalDate;

@Data // Lombok: automatically creates getters, setters, toString, etc.
@Entity // JPA: Marks this class as a database entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private BigDecimal amount;
    private LocalDate date;
    private String category;
}