package com.backend.messaging.service;

import com.backend.messaging.dto.AuthResponse;
import com.backend.messaging.dto.LoginRequest;
import com.backend.messaging.model.User;
import com.backend.messaging.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.messaging.dto.RegisterRequest;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final PasswordEncoder encoder;

	public AuthResponse login(LoginRequest request) {
		User user = userRepository.findByUsername(request.getUsername())
				.orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

		if (!encoder.matches(request.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("Invalid credentials");
		}

		String accessToken = jwtService.generateToken(user);
		return AuthResponse.builder()
				.accessToken(accessToken)
				.build();
	}

	public Boolean register(RegisterRequest request) {
		if (request == null) {
			return false;
		}

		String username = request.getUsername();
		String password = request.getPassword();

		if (username == null || username.trim().isEmpty()) {
			return false;
		}

		if (password == null || password.trim().isEmpty()) {
			return false;
		}

		if (userRepository.findByUsername(username).isPresent()) {
			return false;
		}

		User user = User.builder()
				.username(username.trim())
				.password(encoder.encode(password))
				.build();

		userRepository.save(user);
		return true;
	}
}
