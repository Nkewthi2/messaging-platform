package com.backend.messaging.service;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.backend.messaging.dto.message.SendMessageRequest;
import com.backend.messaging.model.Message;
import com.backend.messaging.repository.MessageRepository;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    public Message create(Long conversationId, SendMessageRequest request) {
        Message message = Message.builder()
                .id(request.getId())
                .conversationId(conversationId)
                .senderId(request.getSenderId())
                .blocks(request.getBlocks())
                .replyTo(request.getReplyTo())
                .createdAt(Instant.now())
                .build();

        Message saved = messageRepository.save(message);
        messagingTemplate.convertAndSend(
            "/topic/conversations/" + saved.getConversationId(),
            saved
        );
        return saved;
    }

    public List<Message> getByConversation(Long conversationId) {
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }
}
