package com.example.crypto_tracker_backend.repository;

import com.example.crypto_tracker_backend.model.Crypto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoRepository extends JpaRepository<Crypto, Long> {
}
