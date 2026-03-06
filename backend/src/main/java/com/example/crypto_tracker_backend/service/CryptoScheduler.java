package com.example.crypto_tracker_backend.service;

import org.springframework.scheduling.annotation.Scheduled;

public class CryptoScheduler {
	 private final CryptoService cryptoService;

	    public CryptoScheduler(CryptoService cryptoService) {
	        this.cryptoService = cryptoService;
	    }

	    @Scheduled(fixedRate = 60000)  // Runs every 60 seconds
	    public void fetchCryptoData() {
	        cryptoService.getAllCryptos();
	        System.out.println("Updated Crypto Data at: " + System.currentTimeMillis());
	    }
}
