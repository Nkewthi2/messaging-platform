package com.backend.messaging.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.messaging.dto.conversation.CreateConversationRequest;
import com.backend.messaging.dto.conversation.ConversationDto;
import com.backend.messaging.service.ConversationService;

@RestController
@RequestMapping("/api/conversation")
public class ConversationController {
    @Autowired
    ConversationService conversationService;    

    @PostMapping("/create")
    public Boolean create(@RequestBody CreateConversationRequest request){
        conversationService.create(request);
        return true;
    }
    @GetMapping
    public List<ConversationDto> getAll() {
        return conversationService.getAll();
    }
}
