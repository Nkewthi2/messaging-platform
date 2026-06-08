package com.backend.messaging.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.messaging.dto.auth.AuthResponse;
import com.backend.messaging.dto.auth.LoginRequest;
import com.backend.messaging.dto.auth.RegisterRequest;
import com.backend.messaging.service.AuthService;
import com.backend.messaging.service.JwtService;
import com.backend.messaging.service.TokenBlacklistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final TokenBlacklistService tokenBlacklistService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

    @PostMapping("/register")
    public Boolean register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            tokenBlacklistService.revoke(token, jwtService.extractExpiration(token));
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
