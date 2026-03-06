package com.example.crypto_tracker_backend.model;

import jakarta.persistence.*;

@Entity
public class Crypto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String symbol;
    private Double price;
    private String image;
    private Double marketCap=0.0;
    public Crypto() {}

    public Crypto(String name, String symbol, Double price) {
        this.name = name;
        this.symbol = symbol;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    public String getImage() {  // 🆕 Getter
        return image;
    }

    public void setImage(String image) {  // 🆕 Setter
        this.image = image;
    }
    public Double getMarketCap() {
        return marketCap != null ? marketCap : 0.0; // Prevent null issues
    }
    public void setMarketCap(double marketCap) {  // 🆕 Setter for marketCap
        this.marketCap = marketCap;
    }
}
