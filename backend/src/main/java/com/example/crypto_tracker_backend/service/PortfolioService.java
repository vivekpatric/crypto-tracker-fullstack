package com.example.crypto_tracker_backend.service;
import com.example.crypto_tracker_backend.model.Crypto;
import com.example.crypto_tracker_backend.model.Portfolio;
import com.example.crypto_tracker_backend.model.Transaction;
import com.example.crypto_tracker_backend.repository.PortfolioRepository;
import com.example.crypto_tracker_backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PortfolioService {
    
    @Autowired
    private PortfolioRepository portfolioRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;  // ✅ Inject repository

    public List<Portfolio> getUserPortfolio(String userId) {
        return portfolioRepository.findByUserId(userId);
    }
    public List<Transaction> getTransactionsByUser(Long userId) {
        if (userId == null) {
            return transactionRepository.findAll();  // Fetch all for testing
        }
        return transactionRepository.findByUserId(userId);
    }

}
