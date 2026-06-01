package com.backend.messaging.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.messaging.model.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);
}
