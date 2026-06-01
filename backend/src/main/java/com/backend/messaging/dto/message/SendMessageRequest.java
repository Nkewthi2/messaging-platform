package com.backend.messaging.dto.message;

import java.util.List;

import com.backend.messaging.model.MessageBlock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {
    private String id;
    private Long conversationId;
    private Long senderId;
    private List<MessageBlock> blocks;
    private String replyTo;
}
