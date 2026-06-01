package com.backend.messaging.model;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    @Id
    private String id;

    private Long conversationId;
    private Long senderId;
    private List<MessageBlock> blocks;
    private String replyTo;
    private Instant createdAt;
    private Instant editedAt;
    private Instant deletedAt;
}
