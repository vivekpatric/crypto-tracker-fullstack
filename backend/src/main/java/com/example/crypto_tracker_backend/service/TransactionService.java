package com.example.crypto_tracker_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.crypto_tracker_backend.model.Transaction;
import com.example.crypto_tracker_backend.repository.PortfolioRepository;
import com.example.crypto_tracker_backend.repository.TransactionRepository;
@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
