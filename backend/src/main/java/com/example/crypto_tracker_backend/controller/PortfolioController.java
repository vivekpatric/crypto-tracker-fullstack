package com.example.crypto_tracker_backend.controller;
import com.example.crypto_tracker_backend.model.Portfolio;
import com.example.crypto_tracker_backend.model.Transaction;
import com.example.crypto_tracker_backend.service.PortfolioService;
import com.example.crypto_tracker_backend.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Portfolio>> getUserPortfolio(@PathVariable String userId) {
        return ResponseEntity.ok(portfolioService.getUserPortfolio(userId));
    }

    @GetMapping("/transactions/{userId}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userId));
    }

    @PostMapping("/trade")
    public ResponseEntity<Transaction> executeTrade(@RequestBody Transaction transaction) {
        Transaction savedTransaction = transactionService.addTransaction(transaction);
        return ResponseEntity.ok(savedTransaction);
    }
}
