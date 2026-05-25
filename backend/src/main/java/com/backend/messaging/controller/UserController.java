package com.backend.messaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.messaging.dto.users.UserInfo;
import com.backend.messaging.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public UserInfo getMe(){
        UserInfo userInfo = userService.getMe();
        return userInfo;
    }
}
