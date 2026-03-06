package com.example.crypto_tracker_backend.model;

import jakarta.validation.constraints.NotNull;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;



//@Entity
//@Table(name = "transactions")
//public class Transaction {
//	  @Id
//	    @GeneratedValue(strategy = GenerationType.IDENTITY)
//	    private Long id;
//
//	    @NotNull(message = "cryptoName cannot be null")
//	    private String cryptoName;
//
//	    @NotNull(message = "userId cannot be null")
//	    private String userId;
//
//	    @NotNull(message = "amount cannot be null")
//	    private Double amount;
//
//	    @NotNull(message = "transactionType cannot be null")
//	    private String transactionType; // BUY / SELL
//
//	    
//
//	   //  Constructors
//	    public Transaction() {}
//
//	    public Transaction(String cryptoName, String userId, Double amount, String transactionType) {
//	        this.cryptoName = cryptoName;
//	        this.userId = userId;
//	        this.amount = amount;
//	        this.transactionType = transactionType;
//	    }
//    public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getUserId() {
//		return userId;
//	}
//
//	public void setUserId(String userId) {
//		this.userId = userId;
//	}
//
//	public String getCryptoName() {
//		return cryptoName;
//	}
//
//	public void setCryptoName(String cryptoName) {
//		this.cryptoName = cryptoName;
//	}
//
//	
//	public String getTransactionType() {
//		return transactionType;
//	}
//
//	public void setTransactionType(String transactionType) {
//		this.transactionType = transactionType;
//	}
//
//	
//}
@Entity
@Table(name = "transactions")
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "cryptoSymbol cannot be null")
    private String cryptoSymbol;  // Example: BTC, ETH

    @NotNull(message = "cryptoName cannot be null")
    private String cryptoName;  // Example: Bitcoin, Ethereum

    @NotNull(message = "userId cannot be null")
    private Long userId;

    @NotNull(message = "quantity cannot be null")
    private BigDecimal quantity;  // Number of crypto units bought/sold

    @NotNull(message = "price cannot be null")
    private BigDecimal price;  // Price per unit at transaction time

    @NotNull(message = "amount cannot be null")
    private BigDecimal amount;  // Total value of the transaction

    @NotNull(message = "transactionType cannot be null")
    private String transactionType; // BUY / SELL

    private LocalDateTime timestamp = LocalDateTime.now(); // Auto-set when transaction is created

    // Constructors
    public Transaction() {}

    public Transaction(String cryptoSymbol, String cryptoName, Long userId, BigDecimal quantity, BigDecimal price, BigDecimal amount, String transactionType) {
        this.cryptoSymbol = cryptoSymbol;
        this.cryptoName = cryptoName;
        this.userId = userId;
        this.quantity = quantity;
        this.price = price;
        this.amount = amount;
        this.transactionType = transactionType;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCryptoSymbol() {
        return cryptoSymbol;
    }

    public void setCryptoSymbol(String cryptoSymbol) {
        this.cryptoSymbol = cryptoSymbol;
    }

    public String getCryptoName() {
        return cryptoName;
    }

    public void setCryptoName(String cryptoName) {
        this.cryptoName = cryptoName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}