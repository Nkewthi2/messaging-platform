package com.backend.messaging.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.backend.messaging.dto.message.SendMessageRequest;
import com.backend.messaging.model.Message;
import com.backend.messaging.service.MessageService;

@RestController
@RequestMapping("/api/conversations/{conversationId}/messages")
public class MessageController {
    @Autowired
    MessageService messageService;

    @PostMapping
    public Message create(@PathVariable Long conversationId, @RequestBody SendMessageRequest request) {
        return messageService.create(conversationId, request);
    }

    @GetMapping
    public List<Message> list(@PathVariable Long conversationId) {
        return messageService.getByConversation(conversationId);
    }
}
