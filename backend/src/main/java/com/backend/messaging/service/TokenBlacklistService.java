package com.backend.messaging.service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TokenBlacklistService {

    private final Map<String, Date> blacklistedTokens = new ConcurrentHashMap<>();

    public void revoke(String token, Date expiration) {
        if (token == null || token.isBlank() || expiration == null) {
            return;
        }
        blacklistedTokens.put(token, expiration);
    }

    public boolean isRevoked(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }

        Date expiration = blacklistedTokens.get(token);
        if (expiration == null) {
            return false;
        }

        if (expiration.before(new Date())) {
            blacklistedTokens.remove(token);
            return false;
        }

        return true;
    }

    @Scheduled(fixedDelay = 60_000)
    public void cleanupExpiredTokens() {
        Date now = new Date();
        blacklistedTokens.entrySet().removeIf(entry -> entry.getValue() == null || entry.getValue().before(now));
    }
}