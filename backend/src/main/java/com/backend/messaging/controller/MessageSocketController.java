package com.backend.messaging.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.backend.messaging.dto.message.SendMessageRequest;
import com.backend.messaging.dto.message.WsSendMessageRequest;
import com.backend.messaging.service.MessageService;

@Controller
public class MessageSocketController {
    @Autowired
    MessageService messageService;

    @MessageMapping("/messages.send")
    public void send(WsSendMessageRequest request) {
        messageService.create(request.getConversationId(), request.toSendMessageRequest());
    }
}
