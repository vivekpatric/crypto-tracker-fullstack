package com.example.crypto_tracker_backend.controller;

import com.example.crypto_tracker_backend.model.Crypto;
import com.example.crypto_tracker_backend.service.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // Change this to match your frontend URL
@RestController
@RequestMapping("/api/crypto")
public class CryptoController {

    @Autowired
    private CryptoService cryptoService;

    @GetMapping("/fetch")  // This maps to /api/crypto/fetch
    public ResponseEntity<List<Crypto>> fetchCryptoPrices() {
        List<Crypto> cryptos = cryptoService.fetchCryptoPrices();
        return ResponseEntity.ok(cryptos);
    }

    @GetMapping("/all")  // This maps to /api/crypto/all
    public ResponseEntity<List<Crypto>> getAllCryptos() {
        List<Crypto> cryptos = cryptoService.getAllCryptos();
        return ResponseEntity.ok(cryptos);
    }
    @GetMapping("/history/{id}")
    public List<Map<String, Object>> getCryptoHistory(@PathVariable String id) {
        return cryptoService.fetchCryptoHistory(id);
    }
}
