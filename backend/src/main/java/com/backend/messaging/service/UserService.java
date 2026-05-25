package com.backend.messaging.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.backend.messaging.dto.users.UserInfo;
import com.backend.messaging.model.User;
import com.backend.messaging.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserInfo getMe(){
        User user = (User) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();
        
        return UserInfo.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .avatar(user.getAvatar())
                    .createdAt(user.getCreatedAt())
                    .build();
    }  
}