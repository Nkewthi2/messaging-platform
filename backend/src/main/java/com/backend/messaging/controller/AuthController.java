package com.backend.messaging.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.messaging.dto.auth.AuthResponse;
import com.backend.messaging.dto.auth.LoginRequest;
import com.backend.messaging.dto.auth.RegisterRequest;
import com.backend.messaging.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

    @PostMapping("/register")
    public Boolean register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }
}
